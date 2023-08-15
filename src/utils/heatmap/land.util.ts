import {LandType} from "../../types/heatmap/land.type";
import {LandDecentraland, LandSandbox} from "../../interfaces/land.interface";

export function IsLandDecentraland(land: LandType): land is LandDecentraland {
  return (land as LandDecentraland).isDcl;
}

export function IsLandSandBox(land: LandType): land is LandSandbox {
  return (land as LandSandbox).isSandbox;
}