import {Metaverses} from "../enums/metaverses.enum";

export interface Coords {
  x?: number;
  y?: number;
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
  metaverse: Metaverses.Decentraland;
  tile: DecentralandTile;
}

export interface LandSandbox extends LandData {
  metaverse: Metaverses.SandBox;
  land_type?: number;
}

export interface LandSomniumSpace extends LandData {
  metaverse: Metaverses.SomniumSpace;
  geometry: Required<Coords>[];
}