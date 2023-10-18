import axios from "axios";
// import {Raise} from "../common.util";
import {LogError} from "../logging.util";
import {Module} from "../../enums/logging.enum";

export const defaultCoinValues = {
  decentraland: {
    usd: 0
  },
  ethereum: {
    usd: 0
  },
  "metagamehub-dao": {
    usd: 0
  },
  "ocean-protocol": {
    usd: 0
  },
  "somnium-space-cubes": {
    usd: 0
  },
  tether: {
    usd: 0
  },
  "the-sandbox": {
    usd: 0
  },
  "usd-coin": {
    usd: 0
  },
  wmatic: {
    usd: 0
  }
} as const;

export type CoinValuesType = typeof defaultCoinValues;

interface CoinGeckoResponse {
  success: CoinValuesType;
}

export async function GetCoinGeckoPrices(): Promise<CoinValuesType> {
  try {
    // const itrmServiceUrl = process.env.NEXT_PUBLIC_ITRM_SERVICE ?? Raise("Missing ITRMService url on env variables!");

    // const response = await axios.get<CoinGeckoResponse>(`${itrmServiceUrl}/val-analytics/coingeckoResponse`);
    const response = await axios.get<CoinGeckoResponse>(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cthe-sandbox%2Caxie-infinity%2Cdecentraland%2Cocean-protocol%2Cmetagamehub-dao%2Cwmatic%2Cusd-coin%2Ctether%2Csomnium-space-cubes&vs_currencies=usd`);
    return response.data.success;
  } catch (err) {
    LogError(Module.CoinGecko, "Error trying to get CoinGecko prices from ITRM!", err);
    return defaultCoinValues;
  }
}