export interface Coords {
  x: number | undefined;
  y: number | undefined;
}

export interface DecentralandTile {
  type: number;
  top: boolean;
  left: boolean;
  topLeft: boolean;
}

export interface LandData {
  keyIndex: number;
  tokenId: string;
  current_price_eth: number;
  eth_predicted_price: number;
  floor_adjusted_predicted_price: number;
  history_amount: number;
  max_history_price: number;
  coords: Coords;
  
  watchlist?: boolean;
  percent?: number;
  price_difference?: number;
  transfers?: number;
  basic?: number;
  listed_lands?: number;
  last_month_sells?: number;
  portfolio?: number;
}

export interface LandDecentraland extends LandData {
  isDcl: boolean;
  tile: DecentralandTile;
}

export interface LandSandbox extends LandData {
  isSandbox: boolean;
  land_type?: number;
}

export interface LandSomniumSpace extends LandData {
  isSSpace: boolean;
  geometry: Coords[];
}