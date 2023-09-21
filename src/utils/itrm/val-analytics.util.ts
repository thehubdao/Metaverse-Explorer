import {Metaverses} from "../../enums/metaverses.enum";
import {Raise} from "../common.util";
import axios from "axios";
import {LogError} from "../logging.util";
import {Module} from "../../enums/logging.enum";
import {Result} from "../../types/common.type";
import {ChartInfo, TopPickLand} from "../../interfaces/itrm/val-analytics.interface";

type ChartRoutes =
  'avgPriceParcel'
  | 'floorPrice'
  | 'avgPriceParcelPerArea'
  | 'totalNumberOfSales'
  | 'stdSalesPrices'
  | 'salesVolume'
  | 'maxPrice'
  | 'mCap';

export async function FetchChartData(metaverse: Metaverses, route: ChartRoutes): Promise<Result<ChartInfo[]>> {
  try {
    const itrmServiceUrl = process.env.NEXT_PUBLIC_ITRM_SERVICE ?? Raise("Missing ITRMService url on env variables!");

    const response = await axios.get<ChartInfo[]>(`${itrmServiceUrl}/val-analytics/${route}?metaverse=${metaverse}`);
    return {success: true, value: response.data};
  } catch (err) {
    const msg = "Error while getting chart data!";
    LogError(Module.ITRMValAnalytics, msg, err);
    return {success: false, errMessage: msg};
  }
}

export async function GetTopLands(metaverse: Metaverses): Promise<Result<TopPickLand[]>> {
  try {
    const itrmServiceUrl = process.env.NEXT_PUBLIC_ITRM_SERVICE ?? Raise("Missing ITRMService url on env variables!");
    
    const response = await axios.get<TopPickLand[]>(`${itrmServiceUrl}/val-analytics/topPicks`, {
      params: {
        metaverse
      }
    });
    
    return {success: true, value: response.data};
  } catch (err) {
    const msg = "Error while getting TopLands!";
    LogError(Module.ITRMValAnalytics, msg, err);
    return {success: false, errMessage: msg};
  }
}