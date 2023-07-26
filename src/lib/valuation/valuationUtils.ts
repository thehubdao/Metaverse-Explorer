import { Metaverse } from '../metaverse'
import { ICoinPrices, LandListAPIResponse } from './valuationTypes'

export const convertETHPrediction = (
    coinPrices: ICoinPrices,
    ethPrediction = 0,
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

export const fetchLandList = async (metaverse: Metaverse, lands: string[]) => {
    let link = ''
    if (metaverse === 'sandbox') {
        // We use itrm V1 service for Sandbox (upgrade to version 2 when it is ready from ITRM).
        link = `${process.env.ITRM_SERVICE??""}/test/${metaverse}/map?tokenId=`
    } else {
        // For Decentraland and Somnium space if we use version 2 of the service.
        link = `${process.env.ITRM_SERVICE??""}/mgh/v2/${metaverse}/map?tokenId=`
    } lands.forEach((land, i) => { link = link + land + (i !== lands.length - 1 ? ',' : '') })
    const res = await fetch(link)
    return (await res.json()) as LandListAPIResponse
}