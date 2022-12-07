export enum Network {
  ETHEREUM = 'Ethereum',
  POLYGON = 'Polygon',
}

export enum Tokens {
  ETH = 'ETH',
  MGH = 'MGH',
  MMGH = 'mMGH',
  MGH_DATA = 'MGH Data',
}

export enum Provider {
  METAMASK = 'metamask',
  WALLETCONNECT = 'walletconnect',
  WEB3AUTH = 'web3auth'
}

// Commenting this out to use type from ./metaverse.ts If not we are constantly having to write "as Metaverse" when using this enum
// export enum Metaverse {
//     SANDBOX = "sandbox",
//     DECENTRALAND = "decentraland",
//     AXIE_INFINITY = "axie-infinity"
// }
