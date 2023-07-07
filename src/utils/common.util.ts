/**
 * @returns Array of Object keys with their proper types. Use this instead of Object.keys
 */
export function typedKeys<O extends object, K extends keyof O = keyof O>(
    obj: O
  ): K[] {
    return Object.keys(obj) as K[]
  }


export function GetKeyByValue<TEnum extends object>(value: string, enumRef: TEnum): keyof TEnum | undefined {
  const indexOfS = Object.values(enumRef).indexOf(value);
  const key = Object.keys(enumRef)[indexOfS];
  return key as unknown as keyof TEnum;
}
  
export function RandomIntBetween(min: number, max: number) {
  return Math.floor((Math.random() * max) + min);
}

export function RandomIntMax(max: number) {
  return RandomIntBetween(0, max);
}

export function ColorRgbToHex(rgbColor: string) {
  let rgb = rgbColor.split(',');
  rgb = rgb.map((value) => {
    value = parseInt(value).toString(16);
    return value.length == 1 ? '0' + value : value;
  })
  return '0x' + rgb.join('');
}