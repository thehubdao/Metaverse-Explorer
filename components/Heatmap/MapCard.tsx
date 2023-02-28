import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineExpand } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { RiLoader3Fill } from "react-icons/ri";
import { useAccount } from "wagmi";
import { Metaverse } from "../../lib/metaverse";
import { SocialMediaOptions } from "../../lib/socialMediaOptions";
import { IAPIData, IPredictions } from "../../lib/types";
import { getState } from "../../lib/utilities";
import { handleLandName } from "../../lib/valuation/valuationUtils";
import { ValuationState } from "../../pages/valuation";
import { OptimizedImage, PriceList } from "../General";
import { AddToWatchlistButton } from "../Valuation";
import DataComparisonBox from "../Valuation/DataComparison/DataComparisonBox";

interface Props {
  apiData?: IAPIData
  predictions?: IPredictions
  landCoords?: { x: string | number; y: string | number }
  metaverse: Metaverse
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  setOpenSpecificModal: Function
  mapState: ValuationState
  name?: string
  watchlist?: any
}

const MapCard = ({
  apiData,
  predictions,
  landCoords,
  metaverse,
  setIsVisible,
  setOpenSpecificModal,
  mapState,
  name,
}: Props) => {
  const [loadingQuery, loadedQuery, errorQuery] = getState(mapState, [
    'loadingQuery',
    'loadedQuery',
    'errorQuery',
  ])
  const imgSize = 250
  const [watchlist, setWatchlist] = useState<any>()
  const { address } = useAccount()

  const options = SocialMediaOptions(
    apiData?.tokenId,
    apiData?.metaverse,
    predictions
  )

  const metaverseInfo = {
    sandbox: {
      image: '/images/the-sandbox-sand-logo.png',
      label: 'The Sandbox'
    },
    decentraland: {
      image: '/images/decentraland-mana-logo.png',
      label: 'Decentraland'
    },
    "somnium-space": {
      image: '/images/somnium-space-cube-logo.webp',
      label: 'Somnium Space'
    }
  }

  const getWatchList = async () => {
    const watchlistRequest = await axios.get(
      `${process.env.ITRM_SERVICE}/authservice-mgh/watchlistService/getWatchlist?address=${address}`
    )
    const watchlist = watchlistRequest.data
    setWatchlist(watchlist)
  }

  useEffect(() => {
    if (!address) return
    getWatchList()
    console.log(apiData)
  }, [address])


  if (errorQuery) {
    return (
      <div className="z-30">
        <p className="text-lg font-semibold text-center text-grey-content bg-grey-bone rounded-3xl px-5">
          No a Valid Land or not enough Data yet!
        </p>
      </div>
    )
  }

  if (loadingQuery) {
    return (
      <div className="w-70 flex bg-grey-bone rounded-3xl justify-center items-center">
        <p className="text-lg font-semibold text-center text-grey-content">Calculating...</p>
      </div>
    )
  }

  return (
    <>
      {apiData &&
        landCoords && (
          <div className="bg-grey-bone rounded-3xl p-6 flex w-[650px]">
            <div className="absolute right-6 top-6 flex gap-3">
              {/* Twitter button */}
              <div
                className="rounded-lg nm-flat-medium p-2 hover:nm-flat-soft hover:text-blue-500 transition duration-300 ease-in-out"
              >
                <BsTwitter
                  title="Share Valuation"
                  onClick={() =>
                    window.open(
                      options.twitter
                        .valuationLink
                    )
                  }
                  className="text-xl text-grey-conten"
                />
              </div>
              {/* Open specific asset modal button */}
              <div
                className="rounded-lg nm-flat-medium p-2 hover:nm-flat-soft hover:text-yellow-500 transition duration-300 ease-in-out"
                onClick={() => { setOpenSpecificModal(true) }}
              >
                <AiOutlineExpand className="text-xl text-grey-conten" />
              </div>
              {/* Close button */}
              <div
                className="rounded-lg nm-flat-medium p-2 hover:nm-flat-soft hover:text-red-500 transition duration-300 ease-in-out"
                onClick={() => setIsVisible(false)}
              >
                <IoClose className="text-xl text-grey-conten" />
              </div>
            </div>

            <div className='w-full max-w-[250px] mr-6'>
              <div className={`h-fit relative`}>
                <OptimizedImage
                  height={imgSize}
                  width={imgSize}
                  src={apiData.images?.image_url}
                  rounded="xl"
                />
                <div className='absolute bottom-4 left-3 bg-grey-panel rounded-full flex justify-center items-center p-1'>
                  <OptimizedImage
                    src={metaverseInfo[metaverse].image}
                    width={40}
                    height={40}
                    rounded={"full"}

                  />
                </div>
              </div>
              <p className="text-center text-grey-icon font-normal text-sm">what you think of this price estimation?</p>
              <div className="flex justify-between py-3 gap-1">
                <button className="bg-[#1AB3F3] text-white rounded-lg text-xs p-2 w-full">
                  Perfect
                </button>
                <button className="bg-[#FF4949] text-white rounded-lg text-xs p-2 w-full">
                  Overvalued
                </button>
                <button className="bg-[#47E298] text-white rounded-lg text-xs p-2 w-full">
                  Undervalued
                </button>
              </div>
              {/* Add To Watchlist Button */}
              {(address &&
                watchlist &&
                watchlist[metaverse] &&
                watchlist[metaverse][apiData?.tokenId] && (
                  <p>Land in watchlist</p>
                )) ||
                (address && watchlist && (
                  <div onClick={() => getWatchList()}><AddToWatchlistButton
                    land={apiData}
                    metaverse={apiData.metaverse}
                  /></div>

                ))}
            </div>
            <div className="flex flex-col justify-between">
              <h3 className="font-semibold text-2xl pt-10">
                {handleLandName(
                  metaverse,
                  {
                    x: landCoords.x,
                    y: landCoords.y,
                  },
                  name ? name : undefined
                )}
              </h3>
              <div>
                <p className="text-sm text-grey-icon">Our Price Estimation:</p>
                {/* Price List */}
                {predictions ? (
                  <div className="w-fit">
                    <PriceList
                      metaverse={metaverse}
                      predictions={predictions}
                    />
                  </div>
                ) : (
                  <span className="flex gap-2 text-lg">
                    Fetching Predictions
                    <RiLoader3Fill className="animate-spin-slow h-5 w-5 xs:h-6 xs:w-6" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm text-grey-icon">Listing price: </p>
                <DataComparisonBox
                  currentPriceEth={apiData.current_price_eth}
                  predictions={predictions}
                />
              </div>
              <div>
                <p className="text-sm text-grey-icon">Find land on:</p>
                <div className="flex gap-5 font-bold">
                  <button
                    onClick={() => { window.open(apiData.external_link) }}
                    className="flex justify-center gap-1"
                  >
                    <OptimizedImage
                      src={metaverseInfo[metaverse].image}
                      width={20}
                      height={20}
                      rounded={"full"}
                    />
                    {metaverseInfo[metaverse].label}
                  </button>
                  <button
                    onClick={() => { window.open(apiData.market_links.opensea) }}
                    className="flex justify-center gap-1"
                  >
                    <OptimizedImage
                      src="/images/icons/markets/opensea.svg"
                      width={20}
                      height={20}
                      rounded={"full"}
                    />
                    OpenSea
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default MapCard