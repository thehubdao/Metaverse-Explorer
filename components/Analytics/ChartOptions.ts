export const chartRoutes = [
    {
        route: 'avgPriceParcel',
        label: 'Average Sale Price per Parcel',
        description: 'Average sale price for a 1x1 plot of LAND for a given timeframe',
    },
    {
        route: 'floorPrice',
        label: 'Cheapest sale',
        description: 'Lowest listing price of a 1x1 plot of LAND on Opensea for a given timeframe',
    },
    {
        route: 'avgPriceParcelPerArea',
        label: 'Average Price Per m^2',
        description: 'Average sale price for 1 m^2 of LAND for a given timeframe',
    },
    { route: 'totalNumberOfSales', label: 'Total Sales', description: 'Total plots of LAND sold in a given period of time' },
    { route: 'stdSalesPrices', label: 'Standard Deviation', description: 'Standard deviation of average sales prices' },
    { route: 'salesVolume', label: 'Daily Sales Volume', description: 'LAND sales volume for a given timeframe' },
    { route: 'maxPrice', label: 'Max Price', description: 'Highest price paid for a plot of LAND in a given timeframe' }
]

export const chartSymbolOptions = {
    ETH: { key: 'ethPrediction' },
    USDC: { key: 'usdPrediction' },
    METAVERSE: {
        key: 'metaversePrediction',
        sandbox: 'SAND',
        decentraland: 'MANA',
        'axie-infinity': 'AXS',
        'somnium-space': 'CUBE'
    },
} as const
