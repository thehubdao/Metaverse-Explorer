import {Container, Sprite} from "pixi.js";
import {LandType} from "../types/heatmap/land.type";

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

export interface LandTileData {
    name: string;
    tokenId: string;
    landY: number;
    landX: number;
    land: LandType;
    spriteRef: Sprite;
    containerRef: Container;    // TODO: check usability
}