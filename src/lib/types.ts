import { Metaverse } from './metaverse'

export interface IAssetData {
  name: string
  symbol: string
  decimals: number
  contractAddress?: string
}

export interface IChainData {
  name: string
  chainId: number
  chainIdHex: string
  rpcUrl: string
  nativeCurrency: IAssetData
  blockExplorer: string
}
export interface IAPIData {
  coords: { x: number; y: number }
  metaverse: Metaverse
  name?: string
  opensea_link?: string
  external_link: string
  images: {
    image_url: string
  }
  tokenId: string
  // Some of these belong in ValuationTile, will need to reestructure some things
  current_price_eth?: number
  best_offered_price_eth?: number
  prices: {
    predicted_price: number
    eth_predicted_price: number
  }
  owner?: string
  market_links?: any
}

export interface IPredictions {
  ethPrediction: number
  usdPrediction: number
  metaversePrediction?: number
}

/**
 * Use as `keyof` keyword but of values from an object
 * @example ValueOf<typeof object>
 */
export type ValueOf<T> = T[keyof T]