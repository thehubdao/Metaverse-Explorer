import { Sprite } from "pixi.js";
import { LandType } from "../types/heatmap/land.type";
import { SingleLandAPIResponse } from "../types/valuationTypes";

export interface HotDealsCard {
  images: {
    image_url: string;
  };
  gap: number;
  current_price_eth: number;
  eth_predicted_price: number;
  external_link: string;
  market_links: {
    opensea: string;
  };
  name: string;
}

export interface LandTileData {
  name: string;
  tokenId: string;
  landY: number;
  landX: number;
  land: LandType;
  color: string;
  spriteRef: Sprite;
}

export interface globalData {
  average_price: number;
  fifteen_minute_average_price: number;
  count: number;
  fifteen_minute_change: number;
  fifteen_minute_difference: number;
  fifteen_minute_sales: number;
  fifteen_minute_sales_change: number;
  fifteen_minute_volume: number;
  five_minute_average_price: number;
  five_minute_change: number;
  five_minute_difference: number;
  five_minute_sales: number;
  five_minute_sales_change: number;
  five_minute_volume: number;
  floor_price: number;
  market_cap: number;
  num_owners: number;
  num_reports: number;
  one_day_average_price: number;
  one_day_change: number;
  one_day_difference: number;
  one_day_sales: number;
  one_day_sales_change: number;
  one_day_volume: number;
  one_hour_average_price: number;
  one_hour_change: number;
  one_hour_difference: number;
  one_hour_sales: number;
  one_hour_sales_change: number;
  one_hour_volume: number;
  one_minute_average_price: number;
  one_minute_change: number;
  one_minute_difference: number;
  one_minute_sales: number;
  one_minute_sales_change: number;
  one_minute_volume: number;
  seven_day_average_price: number;
  seven_day_change: number;
  seven_day_difference: number;
  seven_day_sales: number;
  seven_day_volume: number;
  six_hour_average_price: number;
  six_hour_change: number;
  six_hour_difference: number;
  six_hour_sales: number;
  six_hour_sales_change: number;
  six_hour_volume: number;
  thirty_day_average_price: number;
  thirty_day_change: number;
  thirty_day_difference: number;
  thirty_day_sales: number;
  thirty_day_volume: number;
  thirty_minute_average_price: number;
  thirty_minute_change: number;
  thirty_minute_difference: number;
  thirty_minute_sales: number;
  thirty_minute_sales_change: number;
  thirty_minute_volume: number;
  total_sales: number;
  total_supply: number;
  total_volume: number;
}

export interface MapCardData {
  apiData: SingleLandAPIResponse;
  predictions: IPredictions;
  landCoords: {
    x: null | number;
    y: null | number;
  };
  name: string | null;
}

export interface IPredictions {
  ethPrediction: number | undefined;
  usdPrediction: number | undefined;
  metaversePrediction: number | undefined;
}