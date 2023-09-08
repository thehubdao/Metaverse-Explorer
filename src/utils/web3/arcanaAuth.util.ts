import {AuthProvider} from "@arcana/auth";
import {LogError} from "../logging.util";
import {Module} from "../../enums/logging.enum";

class ArcanaAuth {
  private static _instance: ArcanaAuth;
  private _auth: AuthProvider | undefined;

  public static Instance() {
    if (ArcanaAuth._instance === undefined)
      ArcanaAuth._instance = new ArcanaAuth();

    return ArcanaAuth._instance;
  }

  public Auth() {
    if (this._auth == undefined) {
      const arcanaClientId = process.env.NEXT_PUBLIC_ARCANA_CLIENT_ID;
      if (arcanaClientId == undefined) {
        LogError(Module.ArcanaAuth, "Missing ArcanaClientId env value!");
        throw Error("Missing ArcanaClientId env value!");
      }

      this._auth = new AuthProvider(arcanaClientId);
    }

    return this._auth;
  }
}

export function GetArcanaAuthProvider() {
  return ArcanaAuth.Instance().Auth();
}