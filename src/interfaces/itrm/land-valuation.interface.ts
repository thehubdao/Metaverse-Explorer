export interface LandValuationDatum {
  tokenId: string;
  name: string;
  images: {
    image_url: string;
    image_preview_url?: string;
    image_thumbnail_url?: string;
    image_original_url?: string;

    // only fluf
    animation_url?: string;
    image_small?: string;
    image_medium?: string;
    image_large?: string;
  };
  predicted_price: number;
  eth_predicted_price: number;
  floor_adjusted_predicted_price: number;
  opensea_link?: string;
  external_link?: string;
  token_metadata?: string;
  history: {
    timestamp: number;
    time: string;
    hash: string;
    action: string;
    price: number;
    eth_price: number;
    symbol: string;
    market: string;
    owner?: string;
    chain?: string;
    buyer?: string;
  }[];
  variation_last_week: number;
  variation_last_four_weeks: number;
  variation_last_six_months: number;
  coords?: {
    x: number;
    y: number;
  };
  land_type?: string;

  // only dcl
  tile?: {
    type: number;
    top: number;
  };
  owner?: string;

  // only somnium-space & cryptovoxels
  center?: {
    x: number;
    y: number;
  };
  geometry?: {
    x: number;
    y: number;
  }[];

  traits?: {
    // only fluf 
    Sex?: string;
    Fur?: string;
    Eyes?: string;
    Eyewear?: string;
    Neck?: string;
    Head?: string;
    Nose?: string;
    Ears?: string;
    Expression?: string;
    Background?: string;
  } | {
    // only otherside
    traitType: string;
    value: string;
  }[];
}

export interface MetaverseGlobalData {
  one_hour_volume: number;
  one_hour_change: number;
  one_hour_sales: number;
  one_hour_sales_change: number;
  one_hour_average_price: number;
  one_hour_difference: number;
  six_hour_volume: number;
  six_hour_change: number;
  six_hour_sales: number;
  six_hour_sales_change: number;
  six_hour_average_price: number;
  six_hour_difference: number;
  one_day_volume: number;
  one_day_change: number;
  one_day_sales: number;
  one_day_sales_change: number;
  one_day_average_price: number;
  one_day_difference: number;
  seven_day_volume: number;
  seven_day_change: number;
  seven_day_sales: number;
  seven_day_average_price: number;
  seven_day_difference: number;
  thirty_day_volume: number;
  thirty_day_change: number;
  thirty_day_sales: number;
  thirty_day_average_price: number;
  thirty_day_difference: number;
  total_volume: number;
  total_sales: number;
  total_supply: number;
  count: number;
  num_owners: number;
  average_price: number;
  num_reports: number;
  market_cap: number;
  floor_price: number;
}

export interface MetaversePerformance {
  MAPE: number;
  MedAPE: number;
  R2: number;
  skewness: number;
  standard_deviation: number;
  maximum: number;
  minimum: number;
}