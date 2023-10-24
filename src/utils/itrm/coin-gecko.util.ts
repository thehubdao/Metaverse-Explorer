import axios from "axios";
// import {Raise} from "../common.util";
import {LogError} from "../logging.util";
import {Module} from "../../enums/logging.enum";
import { CoinGeckoResponse } from "../../interfaces/common.interface";
import { DEFAULT_COIN_VALUES } from "../../constants/common.constant";

export async function GetCoinGeckoPrices(): Promise<CoinGeckoResponse> {
  try {
    // const itrmServiceUrl = process.env.NEXT_PUBLIC_ITRM_SERVICE ?? Raise("Missing ITRMService url on env variables!");

    // const response = await axios.get<CoinGeckoResponse>(`${itrmServiceUrl}/val-analytics/coingeckoResponse`);
    const response = await axios.get<CoinGeckoResponse>(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cthe-sandbox%2Caxie-infinity%2Cdecentraland%2Cocean-protocol%2Cmetagamehub-dao%2Cwmatic%2Cusd-coin%2Ctether%2Csomnium-space-cubes&vs_currencies=usd`);
    return response.data;
  } catch (err) {
    LogError(Module.CoinGecko, "Error trying to get CoinGecko prices from ITRM!", err);
    return {data: DEFAULT_COIN_VALUES};
  }
}