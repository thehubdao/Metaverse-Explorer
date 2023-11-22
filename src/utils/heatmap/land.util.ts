import {LandType} from "../../types/heatmap/land.type";
import {LandData, LandSomniumSpace} from "../../interfaces/land.interface";
import {Metaverses} from "../../enums/metaverses.enum";
import {LogWarning} from "../logging.util";
import {Module} from "../../enums/logging.enum";
import {CastStringToNum} from "../common.util";
import {SOMNIUM_SCALE, TILE_SIZE} from "../../constants/heatmap/heatmap.constant";
import { MapCoordinates } from "../../interfaces/heatmap.interface";
import {Result} from "../../types/common.type";

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

  if (metaverse == Metaverses.SomniumSpace) {
    const geometryRawArray = wildcard.split('/');
    const geometry: Required<MapCoordinates>[] = geometryRawArray.map((coords) => {
      const [x, y] = coords.split(':');
      return { x: CastStringToNum(x, SOMNIUM_SCALE) ?? -1, y: CastStringToNum(y, SOMNIUM_SCALE) ?? -1 };
    });
    const coords: MapCoordinates = { x: CastStringToNum(x, SOMNIUM_SCALE), y: CastStringToNum(y, SOMNIUM_SCALE) };

    return {
      ...land,
      coords,
      geometry,
      metaverse: Metaverses.SomniumSpace,
    };
  }

  if (!CheckCoords(land.coords.x, land.coords.y).success) return undefined;
  
  if (metaverse === Metaverses.SandBox) {
    return {
      ...land,
      land_type: CastStringToNum(wildcard),
      metaverse: Metaverses.SandBox,
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

interface SomniumTile {
  width: number;
  height: number;
  rotation: number;
}

export function SomniumValues(land: LandSomniumSpace): SomniumTile {
  const [A, B, , D] = land.geometry;

  const sideA = Math.abs(A.x - B.x);
  const sideB = Math.abs(A.y - B.y);

  const width = Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2)) * TILE_SIZE;
  const height = Math.sqrt(Math.pow(A.x - D.x, 2) + Math.pow(A.y - D.y, 2)) * TILE_SIZE;
  const rotation = Math.atan(sideA / sideB) * (180 / Math.PI);

  return {width, height, rotation};
}

function CheckCoords(x: number | undefined, y: number | undefined): Result<boolean> {
  if (x == undefined || y == undefined)
    return {success: false, errMessage: "Missing coords!"};
  
  const coordX = Math.abs(x);
  const coordY = Math.abs(y);
  
  if (coordX > 0 && coordX < 1 && coordY > 0 && coordY < 1)
    return {success: false, errMessage: "Coords out of bounds!"};
  
  return {success: true, value: true};
}