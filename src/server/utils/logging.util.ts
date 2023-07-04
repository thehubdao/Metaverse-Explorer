import {DefErrorMsg, ServerModule} from "../enums/logging.enum";

export async function LogErrorServer(module: ServerModule, msg: string | DefErrorMsg, err: unknown) {
  console.error(module, '-', msg);
}