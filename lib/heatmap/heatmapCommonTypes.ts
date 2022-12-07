export type Coord = {
  x: number
  y: number
}
export type Atlas = {
  ITRM: Record<string, ValuationTile>
  decentraland?: Record<string, AtlasTile>
}

export type Layer = (
  x: number,
  y: number,
  filter?: MapFilter,
  percentFilter?: PercentFilter,
  legendFilter?: LegendFilter,
  land?: any,
) => Tile | null

export type Tile = {
  color: string
  top?: boolean
  left?: boolean
  topLeft?: boolean
  scale?: number
}

export type AtlasTile = {
  x: number
  y: number
  type: number
  district_id?: number
  estate_id?: number
  left?: number
  top?: number
  name?: string
  topLeft?: number
  price?: number
  owner?: string
}

type valuationTransfer = {
  timestamp: number
  time: string
  price: number
  priceUsd: number
  owner: string
  eth_price: number
}

// This is how the End Valuation Tile looks, some information is added after the API Request
export type ValuationTile = {
  name: string
  predicted_price: number
  eth_predicted_price: number
  history?: valuationTransfer[]
  variation_last_week: number
  variation_last_four_weeks: number
  variation_last_six_months: number
  manipulation_index: number
  suggested_operation?: string
  coords: { x: number; y: number }
  center: { x: number; y: number }
  current_price_eth?: number
  best_offered_price_eth?: number
  percent?: number
  land_id?: string
  watchlist?: boolean
  portfolio?: boolean
  images: { image_url: string }
  owner?: string
  external_link: string,
  floor_adjusted_predicted_price?: number
  tokenId?: string
}

export type MapFilter =
  | 'eth_predicted_price'
  | 'price_difference'
  | 'transfers'
  | 'basic'
  | 'listed_lands'
  | 'floor_adjusted_predicted_price'
  | 'last_month_sells'
// Not using this filters for now..will delete if permanent
// | 'variation_last_week'
// | 'variation_last_four_weeks'
// | 'variation_last_six_months'

export type HeatmapSize = {
  maxX: number
  maxY: number
  minX: number
  minY: number
  initialY: number
  initialX: number
}

/**
 * Percent Filter triggers when a user clicks on a colored squared.
 * Once clicked, only the lands on that percentage/number range will display
 */
export const PERCENT_FILTER_ARRAY = [20, 40, 60, 80, 100] as const
// export type PercentFilter = 20 | 40 | 60 | 80 | 100 | undefined
export type PercentFilter = typeof PERCENT_FILTER_ARRAY[number] | undefined
/**
 * Legend Filter triggers when a user clicks on a colored squared on the Legend (bottom Right).
 * Once clicked, only the lands inside that legend (portfolio,watchlist, ...etc) will display
 */
export type LegendFilter = 'portfolio' | 'watchlist' | 'on-sale' | undefined

// For Clicks and Searches
export type LandCoords = { x?: string | number; y?: string | number }

