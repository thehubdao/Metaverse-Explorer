import {Module} from "../enums/logging.enum";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LogError(origin: Module, msg: string, err?: unknown) {
  console.error(origin, '-', msg);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LogWarning(origin: Module, msg: string, err?: unknown) {
  console.warn(origin, '-', msg);
}