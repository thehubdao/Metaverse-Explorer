import { Metaverse } from "./metaverse"


export const handleLandName = (
    metaverse: Metaverse,
    coords: { x: number | string; y: number | string },
    landName?: string
) => {
    const options = {
        sandbox: 'Land',
        decentraland: 'Parcel',
        'axie-infinity': 'Plot',
        'somnium-space': 'Cube',
    }
    if (!landName) return `${options[metaverse]} ${coords.x}, ${coords.y}`
    if (metaverse === 'decentraland') {
        return `${options[metaverse]} (${coords.x}, ${coords.y})`
    } else {
        return landName
    }
}