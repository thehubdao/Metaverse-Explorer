import { Layer } from './heatmapCommonTypes'
import {
    DECENTRALAND_API_COLORS,
    LEGEND_COLORS,
    FILTER_COLORS,
    getTileColor,
} from './valuationColoring'

export const filteredLayer: Layer = (
    x,
    y,
    mapFilter,
    percentFilter,
    legendFilter,
    land
) => {
    if (new Set([5, 6, 7, 8, 12]).has(Number(land?.tile?.type)))
        return decentralandAPILayer(x, y, land)
    /* Don't show a layer if user is tier0 and metaverse is decentraland. (we already have decentralands Map for that)  */
    let color!: string
    const scaleOptions = {
        big: 1.4,
        mid: 1.2,
        base: 1,
    }
    let scale!: number
    // If the legend filter is on Sale (the one on the bottom right)

    if (legendFilter === 'on-sale') {
        // If land is on sale (therefore having the current_price_eth)
        land.current_price_eth
            ? mapFilter === 'basic' // If map filter is basic
                ? (color = LEGEND_COLORS['on-sale']) // If filter is basic then return color purple
                : // If filter is not basic, it means we should calculate color based on percetage with getTileColor()
                (color = getTileColor(
                    land.percent ?? 0,
                    percentFilter,
                    mapFilter
                ))
            : (color = FILTER_COLORS[0]) // if land is not on sale make color to gray

        // If legend filter on bottom right is set on watchlist
    }
    else if (legendFilter === 'premium-lands') {
        if (land?.land_type == 1) {
            color = LEGEND_COLORS['premium-lands']
        } else { color = FILTER_COLORS[0] }
    } else if (legendFilter === 'watchlist') {
        //if the land is on users watchlist it will have a .watchlist attribute
        land.watchlist
            ? mapFilter === 'basic'
                ? // If its in users watchlist and the filter is basic change color to fixed color and scale to big
                (color = LEGEND_COLORS.watchlist) &&
                (scale = scaleOptions.big)
                : // If its in users watchlist and filter is not basic then generate a proper color and set scale to big.
                (color = getTileColor(
                    land.percent ?? 0,
                    percentFilter,
                    mapFilter
                )) && (scale = scaleOptions.big)
            : // If its not on users watchlist set color to gray
            (color = FILTER_COLORS[0])
        // If legend filter on bottom right is on portfolio
    } else if (legendFilter === 'portfolio') {
        // If its on users portolio the land will have a .portfolio
        land.portfolio
            ? mapFilter === 'basic'
                ? // if on our portfolio and filter basic, set color to fixed color and scale to big
                (color = LEGEND_COLORS.portfolio) &&
                (scale = scaleOptions.big)
                : // if on our portfolio but filter is not basic then generate proper color
                (color = getTileColor(
                    land.percent ?? 0,
                    percentFilter,
                    mapFilter
                )) && (scale = scaleOptions.big)
            : (color = FILTER_COLORS[0])
        // If there's no legend filter and mapFilter is on basic
    } else if (mapFilter === 'basic') {
        // If we are on decentraland and we land isnt on sale or on watchlist or on portfolio then return null
        if (land?.portfolio) {
            color = LEGEND_COLORS.portfolio
            scale = scaleOptions.mid
            // if mapFilter is basic and land is on watchlist set color to fixed color and scale to mid
        } else if (land?.watchlist) {
            color = LEGEND_COLORS.watchlist
            scale = scaleOptions.mid
            // if mapFilter is basic and land is on sale set color to fixed color and scale to mid
        } else if (land?.current_price_eth) {
            // color = LEGEND_COLORS['on-sale']
            // console.log(land, 'land in layer??');
            // console.log(land.current_price_eth, 'qweqwe');
            
            color = '#FF33FF'
        } else if (land?.land_type == 1) {
            color = LEGEND_COLORS['premium-lands']
        }

        else {
            color = land.tile?.type ? '#19202A' : '#7EFDE4' //'#26EC75' // Green color for basic view with no filters and lands that are not on sale or watchlist or portfolio
        }
        // If there is no legend filter. And mapFilter is not on basic then generate a color based on percentage.
    } else {
        //console.log(land.percent)
        color = getTileColor(land.percent ?? 0, percentFilter, mapFilter)
    }
    const top = undefined
    const left = undefined
    const topLeft = undefined
    return {
        scale,
        color,
        top,
        left,
        topLeft,
    }
}

export const decentralandAPILayer = (x: any, y: any, land: any) => {
    const id = x + ',' + y
    const tile = land
    const color = DECENTRALAND_API_COLORS[tile.tile.type]

    const top = !!tile.top
    const left = !!tile.left
    const topLeft = !!tile.topLeft

    return {
        color,
        top,
        left,
        topLeft,
    }
}
