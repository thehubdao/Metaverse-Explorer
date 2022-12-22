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
import { setColours, setLandColour } from '../../lib/heatmap/valuationColoring'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { io } from 'socket.io-client'
import { Container } from 'pixi.js'

let socket = io(process.env.SOCKET_SERVICE!, {
    path: '/heatmap-backend',
    transports: ['websocket'],
})

let globalFilter: MapFilter,
    globalPercentFilter: PercentFilter,
    globalLegendFilter: LegendFilter

interface IMaptalksCanva {
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
    onClick: (land: ValuationTile | undefined, x: number, y: number) => void
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

const MaptalksCanva = ({
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
}: IMaptalksCanva) => {
    const [map, setMap] = useState<any>()
    const [viewport, setViewport] = useState<any>()
    const [mapData, setMapData] = useState<any>({})
    const [chunks, setChunks] = useState<any>({})
    const [metaverseData, setMetaverseData] = useState<any>()
    const CHUNK_SIZE = 32
    const TILE_SIZE = 64
    const BORDE_SIZE = 14
    const BLOCK_SIZE = CHUNK_SIZE * TILE_SIZE
    let checkpoint = 0
    const rgbToHex = (values: any) => {
        let a = values.split(',')
        a = a.map(function (value: any) {
            value = parseInt(value).toString(16)
            return value.length == 1 ? '0' + value : value
        })
        return '0x' + a.join('')
    }
    useEffect(() => {
        setMap(null)
        setViewport(null)
        setChunks({})
        setMapData({})
        const map: any = new PIXI.Application({
            width,
            height,
            resolution: 1,
            transparent: true,
        })

        const viewport: any = new Viewport({
            interaction: map.renderer.plugins.interaction,
            passiveWheel: false,
        }).drag().pinch().wheel().clampZoom({
            minWidth: TILE_SIZE * 8,
            minHeight: TILE_SIZE * 8,
            maxWidth: TILE_SIZE * 800,
            maxHeight: TILE_SIZE * 800,
        }).zoom(TILE_SIZE * 300)
        /* .clamp({
            direction: 'all',
            underflow: 'center'
        }) */

        map.stage.addChild(viewport)
        document.getElementById('map')?.appendChild(map.view)
        setMap(map)
        setViewport(viewport)
        const getMetaverseData = async () => {
            let dataCall: any = await fetch(
                process.env.SOCKET_SERVICE + `/limits?metaverse=${metaverse}`
            )
            dataCall = await dataCall.json()
            setMetaverseData(dataCall)
        }
        getMetaverseData()
        return () => {
            document.getElementById('map')?.removeChild(map.view)
            map.destroy()
            viewport.destroy()
            socket.disconnect()
            onHover(0 / 0, 0 / 0, undefined, undefined)
        }
    }, [metaverse])

    useEffect(() => {
        if (!viewport) return
        viewport.moveCenter(initialX * TILE_SIZE, initialY * TILE_SIZE)
        let currentTint: any
        let currentSprite: any
        viewport.on('mousemove', (e: any): any => {
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
                onClick(mapData[x + ',' + y], x, y * -1)
            }
        })
    }, [viewport])

    useEffect(() => {
        if (!metaverseData) return
        socket = io(process.env.SOCKET_SERVICE!, {
            path: '/heatmap-backend',
            transports: ['websocket'],
        })
        socket.emit('render', metaverse)
        let lands: any = mapData || {}
        let localChunks: any = chunks || {}
        let localCheckpoint: number = 0
        const renderTile = async (land: any) => {
            if (!localCheckpoint) localCheckpoint = checkpoint
            let name = ''
            land.coords.y *= -1

            if (land.coords) {
                name = land.coords.x + ',' + land.coords.y
            }
            lands[name] = land!
            lands[name].land_id = land.tokenId
            globalFilter == 'basic'
                ? null
                : (land = await setLandColour(land, globalFilter, metaverseData))
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

            const rectangle: any = new PIXI.Sprite(PIXI.Texture.WHITE)
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
        }
        socket.on('render', renderTile)
    }, [metaverseData && viewport])

    useEffect(() => {
        if (map?.renderer) map?.renderer.resize(width || 0, height || 0)
    }, [width, height])

    useEffect(() => {
        ;(globalFilter = filter),
            (globalPercentFilter = percentFilter),
            (globalLegendFilter = legendFilter)
    }, [filter, percentFilter, legendFilter])

    useEffect(() => {
        if (!chunks || !mapData) return
        const filterUpdate = async () => {
            let lands = await setColours(mapData, globalFilter, metaverseData)
            for (const key in chunks) {
                for (const child of chunks[key].children) {
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
        if (metaverseData) filterUpdate()
    }, [filter, percentFilter, legendFilter, x, y])

    useEffect(() => {
        if (!x || !y) return
        try {
            viewport.moveCenter(x * TILE_SIZE, y * TILE_SIZE)
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
        <div
            id="map"
            className="bg-white rounded-lg shadowDiv"
            style={{ width, height }}
        />
    )
}

export default MaptalksCanva
