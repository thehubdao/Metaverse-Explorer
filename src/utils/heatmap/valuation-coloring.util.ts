import {MapFilter, PercentFilter} from "../../types/heatmap/heatmap.type";
import {LandData} from "../../interfaces/land.interface";
import {LogError} from "../logging.util";
import {Module} from "../../enums/logging.enum";
import {FilterColor} from "../../enums/valuation.enum";
import {CleanHex, NumBetween} from "../common.util";
import {FILTER_PERCENTAGES} from "../../constants/heatmap/valuation.constant";
import {PERCENT_FILTER} from "../../constants/heatmap/heatmap.constant";
import {FilterPercentageStringKey} from "../../types/heatmap/valuation.type";
import {Metaverse} from "../../../old/lib/metaverse";

interface Limit {
  minimum: number;
  maximum: number;
}

interface ElementData {
  predictions: (number | undefined)[];
  limits?: Limit;
}

// Calculating Percentages depending on the current chosen filter.
export async function SetColors(valuationAtlas: Record<string, LandData>, filter: MapFilter | undefined) {
  if (filter == undefined)
    return void LogError(Module.ValuationColoring, "Missing filter!");
  
  const wholeData = GetGeneralData(valuationAtlas);
  const limits = wholeData[filter].limits;

  // GENERATE PERCENTAGE FOR EACH TILE.
  Object.keys(valuationAtlas).map(valuation => {
    const valuationOptions: Partial<Record<MapFilter, number>> = {
      price_difference:
        valuationAtlas[valuation].current_price_eth > valuationAtlas[valuation].eth_predicted_price 
          ? 100
          : 30
      , // If land's price difference is higher than MAX_DIFF make their percentage 101, this will show them as dark red.
      basic: 20,
      listed_lands:
        valuationAtlas[valuation].current_price_eth
        ? GetPercentage(valuationAtlas[valuation].eth_predicted_price, limits)
        : undefined
      ,
      floor_adjusted_predicted_price:
        GetPercentage(valuationAtlas[valuation].floor_adjusted_predicted_price, limits),
      last_month_sells:
        valuationAtlas[valuation].max_history_price
          ? GetPercentage(valuationAtlas[valuation].max_history_price, limits)
          : undefined
      ,
      transfers:
        GetPercentage(valuationAtlas[valuation].history_amount, limits),
    };
    
    valuationAtlas[valuation].percent = valuationOptions[filter]
      ?? GetPercentage(valuationAtlas[valuation][filter], limits);
  });
  
  return valuationAtlas;
}

export function GetGeneralData(valuationAtlas: Record<string, LandData>) {
  const elementOptions: Record<MapFilter, ElementData> = {
    price_difference: {
      predictions: Object.keys(valuationAtlas).map(valuation => {
        if (valuationAtlas[valuation].current_price_eth == undefined)
          return;
        
        return (valuationAtlas[valuation].current_price_eth / valuationAtlas[valuation].eth_predicted_price) - 1;
      }),
    },
    listed_lands: {
      predictions: Object.keys(valuationAtlas).map(valuation =>
        valuationAtlas[valuation].eth_predicted_price
      ),
    },
    basic: {predictions: []},
    eth_predicted_price: {
      predictions: Object.keys(valuationAtlas).map(
        valuation =>
          valuationAtlas[valuation].eth_predicted_price
      )
    },
    floor_adjusted_predicted_price: {
      predictions: Object.keys(valuationAtlas).map(
        valuation =>
          valuationAtlas[valuation]?.floor_adjusted_predicted_price
      ),
    },
    transfers: {
      predictions: Object.keys(valuationAtlas).map(
        valuation => valuationAtlas[valuation].history_amount
      ),
    },
    last_month_sells: {
      predictions: Object.keys(valuationAtlas).map(valuation => valuationAtlas[valuation].max_history_price),
    }
  };

  Object.values(elementOptions).forEach((value) => {
    value.limits = GetLimits(value.predictions);
  });

  return elementOptions;
}

export function GetPercentage(partialValue: number | undefined, limits: Limit | undefined) {
  if (partialValue == undefined || limits == undefined) return 0;
  
  let percentage = Math.ceil(
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
  let arr: number[] = [];

  for (let value of array)
    if (value != undefined)
      arr.push(value);
  
  arr.sort((a, b) => a - b);
  
  let values: number[] = [];
  let minimum = Number.MAX_VALUE;
  let maximum = 0;
  
  for (let i = 30; i < arr.length - 30; i++) {
    values.push(arr[i]);
    maximum = arr[i] > maximum ? arr[i] : maximum;
    minimum = arr[i] < minimum ? arr[i] : minimum;
  }

  let mid = Math.floor(values.length - 1);
  let median =
    values.length % 2 == 0
      ? (values[mid] + values[mid - 1]) / 2.0
      : values[mid];
  
  let distance = Math.min(
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

export function GetBorder(land: LandData, metaverse: Metaverse) {
  if (land.tile == undefined) return '/full_border.jpg';
  if (land.tile.top != undefined && land.tile.left != undefined && land.tile.topLeft != undefined) return undefined;
    
  else if (land.tile.top == undefined && land.tile.left != undefined) return '/top_border.jpg';
  else if (land.tile.top != undefined && land.tile.left == undefined) return '/left_border.jpg';
  else if (land.tile.top == undefined && land.tile.left == undefined) return '/topLeft_border.jpg';
  else if (land.tile.top != undefined && land.tile.left != undefined && land.tile.topLeft ==  undefined)
    return '/fill_border.jpg';
}