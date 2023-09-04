import {LogError} from "../logging.util";
import {Module} from "../../enums/logging.enum";
import {MIPMAP_MODES, Texture} from "pixi.js";
import {LandBorderTexture} from "../../enums/heatmap/land.enum";

class TextureUtil {
  private static _instance: TextureUtil;
  private _textureData: Record<string, Texture | undefined> = {};

  public static Instance() {
    if (TextureUtil._instance === undefined)
      TextureUtil._instance = new TextureUtil();

    return TextureUtil._instance;
  }

  public async GetSetTexture(textureLocation: string) {
    try {
      let result = this._textureData[textureLocation];
      if (result == undefined) {
        result = await Texture.fromURL(textureLocation,
          {mipmap: MIPMAP_MODES.ON});
        this._textureData[textureLocation] = result;
      }

      return result;
    } catch (e) {
      void LogError(Module.TextureUtil, `Error while getting texture: "${textureLocation}"!`, e);
      return Texture.WHITE;
    }
  }
}

export async function GetBorderTexture(border: LandBorderTexture | undefined) {
  if (border == undefined)
    return Texture.WHITE;

  const textureLocation = `/resources/land-tile-border/${border}`;
  return TextureUtil.Instance().GetSetTexture(textureLocation);
}