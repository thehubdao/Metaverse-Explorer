/***
 * For Clicks and Searches
 */
export interface LandCoords {
  x?: string | number;
  y?: string | number;
}

export interface Coords {
  x: number | undefined;
  y: number | undefined;
}

export interface DecentralandTile {
  type: number | undefined;
  top: string | undefined;
  left: string | undefined;
  topLeft: string | undefined;
}

export interface LandData {
  watchlist?: boolean;
  percent?: number;
  center?: LandCoords;
  coords?: Coords;
  eth_predicted_price: number;
  floor_adjusted_predicted_price: number;
  tokenId: string;
  history_amount: number;
  max_history_price: number;
  current_price_eth: number;
  land_type?: number;
  geometry?: LandCoords[];
  tile?: DecentralandTile;
  price_difference?: number;
  transfers?: number;
  basic?: number;
  listed_lands?: number;
  last_month_sells?: number;
  portfolio?: number;
}