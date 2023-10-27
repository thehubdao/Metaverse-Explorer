import { Metaverses } from "../enums/metaverses.enum";
import { ICoinPrices } from "../types/valuationTypes";

/**
 * @returns Array of Object keys with their proper types. Use this instead of Object.keys
 */
export function typedKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj) as K[];
}

export function TypedKeys<TObj extends object>(obj: TObj) {
  return Object.keys(obj) as (keyof TObj)[];
}

export function ObjectEntries<K extends (string | number | symbol), V>(obj: Record<K, V>) {
  return Object.entries(obj) as unknown as [K, V][];
}

export function GetKeyByValue<TEnum extends object>(value: string | number, enumRef: TEnum): keyof TEnum | undefined {
  const indexOfS = Object.values(enumRef).indexOf(value);
  const key = Object.keys(enumRef)[indexOfS];
  return key as unknown as keyof TEnum;
}

export function CastStringToNum(toCast: string, mult: number = 1) {
  const num = +toCast;
  return isNaN(num) ? undefined : num * mult;
}

export function CastStringToInteger(toCast: string) {
  const num = +toCast;
  return isNaN(num) ? undefined : num | 0;
}

export function RandomIntBetween(min: number, max: number) {
  return Math.floor((Math.random() * max) + min);
}

export function RandomIntMax(max: number) {
  return RandomIntBetween(0, max);
}

/***
 * Transform rgb string color to 0x hex string color
 * @param rgbColor must be "rrr,ggg,bbb" or "rgb(rrr,ggg,bbb)"
 * @return Ox hex string
 */
export function ColorRgbToHex(rgbColor: string) {
  if (rgbColor.startsWith('rgb'))
    rgbColor = rgbColor.split('(')[1].split(')')[0];
  
  let rgb = rgbColor.split(',');
  rgb = rgb.map((value) => {
    value = parseInt(value).toString(16);
    return value.length == 1 ? '0' + value : value;
  })
  return '#' + rgb.join('');
}

export function CleanHex(color: string) {
  if (color.startsWith('rgb')) {
    return ColorRgbToHex(color);
  }
  
  return color;
}

export function RemoveUndefinedProperties<T>(obj: T)  {
  const clone = {...obj};
  for (const k in clone) {
    if (clone[k] == undefined)
      delete clone[k];
  }

  return clone;
}

export function NumBetween(num: number, min: number, max: number) {
  return num <= max && num > min;
}

export function Delay(ms: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });
}

export function Raise(msg: string): never {
  throw new Error(msg);
}

export const convertETHPrediction = (
  coinPrices: ICoinPrices,
  ethPrediction = 0,
  metaverse: Metaverses
) => {
  const ethUSD = coinPrices.ethereum.usd;
  const usdPrediction = ethPrediction * ethUSD;
  const formattedMetaverse: keyof ICoinPrices =
      metaverse === Metaverses.SandBox
          ? 'the-sandbox'
          : metaverse === Metaverses.SomniumSpace
              ? 'somnium-space-cubes'
              : metaverse

  const metaverseUSD = coinPrices[formattedMetaverse].usd;
  let metaversePrediction: number | undefined;
  if(metaverseUSD !== 0){
    metaversePrediction = usdPrediction / metaverseUSD;
  } else metaversePrediction = undefined;
  return { ethPrediction, usdPrediction, metaversePrediction };
}