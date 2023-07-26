import { ICoinPrices } from '../../lib/valuation/valuationTypes';
interface CoinValue {
  usd: number;
}

interface CoinValues {
  [key: string]: CoinValue;
}

interface CoinITRMResponse {
  success: CoinValues;
}

export async function getCoingeckoPrices(): Promise<ICoinPrices> {
  let coinValues: CoinValues = {
    "decentraland": {
      "usd": 0
    },
    "ethereum": {
      "usd": 0
    },
    "metagamehub-dao": {
      "usd": 0
    },
    "ocean-protocol": {
      "usd": 0
    },
    "somnium-space-cubes": {
      "usd": 0
    },
    "tether": {
      "usd": 0
    },
    "the-sandbox": {
      "usd": 0
    },
    "usd-coin": {
      "usd": 0
    },
    "wmatic": {
      "usd": 0
    }
  }

  try {
    const response = await fetch(`${process.env.ITRM_SERVICE??""}/val-analytics/coingeckoResponse`)
    const coinITRM: CoinITRMResponse = await response.json()

    if (coinITRM.success) {
      coinValues = coinITRM.success
    }
  } catch (error) {
    console.error(error);
  }
  return coinValues as unknown as ICoinPrices
}