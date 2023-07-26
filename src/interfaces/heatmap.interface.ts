import {Sprite} from "pixi.js";

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

export interface Coord {
    x: number;
    y: number;
}

export interface Atlas {
    ITRM: Record<string, ValuationTile>;
    decentraland?: Record<string, AtlasTile>;
}

export interface Tile {
    color: string;
    top?: boolean;
    left?: boolean;
    topLeft?: boolean;
    scale?: number;
}

export interface AtlasTile {
    x: number;
    y: number;
    type: number;
    district_id?: number;
    estate_id?: number;
    left?: number;
    top?: number;
    name?: string;
    topLeft?: number;
    price?: number;
    owner?: string;
}

interface ValuationTransfer {
    timestamp: number;
    time: string;
    price: number;
    priceUsd: number;
    owner: string;
    eth_price: number;
}

// This is how the End Valuation Tile looks, some information is added after the API Request
export interface ValuationTile {
    name: string;
    predicted_price: number;
    eth_predicted_price: number;
    history?: ValuationTransfer[];
    variation_last_week: number;
    variation_last_four_weeks: number;
    variation_last_six_months: number;
    manipulation_index: number;
    suggested_operation?: string;
    coords: Coord;
    center: Coord;
    current_price_eth?: number;
    best_offered_price_eth?: number;
    percent?: number;
    land_id?: string;
    watchlist?: boolean;
    portfolio?: boolean;
    images: { image_url: string };
    owner?: string;
    external_link: string;
    floor_adjusted_predicted_price?: number;
    tokenId?: string;
}

export interface HeatmapSize {
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    initialY: number;
    initialX: number;
}

export interface OtherSprite extends Sprite {
    tokenId?: string;
    landY?: number;
    landX?: number;
    type?: string;
}