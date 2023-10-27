import { Module } from '../../enums/logging.enum';
import { CoinValuesType } from "../../types/common.type";
import { LogError } from '../../utils/logging.util';
interface CoinValue {
  usd: number;
}

interface CoinValues {
  [key: string]: CoinValue;
}

interface CoinITRMResponse {
  success: CoinValues;
}

export async function getCoingeckoPrices(): Promise<CoinValuesType> {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_ITRM_SERVICE??""}/val-analytics/coingeckoResponse`);
    const coinITRM = (await response.json()) as CoinITRMResponse;

    if (coinITRM.success) {
      coinValues = coinITRM.success;
    }
  } catch (error) {
    LogError(Module.ITRMService, "fetch has failed", error);
  }
  return coinValues as unknown as CoinValuesType;
}