import {useEffect, useRef, useState} from 'react';
import {Application, Container, Sprite, Texture} from 'pixi.js';
import {Viewport} from 'pixi-viewport';
import {MapFilter, PercentFilter} from "../../types/heatmap/heatmap.type";
import {LandType} from "../../types/heatmap/land.type";
import {LandTileData, MapCoordinates} from "../../interfaces/heatmap.interface";
import {Metaverses} from "../../enums/metaverses.enum";
import {LegendFilter} from "../../enums/heatmap/filter.enum";
import {LandBorderTexture, LandColor} from "../../enums/heatmap/land.enum";
import {Module} from "../../enums/logging.enum";
import {LogError, LogWarning} from "../../utils/logging.util";
import {RandomIntMax} from "../../utils/common.util";
import {FreeSocket, InitLandSocket, RenderStart, SetOnFinish, SetOnNewLand} from "../../utils/itrm/land-socket.util";
import {GetLandBorder, GetTileColorByFilter} from "../../utils/heatmap/land-color.util";
import {GetBorderTexture, GetSomniumSpaceMap} from "../../utils/pixi/texture.util";
import {FormatLand, SomniumValues} from "../../utils/heatmap/land.util";
import {
  BLOCK_SIZE,
  BOUND_SIZE,
  CHUNK_SIZE,
  DECENTRALAND_LANDS,
  LOAD_PHRASES_ARRAY,
  LOAD_PHRASES_LENGHT,
  SOMNIUM_SCALE,
  TILE_SIZE
} from "../../constants/heatmap/heatmap.constant";
import LoaderUI from '../../ui/common/loader.ui';
import {Result} from "../../types/common.type";
import { LandSomniumSpace } from "../../interfaces/land.interface";
import { useAppSelector } from '../../state/hooks';
import { useAccount } from 'wagmi';
// import {SetColors} from "../../utils/heatmap/valuation-coloring.util";
// import {useAccount} from "wagmi";

//#region Logic

let _mapApp: Application<HTMLCanvasElement> | undefined;
let _viewport: Viewport | undefined;

let _landRawData: {landKeyIndex: number, landData: string}[] = [];
let _mapData: Record<string, LandTileData | undefined> = {};
let _chunks: Record<string, Container | undefined> = {};

//#endregion

interface PreDataHeatmap {
  somniumMap?: Promise<Result<Texture>>;
}

interface Heatmap2DProps {
  // mapState: ValuationState;
  metaverse: Metaverses;
  renderAfter: boolean;
  
  x: number | undefined;
  y: number | undefined;
  
  filter?: MapFilter;
  legendFilter?: LegendFilter;
  percentFilter?: PercentFilter;
  onClickLand: (landRawData: LandTileData) => Promise<void>;
  initialX: number;
  initialY: number;
}

export default function Heatmap2D({
                                    metaverse,                                    
                                    filter,
                                    percentFilter,
                                    legendFilter,
  
                                    initialX,
                                    initialY, 
                                    renderAfter,
                                    onClickLand,
                                    // TODO: Check if needed
                                    // mapState,
                                    x,
                                    y,
                                  }: Heatmap2DProps) {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [indexLoading, setIndexLoading] = useState<number>(RandomIntMax(LOAD_PHRASES_LENGHT));

  //useref for rectangle functions
  const coordinatesRef = useRef<MapCoordinates>({ x: 0, y: 0 });
  const selectedLand = useRef<LandTileData | undefined>(undefined);
  const auxColor = useRef<string | undefined>(undefined);
  const isDragging = useRef<boolean>(false);
  const isSnapping = useRef<boolean>(false);

  const preDataPromise = useRef<PreDataHeatmap>({});
  // const [mapLoadingState, setMapLoadingState] = useState<boolean>(false);
  
  const isSomniumSpace = metaverse === Metaverses.SomniumSpace;
  
  const portfolio = useAppSelector((state) => state.portfolio.list);
  const watchlist = useAppSelector(state => state.watchlist.list);
  const { address } = useAccount();
  
  // Interval function (changes the loading message)
  useEffect(() => {
    if (!isLoading) return;

    const intervalFunction = setInterval(() => {
      setIndexLoading((prevIndex) => (prevIndex + 1) % LOAD_PHRASES_LENGHT)
    }, 8 * 1000); // X seg * 1000ms
    
    return () => {
      clearInterval(intervalFunction)
    };

  }, [isLoading]);
  
  useEffect(() => {
    window.addEventListener("resize", resize);

    setIsLoading(renderAfter);
    
    preLoad();
    
    // Init pixi variables
    //TODO: replace then use for response async/await
    initPixiViews()
      .then(() => {
        // Start and work with the socket
        socketWork();
      })
      .catch(err => console.error(err));

    // free socket
    return () => {
      window.removeEventListener("resize", resize);
      FreeSocket();
      cleanPixiViews();
      _mapData = {};
      _chunks = {};
      _landRawData = [];
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaverse]);
  
  // Filtering
  useEffect(() => {
    doFilter();
  }, [filter, percentFilter, legendFilter]);
  
  function preLoad() {
    if (isSomniumSpace) {
      preDataPromise.current.somniumMap = GetSomniumSpaceMap();
    }
  }
  
  async function initPixiViews() {
    const mapDivRefCurrent = mapDivRef.current;
    if (mapDivRefCurrent == null)
      return void LogWarning(Module.Heatmap, "Missing PixiDiv please checkout!");

    const {Viewport} = await import('pixi-viewport');
    _mapApp = new Application<HTMLCanvasElement>({
      width: mapDivRefCurrent.offsetWidth, 
      height: mapDivRefCurrent.offsetHeight,
      resolution: 1,
      backgroundAlpha: 0,
      backgroundColor: '#42425d',
      eventMode: "passive",
      // resizeTo: window,
    });
    _mapApp.view.style.borderRadius = '24px';

    // _mapApp.ticker.maxFPS = 2;
    // (globalThis as any).__PIXI_APP__ = _mapApp;

    _viewport = new Viewport({
      screenWidth: mapDivRefCurrent.offsetWidth,
      screenHeight: mapDivRefCurrent.offsetHeight,
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
        maxWidth: TILE_SIZE * 400,
        maxHeight: TILE_SIZE * 400,
      })
      .zoom(TILE_SIZE * 200);

    _viewport.on("drag-start", () => {
      isDragging.current = true;   
      document.body.style.cursor = "grabbing";
    });
    _viewport.on("drag-end", () => {
      document.body.style.cursor = "auto";
      setTimeout(() => {
        isDragging.current = false;
      },500);
    });
    _viewport.on("snap-start", () => {
      _viewport?.drag({pressDrag: false});
      isSnapping.current = true;   
    });
    _viewport.on("snap-end", () => {
      _viewport?.drag({pressDrag: true});
      isSnapping.current = false;
    });

    _mapApp.stage.addChild(_viewport);
    mapDivRefCurrent.appendChild(_mapApp.view);
    
    _viewport.moveCenter(initialX * TILE_SIZE, initialY * TILE_SIZE);

    resize();
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

  async function generateLandRectangle(land: LandType) {
    if (_viewport == undefined)
      return void LogError(Module.Heatmap, "Missing viewport while trying to render some land!");

    if (land.coords == undefined || land.coords.x == undefined || land.coords.y == undefined)
      return void LogError(Module.Heatmap, "Missing coordinates to render!");

    land.coords.y *= -1;

    if (address != undefined) {
      const wMRef = watchlist && watchlist[metaverse];
      if (wMRef) {
        const landInWatchlist = wMRef[land.tokenId];
        if (landInWatchlist) land.watchlist = true;
      }
      const pMRef = portfolio && portfolio[metaverse];
      if (pMRef) {
        const landInPortfolio = pMRef[land.tokenId];
        if (landInPortfolio) land.portfolio = true;
      }
    }

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
      _viewport.addChild(chunkContainer);
    }

    const border = GetLandBorder(land);
    const texture = await GetBorderTexture(border);
    const rectangle = new Sprite(texture);
    rectangle.eventMode = "static";
    
    if (isSomniumSpace) {
      const {width, height} = SomniumValues(land as LandSomniumSpace);

      rectangle.width = width;
      rectangle.height = height;
      rectangle.pivot.set(width / 2, height / 2);
      // rectangle.angle = rotation;
    } else {
      const side = DECENTRALAND_LANDS.some(x => {
        if (land.metaverse === Metaverses.Decentraland) return x === land.tile.type ?? 5;
        return true;
      }) ? TILE_SIZE :
        TILE_SIZE - BOUND_SIZE;
      rectangle.width = rectangle.height = side;
    }

    rectangle.tint = color;
    rectangle.name = `${land.coords.x},${land.coords.y}`;
    rectangle.position.set(
      land.coords.x * TILE_SIZE - chunkX * BLOCK_SIZE,
      land.coords.y * TILE_SIZE - chunkY * BLOCK_SIZE
    );
    
    const landRectangle: LandTileData = {
      name: `${land.coords.x},${land.coords.y}`,
      landX: land.coords.x,
      landY: land.coords.y,
      tokenId: land.tokenId,
      land: land,
      color: color,
      spriteRef: rectangle,
    };

    rectangle.on("mouseup", (e) => {
      e.preventDefault();
      if (!isDragging.current && !isSnapping.current) {
        if (landRectangle.tokenId === selectedLand.current?.tokenId) return;
        coordinatesRef.current = {x: landRectangle.landX, y: landRectangle.landY};
        if (landRectangle && selectedLand.current && auxColor.current) {
          selectedLand.current.spriteRef.tint = auxColor.current;
        }
        selectedLand.current = landRectangle;
        auxColor.current = landRectangle.color;
        rectangle.tint = LandColor.Clicked;
        void onClickLand(landRectangle);
      }
    });

    rectangle.on("mouseenter", () => {
      const clickedCoordinates = coordinatesRef.current;
      if (landRectangle.landX !== clickedCoordinates.x && landRectangle.landY !== clickedCoordinates.y) {
        rectangle.tint = LandColor.Highlight;
      }
    });
    
    rectangle.on("mouseout", () => {
      const clickedCoordinates = coordinatesRef.current;
      if (landRectangle.landX !== clickedCoordinates.x && landRectangle.landY !== clickedCoordinates.y) {
        rectangle.tint = landRectangle.color;
      }
    });

    chunkContainer.addChild(rectangle);
    
    return landRectangle;
  }

  async function fillSandboxDeadSpaces() {
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
          
          sprite.tint = LandColor.SandboxDeadLand;
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
  
  async function processLand(landKeyIndex: number, landData: string) {
    const formattedLand = FormatLand(landData, landKeyIndex, metaverse);
    // console.log({ formattedLand, landData, landKeyIndex });

    if (formattedLand == undefined) return LogError(Module.Heatmap, "Missing formattedLand on processLand");
    const land = await generateLandRectangle(formattedLand);

    if (land != undefined)
      _mapData[land.name] = land;
  }
  
  function socketWork() {
    if (_viewport == undefined)
      return LogError(Module.Heatmap, "Missing viewport on socketWork!");

    SetOnNewLand(async (landData, landKeyIndex) => {      
      if (landKeyIndex == undefined || landData == undefined)
        return LogError(Module.Heatmap, "Missing LanKeyIndex or LandData on socketWork");
      
      if (renderAfter && metaverse !== Metaverses.SomniumSpace)
        _landRawData.push({landKeyIndex, landData});
      else 
        await processLand(landKeyIndex, landData);
    });
    
    SetOnFinish(async () => {
      
      // Add LandTiles (if renderAfter is true)
      for (const {landKeyIndex, landData} of _landRawData) {
        await processLand(landKeyIndex, landData);
      }
      
      // If sandbox fill the empty spaces
      if (metaverse === Metaverses.SandBox)
        await fillSandboxDeadSpaces();

      setIsLoading(false);
      // TODO: check
      // setMapLoadingState(false);
    });
    
    InitLandSocket(async () => {
      // Add Somnium space map
      if (isSomniumSpace) {
        const somniumMap = await preDataPromise.current.somniumMap;
        if (somniumMap != undefined && somniumMap.success) {
          const mapSprite = new Sprite(somniumMap.value);
          const sideValue = (mapSprite.width / 2) * -1;
          mapSprite.position.set(sideValue, sideValue);
          setIsLoading(false);
          _viewport?.addChild(mapSprite);
        }
      }
      
      RenderStart(metaverse, 0);
    }); 
  }

  function doFilter() {
    // SetColors(_mapData, filter);
    
    for (const land of Object.values(_mapData)) {
      if (land == undefined) continue;

      // if (address) {
      //   /* if (portfolioLands[metaverse as keyof typeof portfolioLands][lands[child.name].tokenId]) lands[child.name].portfolio = true
      //   else if (lands[child.name].portfolio) delete lands[child.name].portfolio */
      //   const wMRef = wList[metaverse];
      //   if (wMRef != undefined && wMRef[lands[child.name].tokenId] != undefined)
      //     lands[child.name].watchlist = true;
      //   else if (lands[child.name].watchlist)
      //     lands[child.name].watchlist = undefined;
      // }

      const tile = GetTileColorByFilter(
        filter,
        percentFilter,
        legendFilter,
        land.land
      );
      
      land.spriteRef.tint = tile.color;
      land.color = tile.color;
    }
  }
  
  // Resize
  function resize() {
    if (_viewport == undefined) return LogError(Module.Heatmap, "Missing viewport on resize");
    if (_mapApp == undefined) return LogError(Module.Heatmap, "Missing map on resize");
    if(mapDivRef.current == null) return LogError(Module.Heatmap, "Missing parent div on resize");
    
    _mapApp.renderer.resize(mapDivRef.current.offsetWidth, mapDivRef.current.offsetHeight);
    try {
      _viewport.resize(mapDivRef.current.offsetWidth, mapDivRef.current.offsetHeight);
    } catch (e) {
      LogError(Module.Heatmap, "Error on viewport resize", e);
    }
  }
  
  useEffect(() => {
    if (x == undefined) return LogError(Module.Heatmap, "missing X coordinate on snap heatmap");
    if (y == undefined) return LogError(Module.Heatmap, "missing Y coordinate on snap heatmap");
    if (_viewport == undefined) return LogError(Module.Heatmap, "Missing viewport on snap heatmap");
    const realX = metaverse === Metaverses.SomniumSpace ? x * SOMNIUM_SCALE : x;
    const realY = metaverse === Metaverses.SomniumSpace ? y * SOMNIUM_SCALE : y;
    try {
      // Y axis is inverted on snap
      _viewport.snap(realX * TILE_SIZE, -realY * TILE_SIZE, {
        time: 2000,
        ease: 'easeOutCubic',
        removeOnComplete: true
      });
    } catch (e) {
      return LogError(Module.Heatmap, "Error snapping coordinates", e);
    }
  }, [x, y]);

  return (
    <>
          <>{/* HEATMAP VIEWPORT */}
        <div ref={mapDivRef} id="map"
             className={`bg-[#3C3E42] w-full h-full block rounded-[25px]`} 
        />
      </>
      {/* HEATMAP VIEWPORT */}
      <>{/* LOADER */}
        <div className={`h-[102%] w-full justify-center items-center absolute inset-0 z-10 bg-nm-highlight ${isLoading ? 'flex' : 'hidden'}`}>
          <LoaderUI size={100}/>
          <p className='absolute bottom-20 max-w-lg text-center'>{LOAD_PHRASES_ARRAY[indexLoading]}</p>
        </div>
      </>
      {/* LOADER */}
    </>
  )
}