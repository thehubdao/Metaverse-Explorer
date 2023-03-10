import { useEffect, useState } from 'react'
import {
  LegendFilter,
  MapFilter,
  PercentFilter,
  ValuationTile,
} from '../../lib/heatmap/heatmapCommonTypes'
import { filteredLayer } from '../../lib/heatmap/heatmapLayers'
import React from 'react'
import { Metaverse } from '../../lib/metaverse'
import {
  getBorder,
  setColours,
  setLandColour,
} from '../../lib/heatmap/valuationColoring'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { Container, Texture } from 'pixi.js'
import { getSocketService } from '../../backend/services/SocketService'
import Loader from '../Loader'
import axios from 'axios'
import { useAccount } from 'wagmi'



let globalFilter: MapFilter,
  globalPercentFilter: PercentFilter,
  globalLegendFilter: LegendFilter

let landIndex = 0

interface IHeatmap2D {
  width: number | undefined
  height: number | undefined
  filter: MapFilter
  percentFilter: PercentFilter
  legendFilter: LegendFilter
  onHover: (
    x: number,
    y: number,
    name: string | undefined,
    owner: string | undefined
  ) => void
  onClick: (land: ValuationTile | undefined, x: number, y: number, watchlist: any) => void
  metaverse: Metaverse
  x: number | undefined
  y: number | undefined
  minX: number
  maxX: number
  minY: number
  maxY: number
  initialX: number
  initialY: number
}

const loadPhrases = [
  'Did you know that there are over 160 siloed virtual worlds in the metaverse?',
  'The size of a single parcel in Decentraland is 16x16 meters!',
  'There are over 160,000 Sandbox LANDs',
  'Somnium Space is the leading VR compatible metaverse currently available.',
  'The term "metaverse" was first introduced in 1992 by sci-fi author Neal Stephenson in his novel Snow Crash.',
  'A single parcel in the Sandbox metaverse measures a generous 96x96 meters.'
]

const formatLand = (pureLandData: string) => {
  const dataArray = pureLandData.split(';')
  const [x, y, eth_predicted_price, floor_adjusted_predicted_price, tokenId] = dataArray
  const land = {
    coords: { x, y },
    eth_predicted_price,
    floor_adjusted_predicted_price, tokenId
  }

  return land
}

const Heatmap2D = ({
  width,
  height,
  filter,
  percentFilter,
  legendFilter,
  onHover,
  onClick,
  metaverse,
  x,
  y,
  initialX,
  initialY,
}: IHeatmap2D) => {
  const [map, setMap] = useState<any>()
  const [viewport, setViewport] = useState<any>()
  const [mapData, setMapData] = useState<any>({})
  const [chunks, setChunks] = useState<any>({})
  /*   const [metaverseData, setMetaverseData] = useState<any>() */
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [landsLoaded, setLandsLoaded] = useState<number>(0)

  function getRandomInt(max: number) { return Math.floor(Math.random() * max); }
  const [indexLoading, setIndexLoading] = useState<number>(getRandomInt(loadPhrases.length))

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
  let landAmount = 0
  const renderHandler = async ([land, landKeyIndex]: any) => {
    try {
      land = formatLand(land)
      setLandsLoaded(landAmount)
      landIndex = Number(landKeyIndex)
      landAmount += 1
      setLandsLoaded(landAmount)
      let lands: any = mapData
      let localChunks: any = chunks
      let name = ''
      land.coords.y *= -1

      if (land.coords) {
        name = land.coords.x + ',' + land.coords.y
      }
      lands[name] = land!
      lands[name].land_id = land.tokenId
      /* globalFilter == 'basic'
        ? null
        : (land = await setLandColour(land, globalFilter, metaverseData)) */
      setMapData(lands)
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
    } catch (e) { }
  }

  useEffect(() => {
    if (!viewport) return
    console.log('Creando socket', new Date().toISOString())
    const socketServiceUrl = 'wss://heatmapws.itrmachines.com:3001/'
    const socketService = getSocketService(
      socketServiceUrl,
      () => {

        console.log('Connected', new Date().toISOString())
        socketService.renderStart(metaverse, landIndex)
      },
      renderHandler
    )
    setIsLoading(true)
    socketService.onRenderFinish(async () => {
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
    setMapData({})
    const map: PIXI.Application = new PIXI.Application({
      width,
      height,
      resolution: 1,
      transparent: true,
    })

    map.view.style.borderRadius = '24px'

    const viewport: any = new Viewport({
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
    /* .clamp({
        direction: 'all',
        underflow: 'center'
    }) */
    map.stage.addChild(viewport)
    document.getElementById('map')?.appendChild(map.view)
    setMap(map)
    setViewport(viewport)
    const setBackground = async () => {

      const sandbox_bg_url = 'images/sandbox_bg.jpg'
      const texture = await PIXI.Texture.fromURL(sandbox_bg_url, {
      })
      const mapBackground = new PIXI.Sprite(/* metaverse == 'sandbox' ? texture : */ PIXI.Texture.WHITE)
      mapBackground.position.set(-204 * TILE_SIZE, -203 * TILE_SIZE)
      mapBackground.width = 410 * TILE_SIZE
      mapBackground.height = 410 * TILE_SIZE
      mapBackground.zIndex = -100
      viewport.addChild(mapBackground)
    }

    /* const getMetaverseData = async () => {
      await setBackground()
      let dataCall: any = await fetch(
        process.env.SOCKET_SERVICE + `/limits?metaverse=${metaverse}`
      )

      dataCall = await dataCall.json()
      setMetaverseData(dataCall)
    }
    getMetaverseData() */
    return () => {
      try { document?.getElementById('map')?.removeChild(map?.view) } catch { }

      try { map?.destroy() } catch { }
      try { viewport?.destroy() } catch { }

      onHover(0 / 0, 0 / 0, undefined, undefined)
    }
  }, [metaverse])

  useEffect(() => {
    if (!viewport) return
    viewport.moveCenter(initialX * TILE_SIZE, initialY * TILE_SIZE)
    let currentTint: any
    let currentSprite: any
    viewport?.on('mousemove', (e: any): any => {
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
      if (child && child.type == 'dead') return
      if (child) {
        if (currentSprite) {
          currentSprite.tint = currentTint
          currentTint = child.tint
        }
        if (!currentTint) currentTint = child.tint
        currentSprite = child
        currentSprite.tint = 0xdb2777
        let currentLand =
          mapData[`${currentSprite.landX},${currentSprite.landY}`]
        onHover(
          currentSprite.landX,
          currentSprite.landY * -1,
          currentLand?.name,
          currentLand?.owner
        )
      } else {
        if (currentSprite && e.target != currentSprite) {
          currentSprite.tint = currentTint
          currentSprite = null
          currentTint = null
        }
      }
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
        const x = currentSprite.landX,
          y = currentSprite.landY
        currentTint = 4 * 0xff9990
        onClick(mapData[x + ',' + y], x, y, undefined)
      }
    })
  }, [viewport])

  useEffect(() => {
    if (map?.renderer) map?.renderer.resize(width || 0, height || 0)
  }, [width, height])

  useEffect(() => {
    ; (globalFilter = filter),
      (globalPercentFilter = percentFilter),
      (globalLegendFilter = legendFilter)
  }, [filter, percentFilter, legendFilter])

  useEffect(() => {
    if (!chunks || !mapData) return
    const filterUpdate = async () => {
      let lands = await setColours(mapData, globalFilter)
      for (const key in chunks) {
        for (const child of chunks[key].children) {
          if (!lands[child.name]) continue
          let tile: any = filteredLayer(
            child.landX,
            child.landY,
            filter,
            percentFilter,
            legendFilter,
            lands[child.name]
          )
          let { color } = tile
          child.tint = color.includes('rgb')
            ? rgbToHex(color.split('(')[1].split(')')[0])
            : '0x' + color.split('#')[1]
        }
      }
    }
    /* if (metaverseData)  */filterUpdate()
  }, [filter, percentFilter, legendFilter, x, y])

  useEffect(() => {
    if (!x || !y) return

    try {
      document.fullscreenElement
        ? viewport.moveCenter(x * TILE_SIZE, y * TILE_SIZE)
        : 0
    } catch (e) {
      return
    }

    const chunkX = Math.floor(x / CHUNK_SIZE)
    const chunkY = Math.floor(y / CHUNK_SIZE)
    const chunkKey = `${chunkX}:${chunkY}`
    let chunkContainer = chunks[chunkKey]

    x = x * TILE_SIZE - chunkX * BLOCK_SIZE
    y = y * TILE_SIZE - chunkY * BLOCK_SIZE

    const child = chunkContainer?.children.find(
      (child: any) => child.x === x && child.y === y
    )
    const prevColor = child.tint
    const prevWidth = child.width

    child.tint = 4 * 0xff9990
    child.width = child.height = TILE_SIZE - BORDE_SIZE / 3
    return () => {
      child.tint = prevColor
      child.width = child.height = prevWidth
    }
  }, [x, y])

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
        {landAmount}
      </div>
    </>
  )
}

export default Heatmap2D