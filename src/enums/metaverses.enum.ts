export enum Metaverses {
  SandBox = 'sandbox',
  Decentraland = 'decentraland',
  SomniumSpace = 'somnium-space',
}

export const METAVERSE_LABEL: Record<Metaverses | "All", string> = {
  All: "All Lands",
  [Metaverses.SandBox]: "The Sandbox",
  [Metaverses.Decentraland]: "Decentraland",
  [Metaverses.SomniumSpace]: "Somnium Space"
} as const;