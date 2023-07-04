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
    const body = await req.json();
    return body as T;
  }
  catch (e) {
    void LogErrorServer(ServerModule.ExampleApi, DefErrorMsg.ErrorGettingBody, e);
    return {} as T;
  }
}