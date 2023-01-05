import axios from 'axios'
import { formatEther } from 'ethers/lib/utils'
import { Metaverse } from '../metaverse'
import { IAPIData } from '../types'
import { ellipseAddress } from '../utilities'
import { ICoinPrices, IPriceCard, LandListAPIResponse } from './valuationTypes'

const metaverseFormats = {
    sandbox: 'the-sandbox',
    decentraland: 'decentraland',
    'axie-infinity': 'axie-infinity',
    'somnium-space': 'somnium-space-cubes',
}

export const metaverseInitialCenter = {
    sandbox: {
        maxX: 0,
        maxY: 0,
        minX: 0,
        minY: 0,
        initialX: 62,
        initialY: 204,
    },
    decentraland: {
        maxX: 0,
        maxY: 0,
        minX: 0,
        minY: 0,
        initialX: 0,
        initialY: 0,
    },
    'axie-infinity': {
        maxX: 0,
        maxY: 0,
        minX: 0,
        minY: 0,
        initialX: -80,
        initialY: 80,
    },
    'somnium-space': {
        maxX: 0,
        maxY: 0,
        minX: 0,
        minY: 0,
        initialX: 0,
        initialY: 0,
    }
}

export const convertETHPrediction = (
    coinPrices: ICoinPrices,
    ethPrediction: number = 0,
    metaverse: Metaverse
) => {
    const ethUSD = coinPrices.ethereum.usd
    const usdPrediction = ethPrediction * ethUSD
    const formattedMetaverse =
        metaverse === 'sandbox'
            ? 'the-sandbox'
            : metaverse === 'somnium-space'
                ? 'somnium-space-cubes'
                : metaverse
    const metaverseUSD = coinPrices[formattedMetaverse].usd
    const metaversePrediction = usdPrediction / metaverseUSD

    return { ethPrediction, usdPrediction, metaversePrediction }
}

// Get Data for Single Land Asset
export const getLandData = async (
    metaverse: Metaverse,
    tokenID?: string,
    coordinates?: { X?: string | number; Y?: string | number }
) => {
    try {
        const predictionRes = await fetch('/api/getLandData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tokenID: tokenID,
                X: coordinates?.X,
                Y: coordinates?.Y,
                metaverse: metaverse,
            }),
        })
        const data = await predictionRes.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

/* Formatting a Land Asset received from OpenSea into our Cards.
 The asset: any comes from the OpenSea API*/
export const formatLandAsset = async (
    assetId: any,
    coinPrices: ICoinPrices,
    metaverse: Metaverse
) => {
    const apiData: IAPIData = await getLandData(metaverse, assetId)
    const formattedAsset = {
        apiData: apiData,
        showCard: true,
        processing: false,
    }

    Object.defineProperty(formattedAsset, 'predictions', {
        value: convertETHPrediction(
            coinPrices,
            apiData.prices!.eth_predicted_price,
            metaverse
        ),
    })

    return formattedAsset as IPriceCard
}

// Formatting Token Id if its too long
export const handleTokenID = (tokenID: string) => {
    if (tokenID.toString().length > 6) {
        return ellipseAddress(tokenID.toString(), 3)
    } else {
        return tokenID
    }
}

// Formatting Land Name if its too long or missing (Custom land names in decentraland..)
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

/**
 * @param listings Array of listing objects from each OpenSea Asset
 * @returns current price for asset
 */
export function getCurrentPrice(listings: any[] | undefined) {
    if (!listings || !listings[0]) return NaN
    const listing = listings[0]
    if (listing.payment_token_contract.symbol === 'USDC')
        return (
            (listing.current_price / 1e6) *
            listing.payment_token_contract.eth_price
        )
    if (listing.payment_token_contract.symbol === 'SAND')
        return (
            (listing.current_price / 1e18) *
            3 *
            listing.payment_token_contract.eth_price
        )
    return (
        (listing.current_price / 1e18) *
        listing.payment_token_contract.eth_price
    )
}

// Axie Has its own Marketplace.

export const getAxieLandData = async (x: number, y: number) => {
    const res = await fetch(
        'https://graphql-gateway.axieinfinity.com/graphql',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                operationName: 'GetLandDetail',
                variables: {
                    col: x,
                    row: y,
                },
                query: 'query GetLandDetail($col: Int!, $row: Int!) {\n  land(col: $col, row: $row) {\n    ...LandDetail\n    __typename\n  }\n}\n\nfragment LandDetail on LandPlot {\n  tokenId\n  owner\n  ownerProfile {\n    name\n    __typename\n  }\n  landType\n  row\n  col\n  auction {\n    ...AxieAuction\n    __typename\n  }\n  __typename\n}\n\nfragment AxieAuction on Auction {\n  startingPrice\n  endingPrice\n  startingTimestamp\n  endingTimestamp\n  duration\n  timeLeft\n  currentPrice\n  currentPriceUSD\n  suggestedPrice\n  seller\n  listingIndex\n  state\n  __typename\n}\n',
            }),
        }
    )
    const jsonRes = await res.json()
    return jsonRes.data.land
}

export const getAxieFloorPrice = async () => {
    const res = await fetch(
        'https://graphql-gateway.axieinfinity.com/graphql',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "operationName": "GetLandsGrid",
                "variables": {
                    "from": 0,
                    "size": 1,
                    "sort": "PriceAsc",
                    "auctionType": "Sale",
                    "criteria": {}
                },
                "query": "query GetLandsGrid($from: Int!, $size: Int!, $sort: SortBy!, $owner: String, $criteria: LandSearchCriteria, $auctionType: AuctionType) {\n  lands(criteria: $criteria, from: $from, size: $size, sort: $sort, owner: $owner, auctionType: $auctionType) {\n    total\n    results {\n      ...LandBriefV2\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment LandBriefV2 on LandPlot {\n  tokenId\n  owner\n  landType\n  row\n  col\n  auction {\n    currentPrice\n    startingTimestamp\n    currentPriceUSD\n    __typename\n  }\n  ownerProfile {\n    name\n    __typename\n  }\n  __typename\n}\n"

            }),
        }
    )
    const floorPrice = await res.json()
    console.log(floorPrice)
    return formatEther(floorPrice.data.lands.results[0].auction.currentPrice)
}

export const getSomniumSpaceFloorPrice = async () => {
    let res = { value: 0 }
    await axios
        .get(process.env.ITRM_SERVICE + '/val-analytics/generalFloorPrice', {
            params: { metaverse: 'somnium-space' },
        })
        .then((response) => {
            res = response.data
        }).catch((error) => { console.log(error) })
    const floorPrice = res.value
    return formatEther(floorPrice)

}

export const getAxieDailyTradeVolume = async () => {
    const res = await fetch(
        'https://graphql-gateway.axieinfinity.com/graphql',
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                operationName: 'GetOverviewToday',
                query: 'query GetOverviewToday {\n  marketStats {\n    last24Hours {\n      ...OverviewFragment\n      __typename\n    }\n  }\n}\n\nfragment OverviewFragment on SettlementStats {\n  count\n  axieCount\n  volume\n  volumeUsd\n  __typename\n}\n',
            }),
        }
    )
    const dailyVolume = await res.json()
    return formatEther(dailyVolume.data.marketStats.last24Hours.volume)
}

export const fetchLandList = async (metaverse: Metaverse, lands: string[]) => {
    let link = `${process.env.ITRM_SERVICE}${metaverse == "somnium-space" || /* metaverse == "axie-infinity"  */ false ? "" : "/test"}/${metaverse}/${/* metaverse == "axie-infinity"  */ false ? "predict" : "map"}?tokenId=`
    lands.forEach((land, i) => {
        link = link + land + (i !== lands.length - 1 ? ',' : '')
    })
    const res = await fetch(link)
    return (await res.json()) as LandListAPIResponse
}

export const getFloorPriceByItrm = async (metaverse: Metaverse) => {
    const res = await fetch(process.env.ITRM_SERVICE + '/val-analytics/generalFloorPrice?metaverse=' + metaverse)
    const floorPrice = await res.json()
    console.log(floorPrice)
    return floorPrice.value
}