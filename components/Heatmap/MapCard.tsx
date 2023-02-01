import { RiLoader3Fill } from 'react-icons/ri'
import { ExternalLink, OptimizedImage, PriceList } from '../General'
import { IAPIData, IPredictions } from '../../lib/types'
import { FiExternalLink } from 'react-icons/fi'
import React from 'react'
import { handleLandName } from '../../lib/valuation/valuationUtils'
import { BsTwitter } from 'react-icons/bs'
import Loader from '../Loader'
import { formatName, getState } from '../../lib/utilities'
import { AddToWatchlistButton, LandLikeBox } from '../Valuation'
import { useAppSelector } from '../../state/hooks'
import { IoClose } from 'react-icons/io5'
import { ValuationState } from '../../pages/valuation'
import { SocialMediaOptions } from '../../lib/socialMediaOptions'
import DataComparisonBox from '../Valuation/DataComparison/DataComparisonBox'
import { Metaverse } from '../../lib/metaverse'
import { TopSellingDataTable } from '../../types/TopSelling'
interface Props {
  apiData?: IAPIData
  predictions?: IPredictions
  landCoords?: { x: string | number; y: string | number }
  metaverse: Metaverse
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  mapState: ValuationState,
  name?: string
}

const getExternalLink = (metaverse: Metaverse, dataTable: IAPIData) => {
  return metaverse === 'somnium-space' ? ("https://somniumspace.com/parcel/" + dataTable.tokenId) : dataTable.external_link
}

const MapCard = ({
  apiData,
  predictions,
  landCoords,
  metaverse,
  setIsVisible,
  mapState,
  name
}: Props) => {
  const imgSize = 150
  const [loadingQuery, loadedQuery, errorQuery] = getState(mapState, [
    'loadingQuery',
    'loadedQuery',
    'errorQuery',
  ])

  const { address } = useAppSelector((state) => state.account)
  const options = SocialMediaOptions(
    apiData?.tokenId,
    apiData?.metaverse,
    predictions
  )

  return errorQuery ? (
    <div className='gray-box bg-opacity-100 z-30'>
      <p className='text-lg font-semibold font-plus text-center text-grey-content'>
        No a Valid Land or not enough Data yet!
      </p>
    </div>
  ) : (
    <div className='gray-box scale-90 p-2 flex flex-col cursor-pointer max-w-sm font-plus text-grey-content items-start justify-between gap-2 bg-opacity-100 relative z-30 bg-grey-bone rounded-xl shadow-2xl'>
      {loadingQuery ? (
        <div className='w-full flex flex-col gap-14 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
          <Loader />
          <p className='text-lg font-semibold text-center text-grey-content'>
            Calculating
          </p>
        </div>
      ) : (
        loadedQuery &&
        apiData &&
        landCoords && (
          <>
            <IoClose
              className='absolute top-0.5 right-0.5 text-xl text-grey-content hover:text-red-500 bg-transparent transition-all '
              onClick={() => setIsVisible(false)}
            />
            {/* /* LEFT */}
            <div className='flex flex-row gap-4 w-full'>
              {/* Image Link */}
              <a
                href={apiData.external_link}
                target='_blank'
                className='hover:shadow-dark relative flex font-plus'
              >
                <OptimizedImage
                  height={imgSize}
                  width={imgSize}
                  src={apiData.images?.image_url}
                  rounded='lg'
                />
                <FiExternalLink className='absolute top-0 right-0 text-grey-content text-xs backdrop-filter backdrop-blur-sm rounded-xl w-6 h-6 p-1' />
              </a>
              {/* Main Land Info */}
              <div className='flex flex-col justify-between'>
                <div>
                  <h3 className='text-base font-normal md:text-xl pt-2.5 leading-4'>
                    {handleLandName(metaverse, {
                      x: landCoords.x,
                      y: landCoords.y
                    }, name ? name : undefined)}
                  </h3>
                  <p className='text-gray-400'>
                    {/* ID: {handleTokenID(apiData.tokenId)}{' '} */}
                    <BsTwitter
                      title='Share Valuation'
                      onClick={() => window.open(options.twitter.valuationLink)}
                      className=' hidden relative bottom-[0.17rem] left-1  h-4 w-4 z-50 text-grey-content hover:text-blue-400 transition ease-in-out duration-300 cursor-pointer'
                    />{' '}
                  </p>
                </div>
                {/* Add To Watchlist Button */}
                {address && (
                  <AddToWatchlistButton
                    landId={apiData.tokenId}
                    metaverse={apiData.metaverse}
                  />
                )}
                {/* External Links */}
                <nav className='flex flex-col md:gap-1 pb-1 pt-2 gap-[1.0rem] text-grey-content'>
                  {apiData.market_links.opensea&& (
                    <ExternalLink href={apiData.market_links.opensea} text='OpenSea' />
                  )}
                  <ExternalLink
                    href={getExternalLink(metaverse, apiData)}
                    text={formatName(metaverse)}
                  />
                </nav>
              </div>
            </div>
            {/* /* RIGHT */}
            <div className='transition-all static bottom-1'>
              {/* Price List */}
              {predictions ? (
                <PriceList metaverse={metaverse} predictions={predictions} />
              ) : errorQuery ? (
                <span>Not enough Data.</span>
              ) : (
                <span className='flex gap-2 text-lg'>
                  Fetching Predictions
                  <RiLoader3Fill className='animate-spin-slow h-5 w-5 xs:h-6 xs:w-6' />
                </span>
              )}
              <DataComparisonBox
                currentPriceEth={apiData.current_price_eth}
                predictions={predictions}
              />
            </div>

            {/* Likes */}
            <div className='flex flex-start w-full'>
              <LandLikeBox
                landId={apiData.tokenId}
                metaverse={apiData.metaverse}
                twitterLink={options.twitter.valuationLink}
              />
            </div>
          </>
        )
      )}
    </div>
  )
}

export default React.memo(MapCard)
