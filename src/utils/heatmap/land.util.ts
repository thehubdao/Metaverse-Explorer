import {LandType} from "../../types/heatmap/land.type";
import {Coords, LandData, LandDecentraland, LandSandbox} from "../../interfaces/land.interface";
import {Metaverses} from "../../enums/metaverses.enum";
import {LogWarning} from "../logging.util";
import {Module} from "../../enums/logging.enum";
import {CastStringToInteger} from "../common.util";

export function IsLandDecentraland(land: LandType): land is LandDecentraland {
  return (land as LandDecentraland).isDcl;
}

export function IsLandSandBox(land: LandType): land is LandSandbox {
  return (land as LandSandbox).isSandbox;
}

export function FormatLand(landRawData: string | undefined, landKeyIndex: number | undefined, metaverse: Metaverses): LandType | undefined {
  if (landRawData == undefined || landKeyIndex == undefined)
    return void LogWarning(Module.LandSocket, "Empty land from socket!");

  const dataArray = landRawData.split(';');

  const [x,                             // 0
    y,                                  // 1
    eth_predicted_price,                // 2
    floor_adjusted_predicted_price,     // 3
    current_price_eth,                  // 4
    history_amount,                     // 5
    max_history_price,                  // 6
    tokenId,                            // 7
    wildcard,                           // 8
    top,                                // 9
    left,                               // 10
    topLeft                             // 11
  ]: (string | undefined)[] = dataArray;

  const land: LandData = {
    keyIndex: landKeyIndex,
    tokenId: tokenId,
    current_price_eth: CastStringToInteger(current_price_eth) ?? -1,
    eth_predicted_price: CastStringToInteger(eth_predicted_price) ?? -1,
    floor_adjusted_predicted_price: CastStringToInteger(floor_adjusted_predicted_price) ?? -1,
    history_amount: CastStringToInteger(history_amount) ?? -1,
    max_history_price: CastStringToInteger(max_history_price) ?? -1,
    coords: { x: CastStringToInteger(x), y: CastStringToInteger(y) }
  };

  if (metaverse === Metaverses.SandBox) {
    land.coords = {
      x: CastStringToInteger(x),
      y: CastStringToInteger(y)
    };
    return {
      ...land,
      land_type: CastStringToInteger(wildcard),
      isSandbox: true
    };
  }

  if (metaverse == Metaverses.SomniumSpace) {
    const geometryRawArray = wildcard.split('/');
    const geometry: Coords[] = geometryRawArray.map((coords) => {
      const [x, y] = coords.split(':');
      return { x: CastStringToInteger(x), y: CastStringToInteger(y) } satisfies Coords;
    });

    return {
      ...land,
      geometry,
      isSSpace: true,
    };
  }

  return {
    ...land,
    tile: {
      type: CastStringToInteger(wildcard) ?? -1,
      top: top !== '',
      left: left !== '',
      topLeft: topLeft !== ''
    },
    isDcl: true,
  };
}