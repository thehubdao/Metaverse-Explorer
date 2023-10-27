import { METAVERSE_LABEL } from "../constants/common.constant";
import { AnalyticsChartRoutes } from "../enums/charts";
import { Currencies } from "../enums/common.enum";
import { Metaverses } from "../enums/metaverses.enum";
import { ApiData, ChartInfo } from "../interfaces/charts";

//* Array of tuples representing chart routes and their corresponding chart information.
export const CHART_ROUTES: Array<[AnalyticsChartRoutes, ChartInfo]> = [
  [AnalyticsChartRoutes.AverageSalePricPerParcel, {
    route: 'avgPriceParcel',
    label: 'Average Sale Price per Parcel',
    description: 'Average sale price for a 1x1 plot of LAND for a given timeframe',
  }], [AnalyticsChartRoutes.CheapestSale, {
    route: 'floorPrice',
    label: 'Cheapest sale',
    description: 'Lowest listing price of a 1x1 plot of LAND on Opensea for a given timeframe',
  }], [AnalyticsChartRoutes.AveragePricePerArea, {
    route: 'avgPriceParcelPerArea',
    label: 'Average Price Per m^2',
    description: 'Average sale price for 1 m^2 of LAND for a given timeframe',
  }], [AnalyticsChartRoutes.TotalSales, {
    route: 'totalNumberOfSales',
    label: 'Total Sales',
    description: 'Total plots of LAND sold in a given period of time'
  }], [AnalyticsChartRoutes.StandardDeviation, {
    route: 'stdSalesPrices',
    label: 'Standard Deviation',
    description: 'Standard deviation of average sales prices'
  }], [AnalyticsChartRoutes.DailySalesVolume, {
    route: 'salesVolume',
    label: 'Daily Sales Volume',
    description: 'LAND sales volume for a given timeframe'
  }], [AnalyticsChartRoutes.MaxPrice, {
    route: 'maxPrice',
    label: 'Max Price',
    description: 'Highest price paid for a plot of LAND in a given timeframe'
  }],
]

//* Array of metaverse filters, each containing metaverse, name, and imageUrl properties.
export const METAVERSE_FILTERS: Array<{ metaverse: Metaverses, name: string, imageUrl: string }> = [{
  metaverse: Metaverses.SandBox,
  name: METAVERSE_LABEL.sandbox,
  imageUrl: '/images/the-sandbox-sand-logo.png'
}, {
  metaverse: Metaverses.Decentraland,
  name: METAVERSE_LABEL.decentraland,
  imageUrl: '/images/decentraland-mana-logo.png'
}, {
  metaverse: Metaverses.SomniumSpace,
  name: METAVERSE_LABEL["somnium-space"],
  imageUrl: '/images/somnium-space-cube-logo.webp'
}]

//* Array of currency filters, each containing currency and name properties.
export const CURRENCY_FILTERS: Array<{ currency: Currencies, name: string }> = [{
  currency: Currencies.Ethereum,
  name: 'ETH'
}, {
  currency: Currencies.USDCoin,
  name: 'USDC'
}]

//* A test function used for generating dummy API data for testing purposes.
//! Note: This function should be removed when connecting analytics charts to their respective API.
export function generateTestApiData(nData: number, route: string): Promise<ApiData[]> {
  // TODO: remove
  console.warn(`Generating data for ${route}`);
  
  return new Promise((resolve, reject) => {
    const API_DATA: ApiData[] = [];

    // Get the current timestamp and round it to the start of the day.
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const oneDayMilliseconds = 24 * 60 * 60 * 1000;

    // Iterate n times to create the array with the required objects.
    for (let i = 0; i < nData; i++) {
      // Subtract 'i' days from the current date.
      const time = (now.getTime() - i * oneDayMilliseconds) / 1000;

      // Generate a random value for the "data" property.
      const data = Math.random();

      API_DATA.push({ time, data });
    }

    // Introduce a delay of 3 seconds before resolving the Promise with the data.
    setTimeout(() => {
      if (Math.random() <= 0.2) {
        reject("Failed to fetch data from the API.");
        return;
      }

      resolve(API_DATA);
    }, Math.random() * 3000); // random 0 - 3000 milliseconds (0 - 3 seconds)
  });
}

//* Object that maps metaverse names to their corresponding colors.
const metaverseColor = {
  sandbox: '#00AFFF',
  decentraland: '#FF2D55',
  'somnium-space': '#54575C'
} as const;

//* Function to get the color for a specific metaverse based on its name.
export function getMetaverseColor(inputMetaverse: Metaverses) {
  const metaverseValues = Object.values(Metaverses);

  for (const metaverse of metaverseValues) {
    if (inputMetaverse === metaverse) return metaverseColor[metaverse];
  }

  return '#000'; // Default color if the metaverse is not found in the mapping.
}