import { useEffect, useState } from 'react'
import {
  LegendFilter,
  MapFilter,
  PercentFilter,
} from '../../lib/heatmap/heatmapCommonTypes'
import { filteredLayer } from '../../lib/heatmap/heatmapLayers'
import React from 'react'
import { Metaverse } from '../../lib/metaverse'
import {
  getBorder,
  setColours,
} from '../../lib/heatmap/valuationColoring'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { Container, Texture } from 'pixi.js'
import { getSocketService } from '../../backend/services/SocketService'
import Loader from '../Loader'
import { formatLand } from '../../lib/heatmapSocket'
import { ValuationState } from '../../pages/metaverseexplorer'
import { useAppSelector } from '../../state/hooks'
import { useAccount } from "wagmi";



let globalFilter: MapFilter,
  globalPercentFilter: PercentFilter,
  globalLegendFilter: LegendFilter

let landIndex = 0


let tempLands: any[] = []
let mapData: any = {}


interface IHeatmap2D {
  width: number | undefined
  height: number | undefined
  filter: MapFilter
  percentFilter: PercentFilter
  legendFilter: LegendFilter
  onClickLand: (landRawData: any) => void
  metaverse: Metaverse
  x: number | undefined
  y: number | undefined
  minX: number
  maxX: number
  minY: number
  maxY: number
  initialX: number
  initialY: number
  mapState: ValuationState
}

const loadPhrases = [
  'Did you know that there are over 160 siloed virtual worlds in the metaverse?',
  'The size of a single parcel in Decentraland is 16x16 meters!',
  'There are over 160,000 Sandbox LANDs',
  'Somnium Space is the leading VR compatible metaverse currently available.',
  'The term "metaverse" was first introduced in 1992 by sci-fi author Neal Stephenson in his novel Snow Crash.',
  'A single parcel in the Sandbox metaverse measures a generous 96x96 meters.'
]

let socketService: any

const Heatmap2D = ({
  width,
  height,
  filter,
  percentFilter,
  legendFilter,
  onClickLand,
  metaverse,
  x,
  y,
  initialX,
  initialY,
  mapState
}: IHeatmap2D) => {
  const [mapLoadingState, setMapLoadingState] = useState<boolean>(false);
  const [map, setMap] = useState<any>()
  const [viewport, setViewport] = useState<any>()
  const [chunks, setChunks] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  function getRandomInt(max: number) { return Math.floor(Math.random() * max); }
  const [indexLoading, setIndexLoading] = useState<number>(getRandomInt(loadPhrases.length))

  const { address } = useAccount()
  const wList = useAppSelector((state) => state.watchlist.list)
  const portfolioLands = useAppSelector((state) => state.portfolio.list)

  const CHUNK_SIZE = 32
  const TILE_SIZE = 64
  const BORDE_SIZE = 0
  const BLOCK_SIZE = CHUNK_SIZE * TILE_SIZE

  useEffect(() => {
    if (!isLoading) return
    const intervalFunction = setInterval(() => {
      setIndexLoading((prevIndex) => (prevIndex + 1) % loadPhrases.length)
    }, 8 * 1000) // X seg * 1000ms

    return () => clearInterval(intervalFunction)
  }, [])

  const rgbToHex = (values: any) => {
    let a = values.split(',')
    a = a.map(function (value: any) {
      value = parseInt(value).toString(16)
      return value.length == 1 ? '0' + value : value
    })
    return '0x' + a.join('')
  }

  const renderHandler = async ([land, landKeyIndex]: any) => {
    land = formatLand(land, metaverse)
    landIndex = Number(landKeyIndex)
    let localChunks: any = chunks
    let name = ''
    land.coords.y *= -1

    if (address) {
      if (portfolioLands[metaverse as keyof typeof portfolioLands][land.tokenId]) land.portfolio = true
      if (wList[metaverse as keyof typeof wList][land.tokenId]) land.watchlist = true
    }

    if (land.coords) {
      name = land.coords.x + ',' + land.coords.y
    }
    mapData[name] = land

    let value = land
    let tile: any

    tile = filteredLayer(
      value.coords.x,
      value.coords.y,
      globalFilter,
      globalPercentFilter,
      globalLegendFilter,
      land
    )
    let { color } = tile

    color = color.includes('rgb')
      ? rgbToHex(color.split('(')[1].split(')')[0])
      : '0x' + color.split('#')[1]
    const border = getBorder(land, metaverse)
    const border_url = `images/${border}`
    const texture = border
      ? await PIXI.Texture.fromURL(border_url, {
        mipmap: PIXI.MIPMAP_MODES.ON,
      })
      : PIXI.Texture.WHITE
    const rectangle: any = new PIXI.Sprite(texture)
    const chunkX = Math.floor(land.coords.x / CHUNK_SIZE)
    const chunkY = Math.floor(land.coords.y / CHUNK_SIZE)
    const chunkKey = `${chunkX}:${chunkY}`
    let chunkContainer = localChunks[chunkKey]
    rectangle.tint = color
    rectangle.width = rectangle.height = new Set([5, 6, 7, 8, 12]).has(
      land?.tile?.type
    )
      ? TILE_SIZE
      : TILE_SIZE - BORDE_SIZE
    rectangle.name = land.coords.x + ',' + land.coords.y
    rectangle.landX = land.coords.x
    rectangle.landY = land.coords.y
    rectangle.tokenId = land.tokenId
    rectangle.position.set(
      land.coords.x * TILE_SIZE - chunkX * BLOCK_SIZE,
      land.coords.y * TILE_SIZE - chunkY * BLOCK_SIZE
    )
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

  const onMouseMove = (e: any, currentSprite: any, currentTint: any) => {
    if (mapLoadingState) return;

    let { x, y } = viewport.toLocal(e.data.global)

    x = Math.floor(x / TILE_SIZE)
    y = Math.floor(y / TILE_SIZE)

    const chunkX = Math.floor(x / CHUNK_SIZE)
    const chunkY = Math.floor(y / CHUNK_SIZE)
    const chunkKey = `${chunkX}:${chunkY}`
    let chunkContainer = chunks[chunkKey]

    x = x * TILE_SIZE - chunkX * BLOCK_SIZE
    y = y * TILE_SIZE - chunkY * BLOCK_SIZE

    const child = chunkContainer?.children.find(
      (child: any) => child.x === x && child.y === y
    )

    if (child) {
      if (child.type == 'dead') {
        if (currentSprite) {
          currentSprite.tint = currentTint
        }
        return
      }
      if (currentSprite) {
        currentSprite.tint = currentTint
        currentTint = child.tint
      }
      if (!currentTint) currentTint = child.tint
      currentSprite = child
      //! HOVER COLOR
      currentSprite.tint = 0xdb2777
    }

    return {
      currentSprite,
      currentTint
    }
  }

  useEffect(() => {
    if (!viewport) return

    console.log('Creando socket', new Date().toISOString())
    const socketServiceUrl = process.env.SOCKET_SERVICE as string
    tempLands = []
    socketService = getSocketService(
      socketServiceUrl,
      () => {

        console.log('Connected', new Date().toISOString())
        socketService.renderStart(metaverse, landIndex)
      },
      (landRawData: any) => {
        tempLands.push(landRawData)
      }
    )
    setIsLoading(true)
    socketService.onGiveLand(onClickLand)
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
            const rectangle: any = new PIXI.Sprite(await PIXI.Texture.fromURL(borderURL, {
              mipmap: PIXI.MIPMAP_MODES.ON,
            }))
            const chunkX = Math.floor(x / CHUNK_SIZE)
            const chunkY = Math.floor(y / CHUNK_SIZE)
            const chunkKey = `${chunkX}:${chunkY}`
            let chunkContainer = localChunks[chunkKey]
            //! SANDBOX DEAD COLOR
            rectangle.tint = 0x2d4162
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
    landIndex = 0
    setMap(null)
    setViewport(null)
    setChunks({})
    mapData = {}
    const map: PIXI.Application = new PIXI.Application({
      width,
      height,
      resolution: 1,
      transparent: true,
    })

    map.view.style.borderRadius = '24px'

    const viewport: any = new Viewport({
      screenWidth: width,
      screenHeight: height,
      interaction: map.renderer.plugins.interaction,
      passiveWheel: false,
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
    map.stage.addChild(viewport)
    document.getElementById('map')?.appendChild(map.view)
    setMap(map)
    setViewport(viewport)
    viewport.moveCenter(initialX * TILE_SIZE, initialY * TILE_SIZE)

    return () => {
      try { document?.getElementById('map')?.removeChild(map?.view) } catch { }

      try { map?.destroy() } catch { }
      try { viewport?.destroy() } catch { }
    }
  }, [metaverse])

  useEffect(() => {
    if (!viewport) return

    let currentTint: any
    let currentSprite: any

    //* remove existing listeners to viewport before add new listeners
    viewport.removeListener('mousemove');
    viewport.removeListener('drag-start');
    viewport.removeListener('drag-end');
    viewport.removeListener('click');

    //* add new listeners to viewport
    viewport.on('mousemove', (e: any) => {
      let mouseMoveData = onMouseMove(e, currentSprite, currentTint);
      currentSprite = mouseMoveData?.currentSprite;
      currentTint = mouseMoveData?.currentTint;
    })
    let isDragging = false
    viewport.on('drag-start', () => {
      isDragging = true
    })
    viewport.on('drag-end', () => {
      isDragging = false
    })
    viewport.on('click', () => {
      if (currentSprite && !isDragging) {
        const tokenId = currentSprite.tokenId
        socketService.getLand(metaverse, tokenId)
        setMapLoadingState(true)
      }
    })
  }, [viewport, mapLoadingState])

  useEffect(() => {
    if (map?.renderer) {
      map?.renderer.resize(width || 0, height || 0);

      try {
        viewport.resize(width, height);
      } catch {
        console.error("error on viewport resize");
      }
    }
  }, [width, height])

  useEffect(() => {
    ; (globalFilter = filter),
      (globalPercentFilter = percentFilter),
      (globalLegendFilter = legendFilter)
  }, [filter, percentFilter, legendFilter])

  const filterUpdate = async () => {
    let lands = await setColours(mapData, globalFilter)
    for (const key in chunks) {
      for (const child of chunks[key].children) {
        if (!lands[child.name]) continue

        if (address) {
          if (portfolioLands[metaverse as keyof typeof portfolioLands][lands[child.name].tokenId]) lands[child.name].portfolio = true
          else if (lands[child.name].portfolio) delete lands[child.name].portfolio

          if (wList[metaverse as keyof typeof wList][lands[child.name].tokenId]) lands[child.name].watchlist = true
          else if (lands[child.name].watchlist) delete lands[child.name].watchlist
        }

        let tile: any = filteredLayer(
          child.landX,
          child.landY,
          filter,
          percentFilter,
          legendFilter,
          lands[child.name]
        )
        let { color } = tile
        if (child.name === `${x},${y}`) {
          //! SELECTED COLOR
          child.tint = 0xFFFFFF
        } else {
          child.tint = color.includes('rgb')
            ? rgbToHex(color.split('(')[1].split(')')[0])
            : '0x' + color.split('#')[1]
        }
      }
    }
  }

  useEffect(() => {
    if (!chunks || !mapData) return

    filterUpdate()
  }, [filter, percentFilter, legendFilter, x, y])

  useEffect(() => {
    if (!x || !y) return

    try {
      viewport.snap(x * TILE_SIZE, y * TILE_SIZE, { time: 2000, ease: 'easeOutCubic', removeOnComplete: true });
    } catch (e) {
      return
    }
  }, [x, y])

  useEffect(() => {
    if (isLoading) {
      setMapLoadingState(true);
    } else if (mapState === 'loadingQuery') {
      setMapLoadingState(true);
    } else {
      setMapLoadingState(false);
    }
  }, [mapState, isLoading])

  return (
    <>
      <div
        id="map"
        className={`bg-[#3C3E42] ${isLoading ? 'hidden' : 'block rounded-[25px]'}`}
        style={{ width, height, border: 16 }}
      />
      <div className={`h-full w-full justify-center items-center relative ${isLoading ? 'flex' : 'hidden'}`}>
        <Loader color='blue' size={100} />
        <p className='absolute bottom-20 max-w-lg text-center'>{loadPhrases[indexLoading]}</p>
      </div>
    </>
  )
}

export default Heatmap2D