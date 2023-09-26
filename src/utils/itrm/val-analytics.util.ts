import {Metaverses} from "../../enums/metaverses.enum";
import {Raise} from "../common.util";
import axios from "axios";
import {LogError} from "../logging.util";
import {Module} from "../../enums/logging.enum";
import {Result} from "../../types/common.type";
import {ChartInfo, TopPickLand, TopSellingLand} from "../../interfaces/itrm/val-analytics.interface";

type ChartRoutes =
  'avgPriceParcel'
  | 'floorPrice'
  | 'avgPriceParcelPerArea'
  | 'totalNumberOfSales'
  | 'stdSalesPrices'
  | 'salesVolume'
  | 'maxPrice'
  | 'mCap';

export async function FetchChartData(metaverse: Metaverses | undefined, route: ChartRoutes): Promise<Result<ChartInfo[]>> {
  if(metaverse == undefined) Raise("The value of metaverse is undefined. Provide a valid value");
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

export async function GetTopLands(metaverse: Metaverses | undefined): Promise<Result<TopPickLand[]>> {
  if(metaverse == undefined) Raise("The value of metaverse is undefined. Provide a valid value");
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

export async function GetTopSellingLands(metaverse: Metaverses| undefined): Promise<Result<TopSellingLand>> {
  try {
    const itrmServiceUrl = process.env.NEXT_PUBLIC_ITRM_SERVICE ?? Raise("Missing ITRMService url on env variables!");

    const response = await axios.get<TopSellingLand>(`${itrmServiceUrl}/val-analytics/topSellingLands`, {
      params: {
        metaverse
      }
    });

    return {success: true, value: response.data};
  } catch (err) {
    const msg = "Error while getting TopSellingLands!";
    LogError(Module.ITRMValAnalytics, msg, err);
    return {success: false, errMessage: msg};
  }
}