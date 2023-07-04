import {RequestStatus} from "../types/api.type";
import {REQUEST_STATUS} from "../constants/api.constant";
import {LogErrorServer} from "./logging.util";
import {DefErrorMsg, ServerModule} from "../enums/logging.enum";
import {ApiResponse} from "../../interfaces/api.interface";

export function JsonResponse<T>(obj: ApiResponse<T>, status: RequestStatus) {
  return new Response(JSON.stringify(obj), {
    status: REQUEST_STATUS[status],
  });
}

export async function TryGetReqBody<T>(req: Request) {
  try {
    return await req.json() as T;
  }
  catch (e) {
    LogErrorServer(ServerModule.ExampleApi, DefErrorMsg.ErrorGettingBody, e);
    return {} as T;
  }
}