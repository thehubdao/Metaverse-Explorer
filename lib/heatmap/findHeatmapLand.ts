import { Contracts } from '../contracts'
import { Metaverse } from '../metaverse'
import { IAPIData } from '../types'
import { typedKeys } from '../utilities'
import { ICoinPrices } from '../valuation/valuationTypes'
import { convertETHPrediction } from '../valuation/valuationUtils'
import { LandCoords, MapFilter, ValuationTile } from './heatmapCommonTypes'

const CalculateMaxPriceOnHistory = (landFromAtlas: ValuationTile) => {
  let maxPrice = 0
  landFromAtlas.history?.map(historyPoint => {
    historyPoint
      ? maxPrice = historyPoint.eth_price > maxPrice ? historyPoint.eth_price : maxPrice
      : 0
  })

  return maxPrice
}

const getPriceByFilter = (map: ValuationTile, prices: ICoinPrices, filterBy?: MapFilter) => {
  if (!filterBy) return ({
    eth_predicted_price: map.eth_predicted_price,
    predicted_price: map.eth_predicted_price * prices.ethereum.usd,
  })
  if (filterBy === 'floor_adjusted_predicted_price') {
    return ({
      eth_predicted_price: map.floor_adjusted_predicted_price || 0,
      predicted_price: (map.floor_adjusted_predicted_price || 0) * prices.ethereum.usd,
    })
  } else if (filterBy === 'last_month_sells') {
    return ({
      eth_predicted_price: CalculateMaxPriceOnHistory(map) || 0,
      predicted_price: (CalculateMaxPriceOnHistory(map) || 0) * prices.ethereum.usd,
    })
  } else {
    return ({
      eth_predicted_price: map.eth_predicted_price,
      predicted_price: map.eth_predicted_price * prices.ethereum.usd,
    })
  }
}

export const findHeatmapLand = (
  land:  ValuationTile,
  prices: ICoinPrices,
  metaverse: Metaverse,
  coords: LandCoords,
  tokenId?: string,
  filterBy?: MapFilter
) => {
  const landOptions = {
    sandbox: { contract: Contracts.LAND.ETHEREUM_MAINNET.newAddress },
    decentraland: { contract: Contracts.PARCEL.ETHEREUM_MAINNET.address },
    'somnium-space': { contract: Contracts.CUBES.ETHEREUM_MAINNET.address }
  }

/*   const setOpenSeaLink = () => {
    if (apiData && metaverse !== 'axie-infinity') {
      apiData.opensea_link = `https://opensea.io/assets/${landOptions[metaverse].contract}/${land.land_id}`
    }
  } */

  if (!land) return
  let apiData: IAPIData
  apiData = {
    ...land,
    metaverse: metaverse,
    tokenId: land.land_id!,
    prices: getPriceByFilter(land, prices, filterBy)
  }

  const name = land.name ? land.name : undefined
  const landCoords = { x:  coords.x , y: coords.y }
/*   setOpenSeaLink() */

  const predictions = convertETHPrediction(
    prices,
    apiData.prices.eth_predicted_price,
    metaverse
  )
  return { apiData, predictions, landCoords, name }
}
