import { apiTokenNames, purchaseCoinOptions } from '.'
import { ValueOf } from '../../lib/types'

export type PurchaseMonthlyChoice = 200 | 450 | 1200 | undefined
export type PurchaseCoin = keyof typeof purchaseCoinOptions

export type PurchaseCoinsBalance = Record<PurchaseCoin, number>
export type PurchaseCoinValues = Record<
  ValueOf<typeof apiTokenNames>,
  { usd: number }
>
