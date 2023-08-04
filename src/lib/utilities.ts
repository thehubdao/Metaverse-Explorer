/**
 * @returns Array of Object keys with their proper types. Use this instead of Object.keys
 */
export function typedKeys<O extends object, K extends keyof O = keyof O>(
  obj: O
): K[] {
  return Object.keys(obj) as K[]
}
