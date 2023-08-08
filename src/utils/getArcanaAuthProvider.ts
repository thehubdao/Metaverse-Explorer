import { AuthProvider } from "@arcana/auth";
import { LogError } from "./logging.util";
import { Module } from "../enums/logging.enum";

let auth: AuthProvider | null;

const getArcanaAuthProvider = () => {
  const arcanaClientId = process.env.NEXT_PUBLIC_ARCANA_CLIENT_ID;
  if(arcanaClientId == undefined) {
    LogError(Module.ArcanaProvider, "arcana client id not found or is undefined");
    return;
  }
  if (!auth) {
    auth = new AuthProvider(arcanaClientId);
  }
  return auth;
};

export { getArcanaAuthProvider };