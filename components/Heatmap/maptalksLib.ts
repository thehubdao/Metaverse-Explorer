import { io } from "socket.io-client"
import { Atlas, LegendFilter, MapFilter, PercentFilter, ValuationTile } from "../../lib/heatmap/heatmapCommonTypes"
import { Metaverse } from "../../lib/metaverse"

import * as maptalks from 'maptalks'
import { filteredLayer } from "../../lib/heatmap/heatmapLayers"
import { setColours } from "../../lib/heatmap/valuationColoring"

const socket = io(process.env.SOCKET_SERVICE!, { transports: ['websocket'] })

export const firstChargeLands = (
  metaverse: Metaverse,
  initialCoords: { x: number, y: number },
  filters: {
    filter: MapFilter
    percentFilter: PercentFilter
    legendFilter: LegendFilter
  },
  onClick: (land: ValuationTile, x: number, y: number, name: string) => void,
  onHover: (
    x: number,
    y: number,
    name: string | undefined,
    owner: string | undefined
  ) => void,
  setMapData: Function,
  setMap: Function
) => {
  let map: any

  map = new maptalks.Map('map', {
    center: [initialCoords.x / 10, initialCoords.y / 10],
    zoom: 8,
    minZoom: 7,
    maxZoom: 10,
    dragPitch: false,
    dragRotate: false,

  })

  let layer = new maptalks.VectorLayer('vector', [], {
    forceRenderOnMoving: true,
    forceRenderOnRotating: true,
    forceRenderOnZooming: true,
    enableSimplify: true,
    hitDetect: false
  }).addTo(map)

  let lands: any = {}
  let polygons: any = []

  socket.emit('render', metaverse)
  socket.on('render', (land:any) => {
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

    tile = filteredLayer(
      value.coords.x,
      value.coords.y,
      filters.filter,
      filters.percentFilter,
      filters.legendFilter,
      land
    )

    let { color } = tile
    let borderColor = '#000'
    let borderSize = 0

    let polygon = new maptalks.Rectangle(
      new maptalks.Coordinate(
        value.coords.x / 10,
        value.coords.y / 10
      ),
      10000,
      10000,
      {
        symbol: {
          lineWidth: borderSize,
          lineColor: borderColor,
          polygonFill: color,
          polygonOpacity: 1,
        },
        cursor: 'pointer',
        id: name,

      }
    )
      .on('click', () => {
        onClick(value, value.coords.x, value.coords.y, value.name)
      })
      .on('mouseenter', (e:any) => {
        e.target.updateSymbol({
          polygonFill: '#db2777',
          lineWidth: 3,
          lineColor: '#db2777',
        })
        onHover(
          value.coords ? value.coords?.x : value.center?.x,
          value.coords ? value.coords?.x : value.center?.y,
          value.name,
          value.owner
        )
      })
      .on('mouseout', (e:any) => {
        e.target.updateSymbol({
          polygonFill: color,
          lineWidth: borderSize,
          lineColor: borderColor,
        })
      })
    layer.addGeometry(polygon)
    polygons.push(polygon)
  })
  socket.on('render-finish', () => {
    console.log('FINISH')
    setMapData(lands)
    setMap(map)
  })
}

export const rectangularLayer = (value: any, color: string, borderSize: number, borderColor: string) => {
  return new maptalks.Rectangle(
    new maptalks.Coordinate(
      value.coords.x / 10,
      value.coords.y / 10
    ),
    10000,
    10000,
    {
      symbol: {
        lineWidth: borderSize,
        lineColor: borderColor,
        polygonFill: color,
        polygonOpacity: 1,

      },
      cursor: 'pointer',
      enableSimplify: true,
    }
  )
}

export const polygonalLayer = (value: any, color: string, borderSize: number, borderColor: string) => {
  return new maptalks.Polygon(
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
}