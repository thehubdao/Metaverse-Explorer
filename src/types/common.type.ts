import { DEFAULT_COIN_VALUES } from "../constants/common.constant";

type ResultSuccessful<T> = {
  success: true;
  value: T
}

type ResultFail = {
  success: false;
  errMessage: string;
}

export type Result<T> = ResultSuccessful<T> | ResultFail;

export type CoinValuesType = typeof DEFAULT_COIN_VALUES;