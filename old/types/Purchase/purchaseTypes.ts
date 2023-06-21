import { ValueOf } from '../../lib/types'

const apiTokenNames = {
  eth: 'ethereum',
  matic: 'wmatic',
  mgh: 'metagamehub-dao',
  usdc: 'usd-coin',
  usdt: 'tether',
  ocean: 'ocean-protocol',
  sand: 'the-sandbox',
  mana: 'decentraland',
} as const

export type PurchaseCoinValues = Record<
  ValueOf<typeof apiTokenNames>,
  { usd: number }
>