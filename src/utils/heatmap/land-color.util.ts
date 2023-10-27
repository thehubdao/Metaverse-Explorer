import {LandType} from "../../types/heatmap/land.type";
import {LandBorderTexture} from "../../enums/heatmap/land.enum";
import {DecentralandApiColor} from "../../enums/valuation.enum";
import {MapFilter, PercentFilter} from "../../types/heatmap/heatmap.type";
import {LegendFilter} from "../../enums/heatmap/filter.enum";
import {CleanHex, GetKeyByValue, NumBetween} from "../common.util";
import {FILTER_COLOR, LEGEND_COLORS, PERCENT_FILTER} from "../../constants/heatmap/heatmap.constant";
import {DECENTRALAND_API_COLORS, FILTER_PERCENTAGES} from "../../constants/heatmap/valuation.constant";
import {FilterPercentageStringKey} from "../../types/heatmap/valuation.type";
import {LandDecentraland} from "../../interfaces/land.interface";
import {Metaverses} from "../../enums/metaverses.enum";

export function GetLandBorder(land: LandType): LandBorderTexture | undefined {
  if (land.metaverse !== Metaverses.Decentraland)
    return LandBorderTexture.FullBorderDead;

  const {top, left, topLeft} = land.tile;

  if (top && left && topLeft)
    return undefined;
  else if (!top && left)
    return LandBorderTexture.TopBorder;
  else if (top && !left)
    return LandBorderTexture.LeftBorder;
  else if (!top && !left)
    return LandBorderTexture.TopLeftBorder;
  else if (top && left && !topLeft)
    return LandBorderTexture.FillBorder;
}

const SCALE_OPTIONS = {
  big: 1.4,
  mid: 1.2,
  base: 1,
} as const;

interface FilteredLayer {
  color: string;
  scale?: number;
}

export function GetTileColorByFilter(mapFilter: MapFilter | undefined,
                                     percentFilter: PercentFilter,
                                     legendFilter: LegendFilter | undefined,
                                     land: LandType): FilteredLayer {
  if (land.metaverse === Metaverses.Decentraland && [5, 6, 7, 8, 12].some(x => x === land.tile.type)) {
    return DecentralandAPILayer(land);
  }

  // console.log(land.current_price_eth)
  // console.log(land.tile.type)
  
  let color: string | undefined;
  let scale: number | undefined;

  switch (legendFilter) {
    case LegendFilter.OnSale:
      if (land.current_price_eth > -1) {
        if (mapFilter === "basic")
          color = LEGEND_COLORS.OnSale;
        else
          color = GetTileColor(land.percent ?? 0, percentFilter, mapFilter);
      }
      else
        color = FILTER_COLOR.Gray;
      
      break;
    case LegendFilter.PremiumLands:
      if (land.metaverse === Metaverses.SandBox && land.land_type === 1)
        color = LEGEND_COLORS.PremiumLands
      else
        color = FILTER_COLOR.Gray
      
      break;
    case LegendFilter.Watchlist:
      if (land.watchlist) {
        if (mapFilter === "basic") {
          color = LEGEND_COLORS.Watchlist;
          scale = SCALE_OPTIONS.big;
        } else {
          color = GetTileColor(land.percent ?? 0, percentFilter, mapFilter);
          scale = SCALE_OPTIONS.big;
        }
      } else
        color = FILTER_COLOR.Gray;
      
      break;
    case LegendFilter.Portfolio:
      if (land.portfolio != undefined) {
        if (mapFilter === "basic") {
          color = LEGEND_COLORS.Portfolio;
          scale = SCALE_OPTIONS.big;
        } else {
          color = GetTileColor(land.percent ?? 0, percentFilter, mapFilter);
          scale = SCALE_OPTIONS.big;
        }
      }
      else 
        color = FILTER_COLOR.Gray;
    
      break;
    default:
      if (mapFilter === "basic") {
        if (land.portfolio != undefined) {
          color = LEGEND_COLORS.Portfolio;
          scale = SCALE_OPTIONS.mid;
        } else if (land.watchlist) {
          color = LEGEND_COLORS.Watchlist;
          scale = SCALE_OPTIONS.mid;
        } else if (land.current_price_eth > 0) {
          color = LEGEND_COLORS.OnSale;
        } else if (land.metaverse === Metaverses.SandBox && land.land_type == 1) {
          color = LEGEND_COLORS.PremiumLands;
        } else {
          color = land.metaverse === Metaverses.Decentraland && land.tile.type > -1
            ? '#19202A'
            : '#7EFDE4';
        }
      }
      
      break;
  }
  
  if (color == undefined)
    color = GetTileColor(land.percent ?? 0, percentFilter, mapFilter);

  return {scale, color} satisfies FilteredLayer;
}

function GetTileColor(percent: number, percentFilter: PercentFilter, mapFilter?: MapFilter) {
  let color = GenerateColor(0);

  // If land's percent is more than 100 then show dark-red
  if (percent > 100) {
    color = FilterIs(100, percentFilter) ? '#780000' : GenerateColor(0);
  } else if (NumBetween(percent, 0, 100)) {
    for (const [i, percentFromArray] of PERCENT_FILTER.entries()) {
      if (NumBetween(percent,
        FILTER_PERCENTAGES[FilterKey(mapFilter)][i],
        FILTER_PERCENTAGES[FilterKey(mapFilter)][i + 1])) {
        color = FilterIs(percentFromArray, percentFilter)
          ? GenerateColor(percent, mapFilter)
          : GenerateColor(0);
        break;
      }
    }
  }
  
  return color;
}

// Checking if A) the filter corresponds to the current range/color. B) if there is any filter at all
function FilterIs(number: PercentFilter, percentFilter: PercentFilter) {
  return percentFilter === number || !percentFilter
}

function GenerateColor(percent: number, mapFilter?: MapFilter) {
  if (percent === 0 || !mapFilter) return FILTER_COLOR.DarkBlue;

  let color: string;
  if (NumBetween(percent, 0, 100)) {
    if (percent < FILTER_PERCENTAGES.predictedPricePercentage[1])
      color = `rgb(0,
      ${Math.ceil(127 * (percent / FILTER_PERCENTAGES.predictedPricePercentage[1]))},
      ${Math.ceil(127 * (percent / FILTER_PERCENTAGES.predictedPricePercentage[1])
      )})`;
    else if (percent < FILTER_PERCENTAGES.predictedPricePercentage[2])
      color = `rgb(0,
      ${Math.ceil(127 + (128 * ((percent - FILTER_PERCENTAGES.predictedPricePercentage[1]) / (FILTER_PERCENTAGES.predictedPricePercentage[2] - FILTER_PERCENTAGES.predictedPricePercentage[1]))))},
      ${Math.ceil(127 + (128 * ((percent - FILTER_PERCENTAGES.predictedPricePercentage[1]) / (FILTER_PERCENTAGES.predictedPricePercentage[2] - FILTER_PERCENTAGES.predictedPricePercentage[1])))
      )})`;
    else if (percent < FILTER_PERCENTAGES.predictedPricePercentage[3])
      color = `rgb(${Math.ceil(127 * ((percent - FILTER_PERCENTAGES.predictedPricePercentage[2]) / (FILTER_PERCENTAGES.predictedPricePercentage[3] - FILTER_PERCENTAGES.predictedPricePercentage[2])))},
      255,
      255)`;
    else {
      color = `rgb(${Math.ceil(127 + (128 * ((percent - FILTER_PERCENTAGES.predictedPricePercentage[3]) / (FILTER_PERCENTAGES.predictedPricePercentage[4] - FILTER_PERCENTAGES.predictedPricePercentage[3]))))},
      255,
      255)`;
    }
  } else {
    color = FILTER_COLOR.Gray;
  }

  return CleanHex(color);
}

function FilterKey(mapFilter: MapFilter | undefined): FilterPercentageStringKey {
  const filterArray: MapFilter[] = [
    "eth_predicted_price",
    "listed_lands",
    "floor_adjusted_predicted_price",
    "last_month_sells"
  ];
  
  return mapFilter != undefined && filterArray.includes(mapFilter)
    ? "predictedPricePercentage"
    : "normal";
}

function DecentralandAPILayer(land: LandDecentraland) {
  const tile = land.tile;
  const colorKey = GetKeyByValue(tile.type, DecentralandApiColor);
  const color = DECENTRALAND_API_COLORS[colorKey != undefined
    ? DecentralandApiColor[colorKey]
    : DecentralandApiColor.Missing];

  return { color } satisfies FilteredLayer;
}