import {LandData} from "../../interfaces/land.interface";
import {DecentralandApiColor, FilterColor, LegendColor} from "../../enums/valuation.enum";
import {GetKeyByValue} from "../common.util";
import {LegendFilter, MapFilter, PercentFilter} from "../../types/heatmap/heatmap.type";
import {DECENTRALAND_API_COLORS} from "../../constants/heatmap/valuation.constant";
import {LEGEND_FILTER} from "../../constants/heatmap/heatmap.constant";
import {GetTileColor} from "./valuation-coloring.util";

interface FilteredLayer {
  color: string;
  top: boolean | undefined;
  left: boolean | undefined;
  topLeft: boolean | undefined;
  scale?: number;
}

export async function FilteredLayer(x: number | undefined, y: number | undefined, mapFilter: MapFilter | undefined, percentFilter: PercentFilter, legendFilter: LegendFilter, land: LandData): Promise<FilteredLayer> {
  if (new Set([5, 6, 7, 8, 12]).has(Number(land?.tile?.type)))
    return DecentralandAPILayer(x, y, land);
  
  /* Don't show a layer if user is tier0 and metaverse is decentraland. (we already have decentralands Map for that)  */
  const scaleOptions = {
    big: 1.4,
    mid: 1.2,
    base: 1,
  };
  
  let color: string;
  let scale: number | undefined;
  
  // If the legend filter is on Sale (the one on the bottom right)

  if (legendFilter === LEGEND_FILTER.OnSale) {
    // If land is on sale (therefore having the current_price_eth)
    land.current_price_eth
      ? mapFilter === "basic" // If map filter is basic
        ? (color = LegendColor.OnSale) // If filter is basic then return color purple
        // If filter is not basic, it means we should calculate color based on percetage with getTileColor()
        : (color = await GetTileColor(
          land.percent ?? 0,
          percentFilter,
          mapFilter
        ))
      : (color = FilterColor.Gray) // if land is not on sale make color to gray

    // If legend filter on bottom right is set on watchlist
  }
  else if (legendFilter === "premium-lands") {
    if (land?.land_type == 1) {
      color = LegendColor.PremiumLands
    } else { color = FilterColor.Gray }
  } else if (legendFilter === "watchlist") {
    //if the land is on users watchlist it will have a .watchlist attribute
    land.watchlist
      ? mapFilter === "basic"
        ? // If its in users watchlist and the filter is basic change color to fixed color and scale to big
        (color = LegendColor.Watchlist) &&
        (scale = scaleOptions.big)
        : // If its in users watchlist and filter is not basic then generate a proper color and set scale to big.
        (color = await GetTileColor(
          land.percent ?? 0,
          percentFilter,
          mapFilter
        )) && (scale = scaleOptions.big)
      : // If its not on users watchlist set color to gray
      (color = FilterColor.Gray)
    // If legend filter on bottom right is on portfolio
  } else if (legendFilter === "portfolio") {
    // If its on users portolio the land will have a .portfolio
    land.portfolio
      ? mapFilter === "basic"
        ? // if on our portfolio and filter basic, set color to fixed color and scale to big
        (color = LegendColor.Portfolio) &&
        (scale = scaleOptions.big)
        : // if on our portfolio but filter is not basic then generate proper color
        (color = await GetTileColor(
          land.percent ?? 0,
          percentFilter,
          mapFilter
        )) && (scale = scaleOptions.big)
      : (color = FilterColor.Gray)
    // If there's no legend filter and mapFilter is on basic
  } else if (mapFilter === "basic") {
    // If we are on decentraland and we land isnt on sale or on watchlist or on portfolio then return null
    if (land?.portfolio) {
      color = LegendColor.Portfolio;
      scale = scaleOptions.mid;
      // if mapFilter is basic and land is on watchlist set color to fixed color and scale to mid
    } else if (land?.watchlist) {
      color = LegendColor.Watchlist;
      scale = scaleOptions.mid
      // if mapFilter is basic and land is on sale set color to fixed color and scale to mid
    } else if (land?.current_price_eth) {
      color = LegendColor.OnSale;
    } else if (land?.land_type == 1) {
      color = LegendColor.PremiumLands;
    }

    else {
      color = land.tile?.type
        ? '#19202A'
        : '#7EFDE4'; //'#26EC75' // Green color for basic view with no filters and lands that are not on sale or watchlist or portfolio
    }
    // If there is no legend filter. And mapFilter is not on basic then generate a color based on percentage.
  } else {
    //console.log(land.percent)
    color = await GetTileColor(land.percent ?? 0, percentFilter, mapFilter)
  }
  
  return {
    scale,
    color,
    top: undefined,
    left: undefined,
    topLeft: undefined,
  }
}

function DecentralandAPILayer(x: number | undefined, y: number | undefined, land: LandData): FilteredLayer {
  // const id = x + ',' + y;
  const tile = land.tile;
  const colorKey = GetKeyByValue(tile?.type ?? -1, DecentralandApiColor);
  const color = DECENTRALAND_API_COLORS[colorKey != undefined
    ? DecentralandApiColor[colorKey]
    : DecentralandApiColor.Missing];

  const top = !!tile?.top;
  const left = !!tile?.left;
  const topLeft = !!tile?.topLeft;

  return {
    color,
    top,
    left,
    topLeft,
  }
}