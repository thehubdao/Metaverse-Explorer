export interface ChartInfo {
  data: number;
  time: string;
  timestamp?: number;
}

export interface TopPickLand {
  name: string;
  images: {
    image_url: string;
  };
  external_link: string;
  market_links: {
    opensea: string;
    looksrare: string;
    X2Y2: string;
  };
  eth_predicted_price: number;
  floor_adjusted_predicted_price: number;
  coords: {
    x: number;
    y: number;
  };
  history: {
    timestamp: number;
    valuation?: number;
    eth_price?: number;
    action: string;
    owner: string;
    chain: string;
    estateId?: string;
  }[];
  tile: {
    type: number;
    left?: number;
    top?: number;
    topLeft?: number;
  };
  owner: string;
  estateId?: string;
  current_price?: number;
  current_price_eth: number;
  tokenId: string;
  metaverse: string;
  gap: number;
}

export interface TopDate {
  position?: number;
  dataTable?: {
    landId?: string;
    image?: string;
    asset?: string;
    valuation?: number;
    date?: Date;
    symbol?: string;
    external_link?: string;
  }
}

export interface TopSellingLand {
  totalTop: TopDate[];
  yesterdayTop: TopDate[];
  monthTop: TopDate[];
  yearTop: TopDate[];
}

export const filterOptions = {
  yesterdayTop: { title: 'FILTERED BY YESTERDAY', label: '2D' },
  monthTop: { title: 'FILTERED BY LAST MONTH', label: '1M' },
  yearTop: { title: 'FILTERED BY LAST YEAR', label: '1Y' },
  totalTop: { title: '', label: 'Max' },
};

export type TopSellingFilterBy = keyof typeof filterOptions;