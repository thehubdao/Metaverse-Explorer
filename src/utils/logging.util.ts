import {Module} from "../enums/logging.enum";

export function LogError(origin: Module, msg: string, err?: unknown) {
  console.error(origin, '-', msg, err != undefined && {error: err});
}

export function LogWarning(origin: Module, msg: string, err?: unknown) {
  console.warn(origin, '-', msg, err != undefined && {error: err});
}