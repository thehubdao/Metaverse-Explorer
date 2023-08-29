import {useEffect, useRef, useState} from 'react';
import {Application, Container, Sprite} from 'pixi.js';
import {Viewport} from 'pixi-viewport';
import Loader from './loader.component';
import {PercentFilter} from "../../types/heatmap/heatmap.type";
import {LandType} from "../../types/heatmap/land.type";
import {LandRectangle} from "../../interfaces/heatmap.interface";
import {Metaverse} from "../../enums/heatmap.enum";
import {ValuationState} from "../../enums/valuation.enum";
import {LegendFilter, MapFilter} from "../../enums/heatmap/filter.enum";
import {LandBorderTexture} from "../../enums/heatmap/land.enum";
import {Module} from "../../enums/logging.enum";
import {LogError, LogWarning} from "../../utils/logging.util";
import {RandomIntMax} from "../../utils/common.util";
import {FreeSocket, InitLandSocket, RenderStart, SetOnFinish, SetOnNewLand} from "../../utils/itrm/land-socket.util";
import {GetLandBorder, GetTileColorByFilter} from "../../utils/heatmap/land-color.util";
import {GetBorderTexture} from "../../utils/pixi/texture.util";
import {IsLandDecentraland} from "../../utils/heatmap/land.util";
import {
  BLOCK_SIZE,
  BOUND_SIZE,
  CHUNK_SIZE,
  LOAD_PHRASES_ARRAY,
  LOAD_PHRASES_LENGHT,
  TILE_SIZE
} from "../../constants/heatmap/heatmap.constant";
// import {useAccount} from "wagmi";

//#region Logic

let _mapApp: Application<HTMLCanvasElement> | undefined;
let _viewport: Viewport | undefined;

const _mapData: Record<string, LandRectangle | undefined> = {};
const _chunks: Record<string, Container | undefined> = {};

//#endregion

interface Heatmap2DProps {
  viewportWidth: number | undefined;
  viewportHeight: number | undefined;
  mapState: ValuationState;
  metaverse: Metaverse;

  x: number | undefined;
  y: number | undefined;
  
  filter?: MapFilter;
  percentFilter?: PercentFilter;
  legendFilter?: LegendFilter;
  
  onClickLand: (landRawData: unknown) => void;
  initialX: number;
  initialY: number;
}

export default function Heatmap2D({
                                    metaverse,
                                    viewportWidth,
                                    viewportHeight,
                                    mapState,

                                    filter,
                                    percentFilter,
                                    legendFilter,
                                    onClickLand,
                                    x,
                                    y,
                                    initialX,
                                    initialY,
                                  }: Heatmap2DProps) {
  
  const mapDivRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [indexLoading, setIndexLoading] = useState<number>(RandomIntMax(LOAD_PHRASES_LENGHT));
  const [mapLoadingState, setMapLoadingState] = useState<boolean>(false);
  
  
  // const {address} = useAccount();
  const address = undefined;
  // const wList = useAppSelector((state) => state.watchlist.list);
  const wList: Partial<Record<Metaverse, Record<string, unknown>>> = {};
  // const portfolioLands = useAppSelector((state) => state.portfolio.list)
  
  useEffect(() => {
    // Init pixi variables
    initPixiViews();
    
    // onUnMount remove pixi stuff
    return () => {
      cleanPixiViews();
    }
  }, []);
  
  useEffect(() => {
    // Start and work with the socket
    socketWork();

    // free socket
    return () => {
      FreeSocket();
    }
  }, [metaverse]);
  
  function initPixiViews() {
    console.log('Init Pixi');
    
    const mapDivRefCurrent = mapDivRef.current;
    if (mapDivRefCurrent == null)
      return void LogWarning(Module.Heatmap, "Missing PixiDiv please checkout!");
    
    _mapApp = new Application<HTMLCanvasElement>({
      width: viewportWidth,
      height: viewportHeight,
      resolution: 1,
      backgroundAlpha: 0,
      backgroundColor: '#42425d',
      eventMode: "auto"
    });
    _mapApp.view.style.borderRadius = '24px';

    // _mapApp.ticker.maxFPS = 2;

    _viewport = new Viewport({
      screenWidth: viewportWidth,
      screenHeight: viewportHeight,
      passiveWheel: false,
      events: _mapApp.renderer.events,
      // interaction: map.renderer.plugins.interaction,
    })
      .drag()
      .pinch()
      .wheel()
      .clampZoom({
        minWidth: TILE_SIZE * 8,
        minHeight: TILE_SIZE * 8,
        maxWidth: TILE_SIZE * 800,
        maxHeight: TILE_SIZE * 800,
      })
      .zoom(TILE_SIZE * 200)

    _mapApp.stage.addChild(_viewport);
    mapDivRefCurrent.appendChild(_mapApp.view);
    
    _viewport.moveCenter(initialX * TILE_SIZE, initialY * TILE_SIZE);
  }
  
  function cleanPixiViews() {
    try {
      if (mapDivRef.current != null && _mapApp != undefined) {
        mapDivRef.current.removeChild(_mapApp.view);
      }
      
      if (_mapApp != undefined) {
        _mapApp.destroy();
      }
      
      if (_viewport != undefined) {
        // _viewport.destroy();
        _viewport = undefined;
      }
    } catch (e) {
      LogError(Module.Heatmap, "Error disposing pixi items from view", e);
    }
  }

  async function generateLandSprite(land: LandType) {
    if (_viewport == undefined)
      return void LogError(Module.Heatmap, "Missing viewport while trying to render some land!");

    if (land.coords == undefined || land.coords.x == undefined || land.coords.y == undefined)
      return void LogError(Module.Heatmap, "Missing coordinates to render!");

    land.coords.y *= -1;

    // TODO: Some address watchlist
    // if (address != undefined) {
    //   //if (portfolioLands[metaverse as keyof typeof portfolioLands][land.tokenId]) land.portfolio = true
    //   const wMRef = wList[metaverse];
    //   if (wMRef == undefined || wMRef[land.tokenId] == undefined) land.watchlist = true;
    // }

    const tile = GetTileColorByFilter(
      filter,
      percentFilter,
      legendFilter,
      land
    );

    const {color} = tile;

    const chunkX = Math.floor(land.coords.x / CHUNK_SIZE);
    const chunkY = Math.floor(land.coords.y / CHUNK_SIZE);
    const chunkKey = `${chunkX}:${chunkY}`;
    let chunkContainer = _chunks[chunkKey];

    if (chunkContainer == undefined) {
      chunkContainer = new Container();
      chunkContainer.position.set(
        chunkX * BLOCK_SIZE,
        chunkY * BLOCK_SIZE
      );

      _chunks[chunkKey] = chunkContainer;
    }

    const border = GetLandBorder(land);
    const texture = await GetBorderTexture(border);
    const rectangle = new Sprite(texture);

    // rectangle.tint = '#ffffff';
    rectangle.tint = color;
    // rectangle.tint = (() => {
    //   const array = [
    //     FilterColor.Red,
    //     FilterColor.DarkBlue,
    //     FilterColor.Green,
    //     FilterColor.Orange,
    //     FilterColor.Yellow
    //   ];
    //
    //   return array[Math.floor(Math.random() * array.length)];
    // })();

    const side = [5, 6, 7, 8, 12].some(x => {
      if (IsLandDecentraland(land)) return x === land.tile.type ?? 5;
      return true;
    }) ? TILE_SIZE :
      TILE_SIZE - BOUND_SIZE;
    rectangle.width = rectangle.height = side;
    rectangle.name = `${land.coords.x},${land.coords.y}`;
    rectangle.position.set(
      land.coords.x * TILE_SIZE - chunkX * BLOCK_SIZE,
      land.coords.y * TILE_SIZE - chunkY * BLOCK_SIZE
    );

    const landRectangle: LandRectangle = {
      name: `${land.coords.x},${land.coords.y}`,
      landX: land.coords.x,
      landY: land.coords.y,
      tokenId: land.tokenId,
      land: land,
      spriteRef: rectangle,
      containerRef: chunkContainer,
    };

    chunkContainer.addChild(rectangle);
    _viewport.addChild(chunkContainer);
    
    return landRectangle;
  }

  async function fillDeadSpaces() {
    if (_viewport == undefined)
      return LogError(Module.Heatmap, "Missing viewport trying to fill dead space!");
    
    for (let x = -204; x <= 203; x++) {
      for (let y = -203; y <= 204; y++) {
        const landKey = `${x},${y}`;

        const chunkX = Math.floor(x / CHUNK_SIZE);
        const chunkY = Math.floor(y / CHUNK_SIZE);
        const chunkKey = `${chunkX}:${chunkY}`
        let chunkContainer = _chunks[chunkKey];

        if (chunkContainer == undefined) {
          chunkContainer = _chunks[chunkKey] = new Container();
          chunkContainer.position.set(
            chunkX * BLOCK_SIZE,
            chunkY * BLOCK_SIZE
          );
          _viewport.addChild(chunkContainer)
        }
        
        if (_mapData[landKey] == undefined) {
          const sprite = new Sprite(await GetBorderTexture(LandBorderTexture.FullBorderDead));
          
          sprite.tint = '#2d4162';
          sprite.width = TILE_SIZE;
          sprite.height = TILE_SIZE;

          sprite.position.set(
            x * TILE_SIZE - chunkX * BLOCK_SIZE,
            y * TILE_SIZE - chunkY * BLOCK_SIZE
          );
          
          chunkContainer.addChild(sprite);
        }
      }
    }
  }
  
  function socketWork() {
    console.log('Socket implementation');

    if (_viewport == undefined)
      return LogError(Module.Heatmap, "Missing viewport!");

    // setIsLoading(true);

    SetOnNewLand(metaverse, async (newLand) => {
      const land = await generateLandSprite(newLand);
      if (land != undefined)
        _mapData[land.name] = land;
    });
    
    SetOnFinish(async () => {
      console.log("Finished!");
      // If sandbox fill the empty spaces
      if (metaverse === Metaverse.Sandbox)
        await fillDeadSpaces();
      
      setIsLoading(false);
      // TODO: check
      setMapLoadingState(false);
    });
    
    InitLandSocket(() => {
      RenderStart(metaverse, 0);
    });
  }
  
  // useEffect(() => {
  //   console.log('Set interval function');
  //   if (!isLoading) return;
  //
  //   const intervalFunction = setInterval(() => {
  //     setIndexLoading((prevIndex) => (prevIndex + 1) % LOAD_PHRASES_LENGHT)
  //   }, 8 * 1000); // X seg * 1000ms
  //
  //   return () => {
  //     clearInterval(intervalFunction)
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Filter update
  // useEffect(() => {
  //   console.log('Set filters');
  //  
  //   globalFilter = filter;
  //   globalPercentFilter = percentFilter;
  //   globalLegendFilter = legendFilter;
  // }, [filter, percentFilter, legendFilter]);
  
  // async function renderHandler([land, landKeyIndex]: string[]) {
  //   if (viewport == undefined)
  //     return LogError(Module.Heatmap, "Missing viewport while trying to render land!");
  //  
  //   const landData = FormatLand(land, metaverse);
  //   if (landData.coords == undefined || landData.coords.x == undefined || landData.coords.y == undefined)
  //     return LogError(Module.Heatmap, "Missing coordinates to render!");
  //  
  //   _landIndex = Number(landKeyIndex);
  //   const localChunks: typeof chunks = {...chunks};
  //   let name = '';
  //  
  //   // if (landData.coords?.y != undefined)
  //     landData.coords.y *= -1;
  //
  //   if (address != undefined) {
  //     //if (portfolioLands[metaverse as keyof typeof portfolioLands][land.tokenId]) land.portfolio = true
  //     const wMRef = wList[metaverse];
  //     if (wMRef == undefined || wMRef[landData.tokenId] == undefined) landData.watchlist = true;
  //   }
  //  
  //   name = `${landData.coords.x},${landData.coords.y}`;
  //  
  //   _mapData[name] = landData;
  //  
  //   const tile = await FilteredLayer(
  //     landData.coords?.x,
  //     landData.coords?.y,
  //     globalFilter,
  //     globalPercentFilter,
  //     globalLegendFilter,
  //     landData
  //   );
  //  
  //   const {color} = tile;
  //   // eslint-disable-next-line no-console
  //   console.log("RenderHandler Color: ", color);
  //
  //   // color = color.includes('rgb')
  //   //   ? ColorRgbToHex(color.split('(')[1].split(')')[0])
  //   //   : '0x' + color.split('#')[1];
  //
  //   const border = GetBorder(landData);
  //   const border_url = `images/${border ?? ''}`;
  //   const texture = border != undefined
  //     ? await Texture.fromURL(border_url, { mipmap: MIPMAP_MODES.ON })
  //     : Texture.WHITE;
  //  
  //   const rectangle: OtherSprite = new Sprite(texture);
  //   const chunkX = Math.floor(landData.coords.x / CHUNK_SIZE);
  //   const chunkY = Math.floor(landData.coords.y / CHUNK_SIZE);
  //   const chunkKey = `${chunkX}:${chunkY}`;
  //   let chunkContainer = localChunks[chunkKey];
  //   rectangle.tint = color;
  //   rectangle.width = rectangle.height = new Set([5, 6, 7, 8, 12]).has(landData.tile?.type ?? 5)
  //     ? TILE_SIZE
  //     : TILE_SIZE - BOUND_SIZE;
  //   rectangle.name = `${landData.coords.x},${landData.coords.y}`;
  //   rectangle.landX = landData.coords.x;
  //   rectangle.landY = landData.coords.y;
  //   rectangle.tokenId = landData.tokenId;
  //   rectangle.position.set(
  //     landData.coords.x * TILE_SIZE - chunkX * BLOCK_SIZE,
  //     landData.coords.y * TILE_SIZE - chunkY * BLOCK_SIZE
  //   );
  //  
  //   if (!chunkContainer) {
  //     chunkContainer = localChunks[chunkKey] = new Container();
  //     chunkContainer.position.set(
  //       chunkX * BLOCK_SIZE,
  //       chunkY * BLOCK_SIZE
  //     );
  //     setChunks(localChunks);
  //   }
  //   chunkContainer.addChild(rectangle);
  //   viewport.addChild(chunkContainer);
  // }
  //
  // function onMouseMove(event: FederatedPointerEvent, currentSprite: OtherSprite | undefined, currentTint: string | undefined) {
  //   if (mapLoadingState) return;
  //   if (viewport == undefined) return void LogError(Module.Heatmap, "Missing viewport!");
  //
  //   let newCurrentSprite = currentSprite == undefined ? undefined : {...currentSprite} as OtherSprite;
  //   let newCurrentTint = currentTint;
  //
  //   let {x, y} = viewport.toLocal(event.global);
  //   x = Math.floor(x / TILE_SIZE)
  //   y = Math.floor(y / TILE_SIZE)
  //
  //   const chunkX = Math.floor(x / CHUNK_SIZE);
  //   const chunkY = Math.floor(y / CHUNK_SIZE);
  //   const chunkKey = `${chunkX}:${chunkY}`;
  //   const chunkContainer = chunks[chunkKey];
  //
  //   if (chunkContainer == undefined)
  //     return void LogError(Module.Heatmap, `Missing chunk on coords: ${chunkKey}`);
  //
  //   x = x * TILE_SIZE - chunkX * BLOCK_SIZE;
  //   y = y * TILE_SIZE - chunkY * BLOCK_SIZE;
  //
  //   const child = chunkContainer.children.find(
  //     (child) => child.x === x && child.y === y
  //   ) as OtherSprite;
  //
  //   if (child != undefined) {
  //     if (child.type == 'dead') {
  //       if (newCurrentSprite != undefined && newCurrentTint != undefined) {
  //         newCurrentSprite.tint = newCurrentTint;
  //       }
  //       return {sprite: newCurrentSprite, tint: newCurrentTint};
  //     }
  //
  //     // eslint-disable-next-line no-console
  //     console.log("Tint Value: ", child.tint);
  //     if (newCurrentSprite != undefined && newCurrentTint != undefined) {
  //       newCurrentSprite.tint = newCurrentTint;
  //       newCurrentTint = child.tint;
  //       // newCurrentTint = new Color(child.tint).toHex();
  //     }
  //     if (newCurrentTint == undefined) newCurrentTint = child.tint;
  //     newCurrentSprite = child;
  //     //! HOVER COLOR
  //     newCurrentSprite.tint = '#db2777';
  //   }
  //
  //   return {
  //     sprite: newCurrentSprite,
  //     tint: newCurrentTint
  //   }
  // }
  //
  // useEffect(() => {
  //   console.log('Init socket');
  //   if (viewport == undefined)
  //     return LogError(Module.Heatmap, "Missing viewport!");
  //
  //   // eslint-disable-next-line no-console
  //   console.log('Creando socket', new Date().toISOString());
  //
  //   const socketServiceUrl = process.env.SOCKET_SERVICE;
  //   if (socketServiceUrl == undefined)
  //     return LogError(Module.Heatmap, "Missing SocketService env value!");
  //
  //   const tempLands: string[][] = [];
  //   socketService = GetSocketService(
  //     socketServiceUrl,
  //     () => {
  //       // eslint-disable-next-line no-console
  //       console.log('Connected', new Date().toISOString());
  //       socketService.renderStart(metaverse, _landIndex);
  //     },
  //     (landRawData: string[]) => {
  //       // eslint-disable-next-line no-console
  //       // console.log('Land Data: ', landRawData);
  //       tempLands.push(landRawData);
  //     }
  //   );
  //
  //   setIsLoading(true);
  //
  //   socketService.onGiveLand(onClickLand);
  //   socketService.onRenderFinish(async () => {
  //     try {
  //     for (const land of tempLands) {
  //       console.log(land);
  //       await renderHandler(land)
  //     }
  //     const localChunks = chunks
  //     if (metaverse == "sandbox") for (let i = -204; i <= 203; i++) {
  //       const x = i
  //       for (let j = -203; j <= 204; j++) {
  //         const y = j
  //         if (!_mapData[`${x},${y}`]) {
  //           const borderURL = 'images/full_border_dead.jpg'
  //           const rectangle: OtherSprite = new Sprite(await Texture.fromURL(borderURL, {
  //             mipmap: MIPMAP_MODES.ON,
  //           }));
  //           const chunkX = Math.floor(x / CHUNK_SIZE)
  //           const chunkY = Math.floor(y / CHUNK_SIZE)
  //           const chunkKey = `${chunkX}:${chunkY}`
  //           let chunkContainer = localChunks[chunkKey]
  //           //! SANDBOX DEAD COLOR
  //           rectangle.tint = '#2d4162';
  //           rectangle.width = rectangle.height =
  //             TILE_SIZE
  //           rectangle.position.set(
  //             x * TILE_SIZE - chunkX * BLOCK_SIZE,
  //             y * TILE_SIZE - chunkY * BLOCK_SIZE
  //           )
  //           rectangle.type = 'dead'
  //           if (!chunkContainer) {
  //             chunkContainer = localChunks[chunkKey] = new Container()
  //             chunkContainer.position.set(
  //               chunkX * BLOCK_SIZE,
  //               chunkY * BLOCK_SIZE
  //             )
  //             setChunks(localChunks)
  //           }
  //           chunkContainer.addChild(rectangle)
  //           viewport.addChild(chunkContainer)
  //         }
  //       }
  //     }
  //     }
  //     catch (e) {
  //       console.error(e);
  //     }
  //
  //     setIsLoading(false)
  //     setMapLoadingState(false)
  //   })
  //  
  //   return () => {
  //     socketService.disconnect()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [viewport])
  //
  // useEffect(() => {
  //   console.log('Some pixi');
  //   const mapDivRefCurrent = mapDivRef.current;
  //   if (mapDivRefCurrent == null) return;
  //
  //   _landIndex = 0;
  //   setMap(undefined);
  //   setViewport(undefined);
  //   setChunks({});
  //   // mapData = {}
  //
  //   const mapApp = new Application<HTMLCanvasElement>({
  //     width: viewportWidth,
  //     height: viewportHeight,
  //     resolution: 1,
  //     backgroundAlpha: 0,
  //   });
  //
  //   // TODO Check how to apply this
  //   // map.view.style.borderRadius = '24px'
  //
  //   // map.renderer.plugins.
  //
  //   const viewport = new Viewport({
  //     screenWidth: viewportWidth,
  //     screenHeight: viewportHeight,
  //     passiveWheel: false,
  //     events: mapApp.renderer.events
  //     // screenWidth: viewportWidth,
  //     // screenHeight: viewportHeight,
  //     // interaction: map.renderer.plugins.interaction,
  //     // passiveWheel: false,
  //   })
  //     .drag()
  //     .pinch()
  //     .wheel()
  //     .clampZoom({
  //       minWidth: TILE_SIZE * 8,
  //       minHeight: TILE_SIZE * 8,
  //       maxWidth: TILE_SIZE * 800,
  //       maxHeight: TILE_SIZE * 800,
  //     })
  //     .zoom(TILE_SIZE * 200)
  //
  //   mapApp.stage.addChild(viewport)
  //
  //   // document.getElementById('map')?.appendChild(map.view)
  //   mapDivRefCurrent.appendChild(mapApp.view);
  //   setMap(mapApp);
  //   setViewport(viewport)
  //   viewport.moveCenter(initialX * TILE_SIZE, initialY * TILE_SIZE)
  //
  //   return () => {
  //     try {
  //       if (mapDivRefCurrent != null)
  //         mapDivRefCurrent.removeChild(mapApp.view);
  //
  //       mapApp.destroy();
  //       viewport.destroy();
  //     } catch (e) {
  //       LogError(Module.Heatmap, "Error disposing pixi items from view", e);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [metaverse]);
  //
  // useEffect(() => {
  //   console.log('remove listeners');
  //   if (viewport == undefined) return
  //
  //   let currentTint: string | undefined;
  //   let currentSprite: OtherSprite | undefined;
  //
  //   //* remove existing listeners to viewport before add new listeners
  //   viewport.removeListener('mousemove');
  //   viewport.removeListener('drag-start');
  //   viewport.removeListener('drag-end');
  //   viewport.removeListener('click');
  //
  //   //* add new listeners to viewport
  //   viewport.on('mousemove', (event) => {
  //     const mouseMoveData = onMouseMove(event, currentSprite, currentTint);
  //     currentSprite = mouseMoveData?.sprite;
  //     currentTint = mouseMoveData?.tint;
  //   });
  //
  //   let isDragging = false
  //
  //   viewport.on('drag-start', () => {
  //     isDragging = true
  //   });
  //
  //   viewport.on('drag-end', () => {
  //     isDragging = false
  //   });
  //
  //   viewport.on('click', () => {
  //     if (currentSprite && !isDragging) {
  //       const tokenId = currentSprite.tokenId;
  //       socketService.getLand(metaverse, tokenId);
  //       setMapLoadingState(true);
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [viewport, mapLoadingState]);
  //
  // // Resize
  // useEffect(() => {
  //   console.log('resize')
  //   if (viewport == undefined) return LogError(Module.Heatmap, "Missing viewport on resize");
  //   if (map == undefined) return LogError(Module.Heatmap, "Missing map on resize");
  //
  //   map.renderer.resize(viewportWidth || 0, viewportHeight || 0);
  //
  //   try {
  //     viewport.resize(viewportWidth, viewportHeight);
  //   } catch (e) {
  //     LogError(Module.Heatmap, "Error on viewport resize", e);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [viewportWidth, viewportHeight]);
  //
  // async function filterUpdate() {
  //   const lands = SetColors(_mapData, globalFilter);
  //   if (lands == undefined)
  //     return LogError(Module.Heatmap, "Lands couldn't filter!");
  //
  //   for (const chunk of Object.values(chunks)) {
  //     if (chunk == undefined) continue;
  //
  //     for (const child of chunk.children) {
  //       if (!IsOtherSprite(child)) continue;
  //       if (child.name == null || lands[child.name] == undefined) continue;
  //
  //       if (address) {
  //         /* if (portfolioLands[metaverse as keyof typeof portfolioLands][lands[child.name].tokenId]) lands[child.name].portfolio = true
  //         else if (lands[child.name].portfolio) delete lands[child.name].portfolio */
  //         const wMRef = wList[metaverse];
  //         if (wMRef != undefined && wMRef[lands[child.name].tokenId] != undefined)
  //           lands[child.name].watchlist = true;
  //         else if (lands[child.name].watchlist)
  //           lands[child.name].watchlist = undefined;
  //       }
  //
  //       const tile = await FilteredLayer(
  //         child.landX,
  //         child.landY,
  //         filter,
  //         percentFilter,
  //         legendFilter,
  //         lands[child.name]
  //       );
  //       const {color} = tile;
  //       if (x != undefined && y != undefined && child.name === `${x},${y}`) {
  //         //! SELECTED COLOR
  //         child.tint = '#FFFFFF';
  //       } else {
  //         child.tint = color;
  //       }
  //     }
  //   }
  // }
  //
  //
  // // Filtering
  // useEffect(() => {
  //   console.log('filter');
  //   (async () => {
  //     await filterUpdate();
  //   })().catch(err =>
  //     LogError(Module.Heatmap, "Error applying filters", err)
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filter, percentFilter, legendFilter, x, y]);
  //
  // useEffect(() => {
  //   console.log('Snap heatmap')
  //   if (x == undefined || y == undefined) return;
  //   if (viewport == undefined)
  //     return LogError(Module.Heatmap, "Missing viewport on snap heatmap");
  //
  //   try {
  //     viewport.snap(x * TILE_SIZE, y * TILE_SIZE, {
  //       time: 2000,
  //       ease: 'easeOutCubic',
  //       removeOnComplete: true
  //     });
  //   } catch (e) {
  //     return LogError(Module.Heatmap, "Error snapping coordinates", e);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [x, y]);
  //
  // useEffect(() => {
  //   console.log('setting loading state');
  //   if (isLoading || mapState === ValuationState.LoadingQuery) {
  //     setMapLoadingState(true);
  //   } else {
  //     setMapLoadingState(false);
  //   }
  // }, [mapState, isLoading]);

  return (
    <>
      <>{/* HEATMAP VIEWPORT */}
        <div ref={mapDivRef} id="map"
             className={`bg-[#3C3E42] ${isLoading ? 'hidden' : 'block rounded-[25px]'}`}
             style={{width: viewportWidth, height: viewportHeight, border: 16}}
        />
      </>
      {/* HEATMAP VIEWPORT */}
      <>{/* LOADER */}
        <div className={`h-full w-full justify-center items-center relative ${isLoading ? 'flex' : 'hidden'}`}>
          <Loader color='blue' size={100}/>
          <p className='absolute bottom-20 max-w-lg text-center'>{LOAD_PHRASES_ARRAY[indexLoading]}</p>
        </div>
      </>
      {/* LOADER */}
    </>
  )
}