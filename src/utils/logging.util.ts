import {Module} from "../enums/logging.enum";

export function LogError(origin: Module, msg: string, err?: unknown) {
  console.error(origin, '-', msg);
}