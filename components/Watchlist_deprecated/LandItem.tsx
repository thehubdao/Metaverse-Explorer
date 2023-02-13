import { useEffect, useState } from 'react'
import { ExternalLink, OptimizedImage, PriceList } from '../General'
import { IPredictions } from '../../lib/types'
import { FiExternalLink } from 'react-icons/fi'
import {
  ICoinPrices,
  IPriceCard,
  SingleLandAPIResponse,
} from '../../lib/valuation/valuationTypes'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import {
  handleLandName,
  handleTokenID,
  convertETHPrediction,
} from '../../lib/valuation/valuationUtils'
import { BsTwitter } from 'react-icons/bs'
import { SocialMediaOptions } from '../../lib/socialMediaOptions'
import { formatName } from '../../lib/utilities'
import { createOpenSeaLink } from '../../backend/services/openSeaDataManager'
import { Metaverse } from '../../lib/metaverse'
interface IWatchListCard {
  land: SingleLandAPIResponse
  landId: string
  metaverse: Metaverse
  remove: (landId: string, metaverse: Metaverse) => Promise<void>
  coinPrices: ICoinPrices
}
const LandItem = ({
  coinPrices,
  land,
  landId,
  metaverse,
  remove,
}: IWatchListCard) => {
  const predictions = convertETHPrediction(
    coinPrices,
    land.eth_predicted_price,
    metaverse
  )
  const openSeaLink = createOpenSeaLink(metaverse, landId)
  const mobile = window.innerWidth < 640
  const [expanded, setExpanded] = useState(mobile)
  const imgSize = mobile ? 170 : expanded ? 170 : 70
  const [prices, setPrices] = useState<Partial<IPredictions>>({
    usdPrediction: predictions?.usdPrediction,
  })

  // SocialMediaOptions contains all options with their texts, icons, etc..
  const options = SocialMediaOptions(landId, metaverse, predictions)

  // Mobile view is always expanded
  const handleExpanded = () => {
    window.innerWidth < 640 ? setExpanded(true) : setExpanded(!expanded)
  }
  const notListed = typeof land.current_price !== 'number'
/*   const isAxie = metaverse === 'axie-infinity' */

  useEffect(() => {
    // Changing the ammount of prices shown depending of expanded state
    if (expanded) {
      setPrices(predictions!)
    } else {
      setPrices({ usdPrediction: predictions?.usdPrediction })
    }
    // Img sizes
    const setSizes = () => {
      const mobile = window.innerWidth < 640
      const between = window.innerWidth < 700
      setExpanded(mobile ? true : between ? false : expanded)
    }
    window.addEventListener('resize', setSizes)

    return () => window.removeEventListener('resize', setSizes)
  }, [expanded])

  return (
    <li
      onClick={handleExpanded}
      className='gray-box p-4 hoverlift hover:bg-opacity-20 flex xs:w-[22rem] sm:w-full sm:flex-row flex-col cursor-pointer text-grey-content font-plus items-start relative justify-between gap-4 sm:gap-0 '
    >
      {/* LEFT */}
      <div className='flex flex-row sm:justify-start gap-4 sm:w-fit w-full  transition-all'>
        {/* Image Link */}
        <a
          href={land.external_link || ''}
          target='_blank'
          className='hover:shadow-dark relative flex'
        >
          <OptimizedImage
            height={imgSize}
            width={imgSize}
            src={land.images.image_url || 'images/mgh_logo.png'}
            rounded='lg'
          />
          <FiExternalLink className='absolute top-0 right-0 text-grey-content font-plus text-xs backdrop-filter backdrop-blur-sm rounded-xl w-6 h-6 p-1' />
        </a>
        {/* Main Land Info */}
        <div className='flex flex-col justify-between'>
          <div>
            <h3 className='text-base sm:text-xl font-normal md:text-2xl p-0 leading-4'>
              {handleLandName(metaverse, land.coords)}
            </h3>
            <p className='text-grey-content font-plus'>
              ID: {handleTokenID(landId)}{' '}
              <BsTwitter
                title='Share Valuation'
                onClick={() => window.open(options.twitter.valuationLink)}
                className=' hidden sm:inline-block relative bottom-[0.17rem] left-1  h-4 w-4 z-50 text-grey-content font-plus hover:text-blue-400 transition ease-in-out duration-300 cursor-pointer'
              />{' '}
            </p>
          </div>
          {expanded && (
            <>
              {/* External Links */}
              <div className='flex flex-col md:gap-4 gap-[1.40rem]'>
                {openSeaLink && (
                  <ExternalLink href={openSeaLink} text='OpenSea' />
                )}
                {land.external_link && (
                  <ExternalLink
                    href={land.external_link}
                    text={formatName(metaverse)}
                  />
                )}
              </div>
              {/* Remove Button */}
              <button
                className='relative transition font-medium  ease-in-out flex gap-1 text-sm hover:text-red-500 text-red-600 z-20'
                onClick={() => remove(landId, metaverse)}
              >
                <span>Remove</span>
                <FaTrash className='relative -bottom-005' />
              </button>
            </>
          )}
        </div>
      </div>
      {/* RIGHT */}
      <div className='transition-all sm:relative static bottom-1'>
        {/* Price List */}
        <PriceList predictions={prices} metaverse={metaverse} />
        {/* Current Listing Price */}
        <p
          className={`text-md text-left sm:text-right pt-2 sm:pt-0  relative left-1 sm:left-0 ${
            !notListed
              ? 'relative top-2 font-medium text-green-500'
              : 'text-gray-400 sm:static'
          }`}
        >
          {notListed
            ? 'Not Listed'
            : `Listed: ${land.current_price?.toFixed(2)} ETH`}
        </p>
      </div>

      {/* Share Button */}
      <BsTwitter
        title='Share Valuation'
        onClick={() => window.open(options.twitter.valuationLink)}
        className='absolute sm:hidden h-5 w-5 z-30 bottom-6 right-4 text-gray-200 hover:text-blue-400 transition ease-in-out duration-300 cursor-pointer'
      />
    </li>
  )
}

export default React.memo(LandItem)
