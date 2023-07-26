export type FilterPercentage = {
  predictedPricePercentage: readonly number[];
  normal: readonly number[];
  colors: readonly string[];
};

export type FilterPercentageStringKey = keyof Omit<FilterPercentage, 'colors'>;