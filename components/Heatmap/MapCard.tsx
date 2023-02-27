import axios from "axios";
import { useEffect, useState } from "react";
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
import DataComparisonBox from "../Valuation/DataComparison/DataComparisonBox";

interface Props {
  apiData?: IAPIData
  predictions?: IPredictions
  landCoords?: { x: string | number; y: string | number }
  metaverse: Metaverse
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
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
  mapState,
  name,
}: Props) => {
  const [loadingQuery, loadedQuery, errorQuery] = getState(mapState, [
    'loadingQuery',
    'loadedQuery',
    'errorQuery',
  ])
  const imgSize = 220
  const [watchlist, setWatchlist] = useState<any>()
  const { address } = useAccount()
  const options = SocialMediaOptions(
    apiData?.tokenId,
    apiData?.metaverse,
    predictions
  )

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
            {/* Close button */}
            <div
              className="absolute right-4 top-4 rounded nm-flat-medium p-2 hover:nm-flat-soft hover:text-red-500 transition duration-300 ease-in-out"
              onClick={() => setIsVisible(false)}
            >
              <IoClose
                className="text-xl text-grey-conten"

              />

            </div>

            <div className='max-w-[220px] mr-6'>
              <OptimizedImage
                height={imgSize}
                width={imgSize}
                src={apiData.images?.image_url}
                rounded="xl"
              />
              <p className="text-center text-grey-icon font-semibold text-sm">Lets us know what you think of this price estimation:</p>
              <div className="flex justify-between py-3">
                <button className="bg-grey-panel rounded-xl w-11 h-11">
                  1
                </button>
                <button className="bg-grey-panel rounded-xl w-11 h-11">
                  1
                </button>
                <button className="bg-grey-panel rounded-xl w-11 h-11">
                  1
                </button>
                <button className="bg-grey-panel rounded-xl w-11 h-11">
                  1
                </button>
              </div>
              <button
                className="w-full text-center text-xs text-white bg-grey-content py-3 rounded-2xl"
              >ADD TO WATCHLIST</button>
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
                <p className="text-sm text-grey-icon">Estimated Price:</p>
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
                <div className="flex gap-5">
                  <button>Sandbox</button>
                  <button>OpenSea</button>
                  <button>Other</button>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default MapCard