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
import { PriceListSmall } from '../General'

interface Props {
    land: any
    landId: string
    metaverse: Metaverse
    onTrashClick?: any
    prices: ICoinPrices
}

const Land = ({ land, landId, metaverse, onTrashClick, prices }: Props) => {

    const { address } = useAppSelector((state) => state.account)

    const predictions = convertETHPrediction(
        prices,
        land.eth_predicted_price,
        metaverse
    ) 

    const openSeaLink = createOpenSeaLink(metaverse, landId)

    // SocialMediaOptions contains all options with their texts, icons, etc..
    const options = SocialMediaOptions(landId, metaverse, predictions, address)
    return (
        <div className="flex justify-between relative nm-flat-medium rounded-2xl bg-grey-bone space-x-3 w-[520px] h-[300px] hover:nm-flat-soft cursor-pointer overflow-hidden">
            {/* LEFT/TOP */}
            <ExternalAssetLink
                metaverse={metaverse}
                land={land}
            />
            {/* RIGHT/BOTTOM - PriceList */}
            <div className="p-4 pr-7 w-[50%] flex flex-col justify-between">
                {/* Links and Info */}
                <div>
                    <div className="flex flex-col gap-6 md:gap-3">
                        {/* Name and Id */}
                        <div>
                            {/* Asset Name */}
                            <h3 className="text-base xs:text-xl  2xl:text-2xl lg:text-2xl md:text-lg text-gray-400 truncate" title={metaverse === 'somnium-space'? handleLandName(metaverse, land.center) : handleLandName(metaverse, land.coords)}>
                                {metaverse === 'somnium-space'?  land.center &&
                                    handleLandName(metaverse, land.center) : land.coords &&
                                    handleLandName(metaverse, land.coords)}
                            </h3>
                            {/* Asset ID */}
                            <p className="text-base font-medium text-grey-content">
                                Token ID: {handleTokenID(landId)}
                            </p>
                        </div>
                    </div>
                    <h4 className="border-none text-gray-400 text-sm pt-4">
                        Price Estimation:
                    </h4>
                </div>
                       <PriceListSmall predictions={predictions} metaverse={metaverse} />

                {/* External Links */}
                <div className="flex flex-col lg:flex-row gap-5 lg:items-center justify-between pt-4">
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
                    <button
                        onClick={() => onTrashClick(land, metaverse)}
                        className="relative transition font-medium  ease-in-out flex gap-1 text-sm hover:text-red-400 text-red-800"
                    >
                        <FaTrash className="relative -bottom-005" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Land
