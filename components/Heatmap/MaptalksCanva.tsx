import { useEffect, useState } from 'react'
import * as maptalks from 'maptalks'
import {
    Atlas,
    LegendFilter,
    MapFilter,
    PercentFilter,
    ValuationTile,
} from '../../lib/heatmap/heatmapCommonTypes'
import { filteredLayer } from '../../lib/heatmap/heatmapLayers'
import { io } from 'socket.io-client'
import React from 'react'
import { Metaverse } from '../../lib/metaverse'
import { setColours } from '../../lib/heatmap/valuationColoring'
const socket = io(process.env.SOCKET_SERVICE!, {
    path: '/heatmap-backend',
    transports: ['websocket'],
})

interface IMaptalksCanva {
    width: number | string | undefined
    height: number | string | undefined
    filter: MapFilter
    percentFilter: PercentFilter
    legendFilter: LegendFilter
    x: number | undefined
    y: number | undefined
    onClick: (land: ValuationTile, x: number, y: number) => void
    metaverse: Metaverse
}

const MaptalksCanva = ({
    width,
    height,
    filter,
    percentFilter,
    legendFilter,
    x,
    y,
    onClick
}: IMaptalksCanva) => {
    const [map, setMap] = useState<maptalks.Map>()
    const [mapData, setMapData] = useState<Record<string, ValuationTile>>()

    useEffect(() => {
        let map: any
        var imageLayer = new maptalks.ImageLayer('images', [
            {
                url: '/images/Waterfront_Extended_Parcels_Map_allgreen.jpg',
                extent: [-1, -1, 1, 1],
                opacity: 1,
            },
        ])

        map = new maptalks.Map('map', {
            center: [0, 0],
            zoom: 10,
            minZoom: 9,
            maxZoom: 12,
            attribution: false,
            pitch: 1,
            dragPitch: false,
            //dragRotate: false,
        })
        map.addLayer(imageLayer)

        let layer = new maptalks.VectorLayer('vector', [], {
            forceRenderOnMoving: true,
            forceRenderOnRotating: true,
            forceRenderOnZooming: true,
            enableSimplify: true,
            hitDetect: false,
        }).addTo(map)

        let lands: any = {}
        let polygons: any = []
        socket.emit('render', 'somnium-space', 0)
        socket.on('render', (land) => {
            let name = ''
            if (land.coords) {
                name = land?.coords.x + ',' + land?.coords.y
            } else {
                name = land?.center.x + ',' + land?.center.y
            }
            lands[name] = land!
            lands[name].land_id = land.tokenId
            let value = land
            let tile: any
            if (!value.center) return

            tile = filteredLayer(
                value.center.x,
                value.center.y,
                filter,
                percentFilter,
                legendFilter,
                value
            )
            let { color } = tile
            let borderColor = '#000'
            let borderSize = 0

            let polygon = new maptalks.Polygon(
                [
                    [
                        [value.geometry[0].x, value.geometry[0].y],
                        [value.geometry[1].x, value.geometry[1].y],
                        [value.geometry[2].x, value.geometry[2].y],
                        [value.geometry[3].x, value.geometry[3].y],
                    ],
                ],
                {
                    visible: true,
                    editable: true,
                    shadowBlur: 0,
                    shadowColor: 'black',
                    draggable: false,
                    dragShadow: false, // display a shadow during dragging
                    drawOnAxis: null, // force dragging stick on a axis, can be: x, y
                    symbol: {
                        lineWidth: borderSize,
                        lineColor: borderColor,
                        polygonFill: color,
                        polygonOpacity: 1,
                    },
                    cursor: 'pointer',
                }
            )
                .on('click', () => {
                    onClick(value, value.center.x, value.center.y)
                })
                .on('mouseenter', (e: any) => {
                    e.target.updateSymbol({
                        polygonFill: '#db2777',
                        lineWidth: 3,
                        lineColor: '#db2777',
                    })
                })
                .on('mouseout', (e: any) => {
                    e.target.updateSymbol({
                        polygonFill: color,
                        lineWidth: borderSize,
                        lineColor: borderColor,
                    })
                })
            layer.addGeometry(polygon)
            polygons.push(polygon)
        })

        socket.on('render', () => {
            // set map's max extent to map's map view power by 2
            map.setMaxExtent(new maptalks.Extent(-2, -2, 2, 2))
            setMapData(lands)
            setMap(map)
        })
    }, [])

    useEffect(() => {
        if (!map) return
        let lands: any = []
        map.removeLayer('vector')
        let coloredAtlas = setColours(mapData!, filter)
        if (map && x && y) {
            map.setCenter(new maptalks.Coordinate(x, y))
        }

        Object.values(mapData!).forEach((value: any) => {
            let tile: any
            tile = filteredLayer(
                value.center.x,
                value.center.y,
                filter,
                percentFilter,
                legendFilter,
                value
            )

            let { color } = tile
            let borderColor = '#000'
            let borderSize = 0

            //set color if the land is selected
            if (value.center.x == x && value.center.y == y) {
                color = '#ff9990'
                borderColor = '#ff0044'
                borderSize = 3
            }

            let polygon = new maptalks.Polygon(
                [
                    [
                        [value.geometry[0].x, value.geometry[0].y],
                        [value.geometry[1].x, value.geometry[1].y],
                        [value.geometry[2].x, value.geometry[2].y],
                        [value.geometry[3].x, value.geometry[3].y],
                    ],
                ],
                {
                    visible: true,
                    editable: true,
                    shadowBlur: 0,
                    shadowColor: 'black',
                    draggable: false,
                    dragShadow: false, // display a shadow during dragging
                    drawOnAxis: null, // force dragging stick on a axis, can be: x, y
                    symbol: {
                        lineWidth: borderSize,
                        lineColor: borderColor,
                        polygonFill: color,
                        polygonOpacity: 1,
                    },
                    cursor: 'pointer',
                }
            )
                .on('click', () => {
                    onClick(value, value.center.x, value.center.y)
                })
                .on('mouseenter', (e: any) => {
                    e.target.updateSymbol({
                        polygonFill: '#db2777',
                        lineWidth: 3,
                        lineColor: '#db2777',
                    })
                })
                .on('mouseout', (e: any) => {
                    e.target.updateSymbol({
                        polygonFill: color,
                        lineWidth: borderSize,
                        lineColor: borderColor,
                    })
                })
            lands.push(polygon)
        })
        new maptalks.VectorLayer('vector', lands, {
            forceRenderOnMoving: true,
            forceRenderOnRotating: true,
            forceRenderOnZooming: true,
        }).addTo(map)
    }, [filter, percentFilter, legendFilter, x, y])

    return (
        <canvas
            width={width}
            height={height}
            /* style={{ width, height }} */
            id="map"
        />
    )
}

export default MaptalksCanva
