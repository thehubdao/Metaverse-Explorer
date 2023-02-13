export const metaverseObject = {
  sandbox: 'sandbox',
  decentraland: 'decentraland',
/*   'axie-infinity': 'axie-infinity', */
  'somnium-space' : 'somnium-space'

}

export type Metaverse = keyof typeof metaverseObject

type RequiredMetaverse = {
  [metaverse in keyof Metaverse]: Metaverse[metaverse]
}