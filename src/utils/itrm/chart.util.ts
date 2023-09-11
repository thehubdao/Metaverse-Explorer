import {Metaverses} from "../../enums/metaverses.enum";
import {Raise} from "../common.util";
import axios from "axios";
import {LogError} from "../logging.util";
import {Module} from "../../enums/logging.enum";
import {Result} from "../../types/common.type";

type ChartRoutes =
  'avgPriceParcel'
  | 'floorPrice'
  | 'avgPriceParcelPerArea'
  | 'totalNumberOfSales'
  | 'stdSalesPrices'
  | 'salesVolume'
  | 'maxPrice';

export interface ChartInfo {
  data: number;
  time: string;
  timestamp?: number;
}

export async function FetchChartData(metaverse: Metaverses, route: ChartRoutes): Promise<Result<ChartInfo[]>> {
  try {
    const itrmServiceUrl = process.env.NEXT_PUBLIC_ITRM_SERVICE ?? Raise("Missing ITRMService url on env variables!");

    const response = await axios.get<ChartInfo[]>(`${itrmServiceUrl}/val-analytics/${route}?metaverse=${metaverse}`);
    return {success: true, value: response.data};
  } catch (err) {
    const msg = "Error while getting chart data!";
    LogError(Module.ITRMChart, msg, err);
    return {success: false, errMessage: msg};
  }
}
