import {LandType} from "../../types/heatmap/land.type";
import {Coords, LandData} from "../../interfaces/land.interface";
import {Metaverses} from "../../enums/metaverses.enum";
import {LogWarning} from "../logging.util";
import {Module} from "../../enums/logging.enum";
import {CastStringToNum} from "../common.util";

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
    current_price_eth: CastStringToNum(current_price_eth) ?? -1,
    eth_predicted_price: CastStringToNum(eth_predicted_price) ?? -1,
    floor_adjusted_predicted_price: CastStringToNum(floor_adjusted_predicted_price) ?? -1,
    history_amount: CastStringToNum(history_amount) ?? -1,
    max_history_price: CastStringToNum(max_history_price) ?? -1,
    coords: { x: CastStringToNum(x), y: CastStringToNum(y) }
  };

  if (metaverse === Metaverses.SandBox) {
    land.coords = {
      x: CastStringToNum(x),
      y: CastStringToNum(y)
    };
    return {
      ...land,
      land_type: CastStringToNum(wildcard),
      metaverse: Metaverses.SandBox,
    };
  }

  if (metaverse == Metaverses.SomniumSpace) {
    const geometryRawArray = wildcard.split('/');
    const geometry: Coords[] = geometryRawArray.map((coords) => {
      const [x, y] = coords.split(':');
      return { x: CastStringToNum(x), y: CastStringToNum(y) };
    });
    const coords: Coords = { x: CastStringToNum(x), y: CastStringToNum(y) };
    
    return {
      ...land,
      coords,
      geometry,
      metaverse: Metaverses.SomniumSpace,
    };
  }

  return {
    ...land,
    tile: {
      type: CastStringToNum(wildcard) ?? -1,
      top: top !== '',
      left: left !== '',
      topLeft: topLeft !== ''
    },
    metaverse: Metaverses.Decentraland,
  };
}