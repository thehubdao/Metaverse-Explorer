import {Metaverse} from "../../enums/heatmap.enum";
import {CastStringToInteger} from "../common.util";
import {DecentralandTile, LandCoords, LandData} from "../../interfaces/land.interface";

export function FormatLand(pureLandData: string, metaverse: Metaverse) {
  const dataArray = pureLandData.split(';');

  const [x,
    y,
    eth_predicted_price,
    floor_adjusted_predicted_price,
    current_price_eth,
    history_amount,
    max_history_price,
    tokenId,
    wildcard,
    top,
    left,
    topLeft
  ]: (string | undefined)[] = dataArray;
  
  /* console.log(max_history_price?Number(max_history_price):'') */
  const land: LandData = {
    eth_predicted_price: Number(eth_predicted_price),
    floor_adjusted_predicted_price: Number(floor_adjusted_predicted_price),
    tokenId: tokenId,
    history_amount: history_amount ? Number(history_amount) : 0,
    max_history_price: max_history_price ? Number(max_history_price) : 0,
    current_price_eth: Number(current_price_eth),
  };

  if (metaverse === Metaverse.Sandbox) {
    land.coords = {
      x: CastStringToInteger(x),
      y: CastStringToInteger(y)
    };
    land.land_type = CastStringToInteger(wildcard);
    return land;
  }

  if (metaverse == Metaverse.SomniumSpace) {
    const geometryRawArray = wildcard.split('/');
    const geometry = geometryRawArray.map((coords) => {
      const [x, y] = coords.split(':');
      const result: LandCoords = { x: Number(x), y: Number(y) };
      return result;
    });

    land.center = {x, y};
    land.geometry = geometry;
    return land;
  }
  
  land.coords = {
    x: CastStringToInteger(x),
    y: CastStringToInteger(y)
  };
  land.tile = {
    type: CastStringToInteger(wildcard) ?? -1,
    top,
    left,
    topLeft
  } satisfies DecentralandTile;
  
  return land;
}