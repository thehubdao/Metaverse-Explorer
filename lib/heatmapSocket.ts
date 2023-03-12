import { Metaverse } from "./metaverse"

export const formatLand = (pureLandData: string, metaverse: Metaverse) => {
    const dataArray = pureLandData.split(';')
    const [x, y, eth_predicted_price, floor_adjusted_predicted_price, current_price_eth, tokenId] = dataArray
    let land: any = {
        [metaverse == 'somnium-space' ? 'center' : 'coords']: { x, y },
        eth_predicted_price: Number(eth_predicted_price),
        floor_adjusted_predicted_price: Number(floor_adjusted_predicted_price), tokenId,
        ...(current_price_eth ? { current_price_eth: Number(current_price_eth) } : {})
    }

    if (metaverse == 'somnium-space') {
        const [, , , , , , geometryRawData] = dataArray
        const geometryRawArray = geometryRawData.split('/')
        const geometry = geometryRawArray.map((coords) => {
            const [x, y] = coords.split(':')
            return { x: Number(x), y: Number(y) }
        })
        land.geometry = geometry
    }

    if (metaverse != 'decentraland') return land

    const [, , , , , , type, top, left, topLeft] = dataArray

    land.tile = {
        type,
        ...(top ? { top } : {}),
        ...(left ? { left } : {}),
        ...(topLeft ? { topLeft } : {})

    }

    return land
}