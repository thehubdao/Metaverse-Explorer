import { Metaverses } from "../enums/metaverses.enum";

export const DEFAULT_COIN_VALUES = {
  decentraland: {
    usd: 0
  },
  ethereum: {
    usd: 0
  },
  "metagamehub-dao": {
    usd: 0
  },
  "ocean-protocol": {
    usd: 0
  },
  "somnium-space-cubes": {
    usd: 0
  },
  tether: {
    usd: 0
  },
  "the-sandbox": {
    usd: 0
  },
  "usd-coin": {
    usd: 0
  },
  wmatic: {
    usd: 0
  }
} as const;

export const DEFAULT_TOTAL_WORTH = {
  ethPrediction: 0,
  usdPrediction: 0
}

export const LIST = [
  {
    url: "/metaverseexplorer",
    label: "Metaverse explorer",
    icon: "b",
    isExternal: false,
  },
  {
    url: "/stake",
    label: "Stake MGH",
    icon: "d",
    isExternal: false,
  },
  {
    url: "https://snapshot.org/#/metagamehub.eth",
    label: "Governance",
    icon: "a",
    isExternal: true,
  },
];

export const METAVERSE_LABEL: Record<Metaverses | "All", string> = {
  All: "All Lands",
  [Metaverses.SandBox]: "The Sandbox",
  [Metaverses.Decentraland]: "Decentraland",
  [Metaverses.SomniumSpace]: "Somnium Space"
} as const;