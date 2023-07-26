import {useEffect, useRef, useState} from 'react';
import {Application, Color, Container, FederatedPointerEvent, MIPMAP_MODES, Sprite, Texture} from 'pixi.js';
import {Viewport} from 'pixi-viewport';
import {useAccount} from "wagmi";
import {LegendFilter, MapFilter, PercentFilter} from "../../types/heatmap/heatmap.type";
import {Metaverse} from "../../enums/heatmap.enum";
import {ValuationState} from "../../enums/valuation.enum";
import {RandomIntMax} from "../../utils/common.util";
import {
  BLOCK_SIZE,
  BOUND_SIZE,
  CHUNK_SIZE,
  LOAD_PHRASES_ARRAY,
  LOAD_PHRASES_LENGHT,
  TILE_SIZE
} from "../../constants/heatmap/heatmap.constant";
import Loader from './loader.component';
import {LogError} from "../../utils/logging.util";
import {Module} from "../../enums/logging.enum";
import {LandData} from "../../interfaces/land.interface";
import {GetBorder, SetColors} from "../../utils/heatmap/valuation-coloring.util";
import {GetSocketService, SocketService} from "../../utils/socket/socket-service.util";
import {FormatLand} from "../../utils/heatmap/heatmap-socket.util";
import {FilteredLayer} from "../../utils/heatmap/heatmap-layers.util";
import {OtherSprite} from "../../interfaces/heatmap.interface";
import {IsOtherSprite} from "../../utils/heatmap/heatmap.util";

let globalFilter: MapFilter | undefined;
let globalPercentFilter: PercentFilter | undefined;
let globalLegendFilter: LegendFilter | undefined;

let landIndex = 0;
let mapData: Record<string, LandData> = {};

// let tempLands: any[] = []
let socketService: SocketService;

interface Heatmap2DProps {
  viewportWidth: number | undefined;
  viewportHeight: number | undefined;
  mapState: ValuationState;

  filter: MapFilter;
  percentFilter: PercentFilter;
  legendFilter: LegendFilter;
  onClickLand: (landRawData: any) => void;
  metaverse: Metaverse;
  x: number | undefined;
  y: number | undefined;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  initialX: number;
  initialY: number;
}

export default function Heatmap2D({
                                    viewportWidth,
                                    viewportHeight,
                                    mapState,

                                    filter,
                                    percentFilter,
                                    legendFilter,
                                    onClickLand,
                                    metaverse,
                                    x,
                                    y,
                                    initialX,
                                    initialY,
                                  }: Heatmap2DProps) {

  const mapDivRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<Application<HTMLCanvasElement>>();
  const [viewport, setViewport] = useState<Viewport>();
  const [indexLoading, setIndexLoading] = useState<number>(RandomIntMax(LOAD_PHRASES_LENGHT));
  const [mapLoadingState, setMapLoadingState] = useState<boolean>(false);
  const [chunks, setChunks] = useState<Partial<Record<string, Container>>>({});

  const [isLoading, setIsLoading] = useState<boolean>(true);


  const {address} = useAccount();
  // const wList = useAppSelector((state) => state.watchlist.list);
  const wList: Partial<Record<Metaverse, Record<string, unknown>>> = {};
  // const portfolioLands = useAppSelector((state) => state.portfolio.list)

  useEffect(() => {
    if (!isLoading) return

    const intervalFunction = setInterval(() => {
      setIndexLoading((prevIndex) => (prevIndex + 1) % LOAD_PHRASES_LENGHT)
    }, 8 * 1000); // X seg * 1000ms

    return () => {
      clearInterval(intervalFunction)
    };
  }, []);

  // Filter update
  useEffect(() => {
    globalFilter = filter;
    globalPercentFilter = percentFilter;
    globalLegendFilter = legendFilter;
  }, [filter, percentFilter, legendFilter]);

  async function renderHandler([land, landKeyIndex]: string[]) {
    if (viewport == undefined)
      return LogError(Module.Heatmap, "Missing viewport while trying to render land!");
    
    const landData = FormatLand(land, metaverse);
    if (landData.coords == undefined || landData.coords.x == undefined || landData.coords.y == undefined)
      return LogError(Module.Heatmap, "Missing coordinates to render!");
    
    landIndex = Number(landKeyIndex);
    let localChunks: typeof chunks = {...chunks};
    let name = '';
    
    // if (landData.coords?.y != undefined)
      landData.coords.y *= -1;

    if (address != undefined) {
      //if (portfolioLands[metaverse as keyof typeof portfolioLands][land.tokenId]) land.portfolio = true
      const wMRef = wList[metaverse];
      if (wMRef == undefined || wMRef[landData.tokenId] == undefined) landData.watchlist = true;
    }
    
    name = landData.coords.x + ',' + landData.coords.y;
    
    mapData[name] = landData;

    let value = landData;
    const tile = await FilteredLayer(
      value.coords?.x,
      value.coords?.y,
      globalFilter,
      globalPercentFilter,
      globalLegendFilter,
      landData
    );
    
    let {color} = tile;
    console.log("RenderHandler Color: ", color);

    // color = color.includes('rgb')
    //   ? ColorRgbToHex(color.split('(')[1].split(')')[0])
    //   : '0x' + color.split('#')[1];

    const border = GetBorder(landData, metaverse);
    const border_url = `images/${border}`;
    const texture = border != undefined
      ? await Texture.fromURL(border_url, { mipmap: MIPMAP_MODES.ON })
      : Texture.WHITE;
    
    const rectangle: OtherSprite = new Sprite(texture);
    const chunkX = Math.floor(landData.coords.x / CHUNK_SIZE);
    const chunkY = Math.floor(landData.coords.y / CHUNK_SIZE);
    const chunkKey = `${chunkX}:${chunkY}`;
    let chunkContainer = localChunks[chunkKey];
    rectangle.tint = color;
    rectangle.width = rectangle.height = new Set([5, 6, 7, 8, 12]).has(landData.tile?.type ?? 5)
      ? TILE_SIZE
      : TILE_SIZE - BOUND_SIZE;
    rectangle.name = landData.coords.x + ',' + landData.coords.y;
    rectangle.landX = landData.coords.x;
    rectangle.landY = landData.coords.y;
    rectangle.tokenId = landData.tokenId;
    rectangle.position.set(
      landData.coords.x * TILE_SIZE - chunkX * BLOCK_SIZE,
      landData.coords.y * TILE_SIZE - chunkY * BLOCK_SIZE
    );
    
    if (!chunkContainer) {
      chunkContainer = localChunks[chunkKey] = new Container();
      chunkContainer.position.set(
        chunkX * BLOCK_SIZE,
        chunkY * BLOCK_SIZE
      );
      setChunks(localChunks);
    }
    chunkContainer.addChild(rectangle);
    viewport.addChild(chunkContainer);
  }

  function onMouseMove(event: FederatedPointerEvent, currentSprite: OtherSprite | undefined, currentTint: string | undefined) {
    if (mapLoadingState) return;
    if (viewport == undefined) return void LogError(Module.Heatmap, "Missing viewport!");

    let newCurrentSprite = currentSprite == undefined ? undefined : {...currentSprite} as OtherSprite;
    let newCurrentTint = currentTint;

    let {x, y} = viewport.toLocal(event.global);
    x = Math.floor(x / TILE_SIZE)
    y = Math.floor(y / TILE_SIZE)

    const chunkX = Math.floor(x / CHUNK_SIZE);
    const chunkY = Math.floor(y / CHUNK_SIZE);
    const chunkKey = `${chunkX}:${chunkY}`;
    let chunkContainer = chunks[chunkKey];

    if (chunkContainer == undefined)
      return void LogError(Module.Heatmap, `Missing chunk on coords: ${chunkKey}`);

    x = x * TILE_SIZE - chunkX * BLOCK_SIZE;
    y = y * TILE_SIZE - chunkY * BLOCK_SIZE;

    const child = chunkContainer.children.find(
      (child) => child.x === x && child.y === y
    ) as OtherSprite;

    if (child != undefined) {
      if (child.type == 'dead') {
        if (newCurrentSprite != undefined && newCurrentTint != undefined) {
          newCurrentSprite.tint = newCurrentTint;
        }
        return {sprite: newCurrentSprite, tint: newCurrentTint};
      }
      
      console.log("Tint Value: ", child.tint);
      if (newCurrentSprite != undefined && newCurrentTint != undefined) {
        newCurrentSprite.tint = newCurrentTint;
        newCurrentTint = child.tint;
        // newCurrentTint = new Color(child.tint).toHex();
      }
      if (newCurrentTint == undefined) newCurrentTint = child.tint;
      newCurrentSprite = child;
      //! HOVER COLOR
      newCurrentSprite.tint = '#db2777';
    }

    return {
      sprite: newCurrentSprite,
      tint: newCurrentTint
    }
  }

  useEffect(() => {
    if (viewport == undefined)
      return LogError(Module.Heatmap, "Missing viewport!");

    console.log('Creando socket', new Date().toISOString());

    const socketServiceUrl = process.env.SOCKET_SERVICE;
    if (socketServiceUrl == undefined)
      return LogError(Module.Heatmap, "Missing SocketService env value!");

    const tempLands: string[][] = [];
    socketService = GetSocketService(
      socketServiceUrl,
      () => {
        console.log('Connected', new Date().toISOString());
        socketService.renderStart(metaverse, landIndex);
      },
      (landRawData: any) => {
        console.log('Land Data: ', landRawData);
        tempLands.push(landRawData);
      }
    );

    setIsLoading(true);

    socketService.onGiveLand(onClickLand);
    socketService.onRenderFinish(async () => {
      for (const land of tempLands) {
        await renderHandler(land)
      }
      const localChunks = chunks
      if (metaverse == "sandbox") for (let i = -204; i <= 203; i++) {
        const x = i
        for (let j = -203; j <= 204; j++) {
          const y = j
          if (!mapData[x + ',' + y]) {
            const borderURL = 'images/full_border_dead.jpg'
            const rectangle: OtherSprite = new Sprite(await Texture.fromURL(borderURL, {
              mipmap: MIPMAP_MODES.ON,
            }));
            const chunkX = Math.floor(x / CHUNK_SIZE)
            const chunkY = Math.floor(y / CHUNK_SIZE)
            const chunkKey = `${chunkX}:${chunkY}`
            let chunkContainer = localChunks[chunkKey]
            //! SANDBOX DEAD COLOR
            rectangle.tint = '#2d4162';
            rectangle.width = rectangle.height =
              TILE_SIZE
            rectangle.position.set(
              x * TILE_SIZE - chunkX * BLOCK_SIZE,
              y * TILE_SIZE - chunkY * BLOCK_SIZE
            )
            rectangle.type = 'dead'
            if (!chunkContainer) {
              chunkContainer = localChunks[chunkKey] = new Container()
              chunkContainer.position.set(
                chunkX * BLOCK_SIZE,
                chunkY * BLOCK_SIZE
              )
              setChunks(localChunks)
            }
            chunkContainer.addChild(rectangle)
            viewport.addChild(chunkContainer)
          }
        }
      }

      setIsLoading(false)
      setMapLoadingState(false)
    })
    return () => {
      socketService.disconnect()
    }
  }, [viewport])

  useEffect(() => {
    if (mapDivRef.current == null) return;

    landIndex = 0;
    setMap(undefined);
    setViewport(undefined);
    setChunks({});
    // mapData = {}

    const mapApp = new Application<HTMLCanvasElement>({
      width: viewportWidth,
      height: viewportHeight,
      resolution: 1,
      backgroundAlpha: 0,
    });

    // TODO Check how to apply this
    // map.view.style.borderRadius = '24px'

    // map.renderer.plugins.

    const viewport = new Viewport({
      screenWidth: viewportWidth,
      screenHeight: viewportHeight,
      passiveWheel: false,
      events: mapApp.renderer.events
      // screenWidth: viewportWidth,
      // screenHeight: viewportHeight,
      // interaction: map.renderer.plugins.interaction,
      // passiveWheel: false,
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

    mapApp.stage.addChild(viewport)

    // document.getElementById('map')?.appendChild(map.view)
    mapDivRef.current.appendChild(mapApp.view);
    setMap(mapApp);
    setViewport(viewport)
    viewport.moveCenter(initialX * TILE_SIZE, initialY * TILE_SIZE)

    return () => {
      try {
        if (mapDivRef.current != null)
          mapDivRef.current.removeChild(mapApp.view);

        mapApp.destroy();
        viewport.destroy();
      } catch (e) {
        LogError(Module.Heatmap, "Error disposing pixi items from view", e);
      }
    }
  }, [metaverse]);

  useEffect(() => {

    if (viewport == undefined) return

    let currentTint: string | undefined;
    let currentSprite: OtherSprite | undefined;

    //* remove existing listeners to viewport before add new listeners
    viewport.removeListener('mousemove');
    viewport.removeListener('drag-start');
    viewport.removeListener('drag-end');
    viewport.removeListener('click');

    //* add new listeners to viewport
    viewport.on('mousemove', (event) => {
      const mouseMoveData = onMouseMove(event, currentSprite, currentTint);
      currentSprite = mouseMoveData?.sprite;
      currentTint = mouseMoveData?.tint;
    });

    let isDragging = false

    viewport.on('drag-start', () => {
      isDragging = true
    });

    viewport.on('drag-end', () => {
      isDragging = false
    });

    viewport.on('click', () => {
      if (currentSprite && !isDragging) {
        const tokenId = currentSprite.tokenId;
        socketService.getLand(metaverse, tokenId);
        setMapLoadingState(true);
      }
    });
  }, [viewport, mapLoadingState]);

  // Resize
  useEffect(() => {
    if (viewport == undefined) return LogError(Module.Heatmap, "Missing viewport on resize");
    if (map == undefined) return LogError(Module.Heatmap, "Missing map on resize");

    map.renderer.resize(viewportWidth || 0, viewportHeight || 0);

    try {
      viewport.resize(viewportWidth, viewportHeight);
    } catch (e) {
      LogError(Module.Heatmap, "Error on viewport resize", e);
    }
  }, [viewportWidth, viewportHeight]);

  async function filterUpdate() {
    const lands = await SetColors(mapData, globalFilter);
    if (lands == undefined)
      return LogError(Module.Heatmap, "Lands couldn't filter!");

    for (const chunk of Object.values(chunks)) {
      if (chunk == undefined) continue;

      for (const child of chunk.children) {
        if (!IsOtherSprite(child)) continue;
        if (child.name == null || lands[child.name] == undefined) continue;

        if (address) {
          /* if (portfolioLands[metaverse as keyof typeof portfolioLands][lands[child.name].tokenId]) lands[child.name].portfolio = true
          else if (lands[child.name].portfolio) delete lands[child.name].portfolio */
          const wMRef = wList[metaverse];
          if (wMRef != undefined && wMRef[lands[child.name].tokenId] != undefined)
            lands[child.name].watchlist = true;
          else if (lands[child.name].watchlist)
            lands[child.name].watchlist = undefined;
        }

        let tile = await FilteredLayer(
          child.landX,
          child.landY,
          filter,
          percentFilter,
          legendFilter,
          lands[child.name]
        );
        let {color} = tile;
        if (child.name === `${x},${y}`) {
          //! SELECTED COLOR
          child.tint = '#FFFFFF';
        } else {
          child.tint = color;
        }
      }
    }
  }


  // Filtering
  useEffect(() => {
    (async () => {
      await filterUpdate();
    })().catch(err =>
      LogError(Module.Heatmap, "Error applying filters", err)
    );
  }, [filter, percentFilter, legendFilter, x, y]);

  useEffect(() => {

    if (x == undefined || y == undefined) return;
    if (viewport == undefined)
      return LogError(Module.Heatmap, "Missing viewport on snap heatmap");

    try {
      viewport.snap(x * TILE_SIZE, y * TILE_SIZE, {
        time: 2000,
        ease: 'easeOutCubic',
        removeOnComplete: true
      });
    } catch (e) {
      return LogError(Module.Heatmap, "Error snapping coordinates", e);
    }
  }, [x, y]);

  useEffect(() => {
    if (isLoading || mapState === ValuationState.LoadingQuery) {
      setMapLoadingState(true);
    } else {
      setMapLoadingState(false);
    }
  }, [mapState, isLoading]);

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