import {Metaverses} from "../enums/metaverses.enum";
import { Metaverse } from "../utils/metaverse";

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

export interface SingleLandAPIResponse {

  current_price?: number;
  current_price_eth?: number;
  eth_predicted_price: number;
  external_link: string | null;
  floor_adjusted_predicted_price?: number;
  history?: History[];
  images: {
    image_url: string | null;
    image_preview_url: string | null;
    image_thumbnail_url: string | null;
    image_original_url: string | null;
  };
  market_links?: {
    X2Y2: string | null;
    looksrare: string | null;
    opensea: string | null;
  };
  metaverse?: Metaverse;
  name?: string;
  owner?: string;
  predicted_price: number;
  token_metadata?: string | null;
  variation_last_week: number;
  variation_last_four_weeks: number;
  variation_last_six_months: number;
  manipulation_index?: number;
  suggested_operation?: string;
  coords: {
    x: number;
    y: number;
  };
  prices?: {
    eth_predicted_price: number;
    predicted_price: number;
  }
  predictions?: {
    ethPrediction: number;
    usdcPrediction: number;
    metaversePrediction: number;
  };
  tokenId?: string;
}

export interface History {
  timestamp: number;
  time: string;
  hash: string;
  action: string;
  owner: string;
  chain: string;
  valuation: number;
  estateId: string;
}

export interface TotalWorthData{
  ethPrediction: number;
  usdcPrediction: number;
}