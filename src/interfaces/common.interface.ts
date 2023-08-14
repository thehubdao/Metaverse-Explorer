export interface TokenData {
  expiry: number | undefined,
  token: string | undefined
}

export interface WatchlistResponse {
  "decentraland": object,
  "sandbox": object,
  "axie-infinity": object,
  "somnium-space": object
}

export interface TopLandsData {
  position?: number;
  image: string;
  external_link?: string;
  asset?: string;
  coords?: string;
  current_price_eth?: number;
  eth_predicted_price?: number;
  gap?: number;
  buyer?: string;
  date?: string;
}
