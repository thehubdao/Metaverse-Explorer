import { CoinValuesType } from "../types/common.type";

export interface CoinGeckoResponse {
    data: CoinValuesType;
}

export interface OptionProps {
    name: string;
    route: string;
    image: string;
    darkImage: string;
}