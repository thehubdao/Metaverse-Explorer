import {MapFilter, PercentFilter} from "../../types/heatmap/heatmap.type";
import {LogError} from "../logging.util";
import {Module} from "../../enums/logging.enum";
import {FilterColor} from "../../enums/valuation.enum";
import {CleanHex, NumBetween} from "../common.util";
import {FILTER_PERCENTAGES} from "../../constants/heatmap/valuation.constant";
import {PERCENT_FILTER} from "../../constants/heatmap/heatmap.constant";
import {FilterPercentageStringKey} from "../../types/heatmap/valuation.type";
import {LandRectangle} from "../../interfaces/heatmap.interface";
import {LandType} from "../../types/heatmap/land.type";

interface Limit {
  minimum: number;
  maximum: number;
}

// Calculating Percentages depending on the current chosen filter.
export function SetColors(lands: Record<string, LandRectangle | undefined>, filter: MapFilter | undefined) {
  if (filter == undefined)
    return void LogError(Module.ValuationColoring, "Missing filter!");
  
  const limits = GetGeneralData(lands, filter);
  
  Object.values(lands).map(landRectangle => {
    if (landRectangle == undefined) return;
    const land = landRectangle.land;
    
    const valuationOptions = GetValuationOption(land, filter, limits);
    
    land.percent = valuationOptions ?? GetPercentage(land[filter], limits);
  });
}

function GetValuationOption(land: LandType, filter: MapFilter, limits: Limit) {
  switch(filter) {
    case "price_difference":
      return land.current_price_eth > land.eth_predicted_price ? 100 : 30;
    case "listed_lands":
      return land.current_price_eth > -1 ? GetPercentage(land.eth_predicted_price, limits) : undefined;
    case "floor_adjusted_predicted_price":
      return GetPercentage(land.eth_predicted_price, limits);
    case "last_month_sells":
      return land.max_history_price > 0 ? GetPercentage(land.max_history_price, limits) : undefined;
    case "transfers":
      return GetPercentage(land.history_amount, limits);
    default: // basic
      return 20;
  }
}

export function GetGeneralData(landData: Record<string, LandRectangle | undefined>, filter: MapFilter) {
  const predictions = Object.values(landData).map(landSprite => {
    const land = landSprite?.land;
    if (land == undefined) return;
    
    switch(filter) {
      case "price_difference":
        return (land.current_price_eth / land.eth_predicted_price) - 1;
      case "eth_predicted_price":
      case "listed_lands":
        return land.eth_predicted_price;
      case "floor_adjusted_predicted_price":
        return land.floor_adjusted_predicted_price;
      case "transfers":
        return land.history_amount;
      case "last_month_sells":
        return land.max_history_price;
      default: // basic
        return;
    }
  });

  return GetLimits(predictions);
}

export function GetPercentage(partialValue: number | undefined, limits: Limit | undefined) {
  if (partialValue == undefined || limits == undefined) return 0;
  
  const percentage = Math.ceil(
    ((partialValue - limits.minimum) * 100) /
    (limits.maximum - limits.minimum)
  );
  
  return percentage > 0
    ? (percentage < 100
      ? percentage
      : 100)
    : 0;
}

function GetLimits(array: (number | undefined)[]): Limit {
  const arr: number[] = [];

  for (const value of array)
    if (value != undefined)
      arr.push(value);
  
  arr.sort((a, b) => a - b);
  
  const values: number[] = [];
  let minimum = Number.MAX_VALUE;
  let maximum = 0;
  
  for (let i = 30; i < arr.length - 30; i++) {
    values.push(arr[i]);
    maximum = arr[i] > maximum ? arr[i] : maximum;
    minimum = arr[i] < minimum ? arr[i] : minimum;
  }

  const mid = Math.floor(values.length - 1);
  const median = values.length % 2 == 0
      ? (values[mid] + values[mid - 1]) / 2.0
      : values[mid];
  
  const distance = Math.min(
    Math.abs(minimum - median),
    Math.abs(maximum - median)
  );
  
  return { minimum: minimum, maximum: median + distance };
}

function GenerateColor(percent: number, mapFilter?: MapFilter) {
  if (percent === 0 || !mapFilter) return FilterColor.DarkBlue;

  let color: string;
  if (NumBetween(percent, 0, 100)) {
    if (percent < FILTER_PERCENTAGES.predictedPricePercentage[1])
      color = `rgb(0,${Math.ceil(
        127 * (percent / FILTER_PERCENTAGES.predictedPricePercentage[1])
      )},  ${Math.ceil(
        127 * (percent / FILTER_PERCENTAGES.predictedPricePercentage[1])
      )})`;
    else if (percent < FILTER_PERCENTAGES.predictedPricePercentage[2])
      color = `rgb(0,${Math.ceil(
        127 + (128 * ((percent -
          FILTER_PERCENTAGES.predictedPricePercentage[1]) / (FILTER_PERCENTAGES.predictedPricePercentage[2] -
          FILTER_PERCENTAGES.predictedPricePercentage[1])))
      )},  ${Math.ceil(
        127 + (128 * ((percent -
          FILTER_PERCENTAGES.predictedPricePercentage[1]) / (FILTER_PERCENTAGES.predictedPricePercentage[2] -
          FILTER_PERCENTAGES.predictedPricePercentage[1])))
      )})`;
    else if (percent < FILTER_PERCENTAGES.predictedPricePercentage[3])
      color = `rgb(${Math.ceil(
        127 *
        ((percent - FILTER_PERCENTAGES.predictedPricePercentage[2]) /
          (FILTER_PERCENTAGES.predictedPricePercentage[3] -
            FILTER_PERCENTAGES.predictedPricePercentage[2]))
      )},255,255)`;
    else {
      color = `rgb(${Math.ceil(
        127 + (128 * ((percent -
          FILTER_PERCENTAGES.predictedPricePercentage[3]) / (FILTER_PERCENTAGES.predictedPricePercentage[4] -
          FILTER_PERCENTAGES.predictedPricePercentage[3])))
      )},255,255)`;
    }
  } else {
    color = FilterColor.Gray;
  }

  return CleanHex(color);
}

export async function GetTileColor(percent: number, percentFilter: PercentFilter, mapFilter?: MapFilter) {
  let color: string;
  
  // If land's percent is more than 100 then show dark-red
  if (percent > 100) {
    color = FilterIs(100, percentFilter) ? '#780000' : GenerateColor(0);
  } else if (NumBetween(percent, 0, 100)) {
    color = await new Promise(resolve => {
      let done = false;
      
      Object.values(PERCENT_FILTER).map((percentFromArray, i) => {
        if ( !done &&
          NumBetween(
            percent,
            FILTER_PERCENTAGES[FilterKey(mapFilter)][i],
            FILTER_PERCENTAGES[FilterKey(mapFilter)][i + 1]
          )
        ) {
          done = true;
          resolve(FilterIs(percentFromArray, percentFilter)
            ? GenerateColor(percent, mapFilter)
            : GenerateColor(0));
        }
      });
    });
  } else {
    color = GenerateColor(0);
  }

  return color;
}

// Checking if A) the filter corresponds to the current range/color. B) if there is any filter at all
function FilterIs(number: PercentFilter, percentFilter: PercentFilter) {
  return percentFilter === number || !percentFilter
}

function FilterKey(mapFilter: MapFilter | undefined): FilterPercentageStringKey {
  return mapFilter != undefined && [
    'eth_predicted_price',
    'listed_lands',
    'floor_adjusted_predicted_price',
    'last_month_sells',
  ].includes(mapFilter)
    ? "predictedPricePercentage"
    : "normal";
}