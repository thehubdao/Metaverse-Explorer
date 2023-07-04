import {DefaultApiMessage} from "../server/enums/api.enum";

export interface ApiResponse<T> {
  success: boolean;
  message: string | DefaultApiMessage;
  data?: T;
}

interface ExampleInterface {
  msg: string;
  param: string;
}

export interface GetExampleInterface extends ExampleInterface {
}

export interface PostExampleInterface extends ExampleInterface {
  body: string;
}