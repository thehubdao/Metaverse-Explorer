export enum Metaverses {
  sandbox = 'sandbox',
  decentraland= 'decentraland',
  'somnium-space' = 'somnium-space',
}

export type MetaverseOptionsKey = keyof typeof MetaverseOptions;

export enum MetaverseOptions {
  all = "All Lands",
  sandbox = "The Sandbox",
  decentraland = "Decentraland",
  'somnium-space' = "Somnium Space"
}
