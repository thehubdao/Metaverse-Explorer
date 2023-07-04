import {DefaultApiMessage} from "../server/enums/api.enum";

export interface ApiResponse<T> {
  success: boolean;
  message: string | DefaultApiMessage;
  data?: T;
}

export interface GetExampleInterface {
  msg: string;
  param: string;
}

export interface PostExampleInterface {
  msg: string;
  param: string;
  body: string;
}