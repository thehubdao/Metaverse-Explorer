import { Metaverse } from "../utils/metaverse";

export interface ICoinPrices {
  decentraland: number;
  ethereum: number;
  'the-sandbox': number;
  'axie-infinity': number;
  'somnium-space-cubes': number;
}

export type LandsKey = 'sandbox' | 'decentraland' | 'axie-infinity' | 'somnium-space';

export type LandListAPIResponse = Record<string, SingleLandAPIResponse>;

export interface SingleLandAPIResponse {
  
  current_price?: number;
  eth_predicted_price: number;
  external_link: string | null;
  floor_adjusted_predicted_price?: number;
  history: [];
  images: {
    image_url: string | null;
    image_preview_url: string | null;
    image_thumbnail_url: string | null;
    image_original_url: string | null;
  };
  market_links?:{
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
  tokenId?: string;
}
