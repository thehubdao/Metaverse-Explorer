import { typedKeys } from '../utilities'
import { Atlas, HeatmapSize } from './heatmapCommonTypes'

export const getHeatmapSize = (atlas: Atlas): HeatmapSize => {
  const keys = typedKeys(atlas.ITRM)
  const xArray = keys.map((key) => {
    const parseX = parseInt(key.substring(0, key.indexOf(',')))
    if (isNaN(parseX)) return 0
    return parseInt(key.substring(0, key.indexOf(',')))
  })
  const yArray = keys.map((key) => {
    const parsedY = parseInt(key.substring(key.indexOf(',') + 1))
    if (isNaN(parsedY)) return 0
    return parsedY
  })
  return {
    maxX: Math.max(...xArray),
    minX: Math.min(...xArray),
    initialX: Math.ceil(
      xArray.reduce((total, num) => total + num) / xArray.length
    ),
    initialY: Math.ceil(
      yArray.reduce((total, num) => total + num) / yArray.length
    ),
    maxY: Math.max(...yArray),
    minY: Math.min(...yArray),
  }
}
