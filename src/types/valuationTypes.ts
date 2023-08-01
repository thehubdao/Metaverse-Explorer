export interface ICoinPrices {
  decentraland: number;
  ethereum: number;
  'the-sandbox': number;
  'axie-infinity': number;
  'somnium-space-cubes': number;
}

export type LandListAPIResponse = Record<string, LandProps>

export interface LandProps {
  metaverse: string;
  tokenId: string;
  name?: string;
  images: {
    image_url: string;
    image_thumbnail_url: string;
    image_original_url: string;
    image_preview_url: string;
  }
  opensea_link: string | null;
  external_link: string | null;
  token_metadata: string | null;
  current_price?: number;
  predicted_price: number;
  eth_predicted_price: number;
  floor_adjusted_predicted_price: number;
  coords: {
    x: number;
    y: number;
  }
  center?: {
    x?: number | null;
    y?: number | null;
  }
  geometry?: {
    x?: number | null;
    y?: number | null;
  }
  land_type: string;
  history: [
    {
      timestamp: number;
      time: string;
      hash: string;
      action: string;
      price: number;
      eth_price: number;
      symbol: string;
      owner: string;
      market: string;
      chain: string;
    }
  ]
  variation_last_week: number;
  variation_last_four_weeks: number;
  variation_last_six_months: number;
  tile?: {
    type?: number | null;
    top?: number | null;
  }
  owner?: string | null;
}

