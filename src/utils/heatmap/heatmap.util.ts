import {DisplayObject} from "pixi.js";
import {OtherSprite} from "../../interfaces/heatmap.interface";

export function IsOtherSprite(obj: DisplayObject): obj is OtherSprite {
  return 'type' in (obj as OtherSprite);
}