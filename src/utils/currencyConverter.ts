import { Currencies } from "../enums/common";

/**
 ** Function to convert a currency value from one currency to another based on currency exchange rates.
 * @param inputCurrency The currency to convert from.
 * @param outputCurrency The currency to convert to.
 * @param inputValue The value to be converted.
 * @param currencyData An object containing currency exchange rates, where keys are from the Currencies enum and values are exchange rates.
 * @returns The converted value in the output currency.
 */
export const convertCurrency = (
  inputCurrency: Currencies,
  outputCurrency: Currencies,
  inputValue: number,
  currencyData: { [key in Currencies]: number }
): number => {
  // Get exchange rates for the input and output currencies
  const inputRate = currencyData[inputCurrency];
  const outputRate = currencyData[outputCurrency];

  // If either of the exchange rates is not available, return 0 (conversion not possible)
  if (!inputRate || !outputRate) { return 0; }

  // Calculate the converted value using the exchange rates
  const outputValue: number = inputValue * (outputRate / inputRate);
  return outputValue;
};