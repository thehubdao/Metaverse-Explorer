import {
    ICoinPrices,
    IPriceCard,
    SingleLandAPIResponse,
} from '../../lib/valuation/valuationTypes'
import { BsTwitter } from 'react-icons/bs'
import { SocialMediaOptions } from '../../lib/socialMediaOptions'
import { convertETHPrediction } from '../../lib/valuation/valuationUtils'
import { Metaverse } from '../../lib/metaverse'
import { useAppSelector } from '../../state/hooks'
import { createOpenSeaLink } from '../../backend/services/openSeaDataManager'

import {
    handleLandName,
    handleTokenID,
} from '../../lib/valuation/valuationUtils'
import { formatName } from '../../lib/utilities'
import ExternalAssetLink from '../General/Links/ExternalAssetLink'
import { FaTrash } from 'react-icons/fa'

interface Props {
    land: any
    landId: string
    metaverse: Metaverse
    onTrashClick: any
}

const Land = ({ land, landId, metaverse, onTrashClick }: Props) => {
    /*   const predictions = convertETHPrediction(
    prices,
    land.eth_predicted_price,
    metaverse
  ) */

    const openSeaLink = createOpenSeaLink(metaverse, landId)

    // SocialMediaOptions contains all options with their texts, icons, etc..
    /*   const options = SocialMediaOptions(landId, metaverse, predictions, address) */
    return (
        <div className="flex justify-between relative nm-flat-medium rounded-lg bg-grey-bone space-x-3 min-w-max hover:nm-flat-soft cursor-pointer">
            {/* LEFT/TOP */}
            <ExternalAssetLink
                metaverse={metaverse}
                land={land}
            />
            {/* RIGHT/BOTTOM - PriceList */}
            <div className="p-4 pr-7">
                {/* Links and Info */}
                <div className="flex flex-col gap-6 md:gap-3">
                    {/* Name and Id */}
                    <div>
                        {/* Asset Name */}
                        <h3 className="text-base xs:text-xl  2xl:text-2xl lg:text-2xl md:text-lg text-gray-400 min-w-max">
                            {land.coords &&
                                handleLandName(metaverse, land.coords)}
                        </h3>
                        {/* Asset ID */}
                        <p className="text-xs font-medium text-grey-content">
                            Token ID: {handleTokenID(landId)}
                        </p>
                    </div>
                </div>
                <h4 className="border-none text-gray-400 text-sm pt-4">
                    Price Estimation:
                </h4>
                {/*        <PriceListSmall predictions={predictions} metaverse={metaverse} /> */}

                {/* External Links */}
                <div className="flex flex-col lg:flex-row gap-5 lg:items-center justify-start pt-4">
                    {/* {openSeaLink && <ExternalLink href={openSeaLink} text='OpenSea' />} */}
                    {/* <ExternalLink
            href={land.external_link || ''}
            text={formatName(metaverse)}
          /> */}
                    {openSeaLink && (
                        <img
                            onClick={() => window.open(openSeaLink)}
                            src="/images/opensea-logo.png"
                            className="grayscale h-5 w-5 hover:grayscale-0 cursor-pointer"
                        />
                    )}
                </div>
            </div>
            <button
                onClick={() => onTrashClick(land, metaverse)}
                className="relative transition font-medium  ease-in-out flex gap-1 text-sm hover:text-red-400 text-red-800 z-20 top-[119px] -left-[18px]"
            >
                <FaTrash className="relative -bottom-005" />
            </button>
        </div>
    )
}

export default Land
