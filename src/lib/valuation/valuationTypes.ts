import { Metaverse } from '../metaverse'
import { IAPIData, IPredictions } from '../types'

export interface ICoinPrices {
  decentraland: { usd: number }
  ethereum: { usd: number }
  'the-sandbox': { usd: number }
  'axie-infinity': { usd: number }
  'somnium-space-cubes': { usd: number }
}

export interface IPriceCard {
  showCard?: boolean
  processing?: boolean
  apiData: IAPIData
  predictions: IPredictions
}

export type LandsKey = 'sandbox' | 'decentraland' | 'axie-infinity' | 'somnium-space'

export type LandListAPIResponse = Record<string, SingleLandAPIResponse>

export interface SingleLandAPIResponse {
  current_price?: number
  predicted_price: number
  eth_predicted_price: number
  external_link: string | null
  images: {
    image_url: string | null
    image_preview_url: string | null
    image_thumbnail_url: string | null
    image_original_url: string | null
  }
  history: []
  variation_last_week: number
  variation_last_four_weeks: number
  variation_last_six_months: number
  manipulation_index: number
  suggested_operation: string
  coords: {
    x: number
    y: number
  }
  owner: string
  name?: string
  metaverse?: Metaverse
}
