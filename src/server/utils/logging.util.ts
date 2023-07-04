import {DefErrorMsg, ServerModule} from "../enums/logging.enum";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LogErrorServer(module: ServerModule, msg: string | DefErrorMsg, err?: unknown) {
  console.error(module, '-', msg);
}