import { Metaverse } from '../metaverse'
import { handleLongLandName, typedKeys } from '../utilities'
import { handleTokenID } from '../valuation/valuationUtils'
import { Atlas } from './heatmapCommonTypes'

export const getLandSummary = (
  atlas: Atlas,
  coords: { x: number; y: number },
  metaverse?: Metaverse
) => {
  const land = typedKeys(atlas.ITRM).find((key) => {
    const landKey = coords.x + ',' + coords.y
    return key === landKey
  })
  if (!land) {
    return { name: undefined, owner: undefined, coords }
  }
  const owner =
    metaverse === 'axie-infinity'
      ? handleLongLandName(atlas.ITRM[land].owner || 'None', 10)
      : metaverse === 'decentraland'
      ? handleTokenID(atlas.decentraland?.[land].owner || 'None')
      : handleTokenID(atlas.ITRM[land].owner || 'None')
  const name = atlas.decentraland?.[land].name

  return { name, owner, coords }
}
