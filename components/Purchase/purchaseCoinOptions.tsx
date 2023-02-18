import { Contracts } from "../../lib/contracts";

export const purchaseCoinOptions = {
  mgh: {
    img: '/images/mgh_logo.svg',
    contractAddress: Contracts.MGH_TOKEN.ETHEREUM_MAINNET.address,
    chain: 1,
    decimals: 18,
  },
  eth: {
    img: '/images/ethereum-eth-logo.png',
    contractAddress: '',
    chain: 1,
    decimals: 18,
  },

  usdc: {
    img: '/images/usd-coin-usdc-logo.png',
    contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    chain: 1,
    decimals: 6,
  },
  usdt: {
    img: '/images/usdt-logo.png',
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    chain: 1,
    decimals: 6,
  },
  matic: {
    img: '/images/polygon-matic-logo.png',
    contractAddress: '',
    chain: 137,
    decimals: 18,
  },
  ocean: {
    img: '/images/ocean-logo.webp',
    contractAddress: '0x967da4048cd07ab37855c090aaf366e4ce1b9f48',
    chain: 1,
    decimals: 18,
  },
  sand: {
    img: '/images/the-sandbox-sand-logo.png',
    contractAddress: '0x3845badade8e6dff049820680d1f14bd3903a5d0',
    chain: 1,
    decimals: 18,
  },
  mana: {
    img: '/images/decentraland-mana-logo.png',
    contractAddress: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
    chain: 1,
    decimals: 18,
  },
} as const
