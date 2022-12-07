import { purchaseCoinOptions } from '../components/Purchase'
import { Network } from './enums'
import { Metaverse } from './metaverse'

export interface NetworkState {
  value: Network
}

export interface AccountState {
  connected: boolean
  address: string | undefined
  chainId: number | undefined
  role: Role | undefined
}

export interface AddEthereumChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
  }
  rpcUrls: string[]
}

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

export interface IPoolData {
  id: number
  name: string
  APY: number | string
  lockingMonth: number
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

export interface UserData {
  watchlist?: string[]
  portfolio?: string[]
}

export interface IChartValues {
  time: string
  data: Record<symbolPredictions, number> | number
}

export type symbolPredictions =
  | 'ethPrediction'
  | 'usdPrediction'
  | 'metaversePrediction'
export type Role = {
  id: 0 | 1 | 2
  tier: 1 | 5
  expiration: number
  calls: number
}
export interface LoginJWT {
  address: string
  roles: Role[] | never[]
}
