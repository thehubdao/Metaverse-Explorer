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
  const imgSize = 200
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
          <div className="bg-grey-bone rounded-3xl p-3 flex">
            {/* Close button */}
            <IoClose
              className="absolute top-0.5 right-0.5 text-xl text-grey-content hover:text-red-500 bg-transparent transition-all "
              onClick={() => setIsVisible(false)}
            />
            <div className=''>
              <OptimizedImage
                height={imgSize}
                width={imgSize}
                src={apiData.images?.image_url}
                rounded="xl"
              />
              <p>Lets us know what you think of this price estimation:</p>
              <div></div>
              <button>ADD TO WATCHLIST</button>
            </div>
            <div>
              <h3 className="text-base font-normal md:text-xl pt-2.5 leading-4">
                {handleLandName(
                  metaverse,
                  {
                    x: landCoords.x,
                    y: landCoords.y,
                  },
                  name ? name : undefined
                )}
              </h3>
              <p>Estimated Price:</p>
              {/* Price List */}
              {predictions ? (
                <PriceList
                  metaverse={metaverse}
                  predictions={predictions}
                />
              ) : (
                <span className="flex gap-2 text-lg">
                  Fetching Predictions
                  <RiLoader3Fill className="animate-spin-slow h-5 w-5 xs:h-6 xs:w-6" />
                </span>
              )}
            </div>
          </div>
        )}
    </>
  )
}

export default MapCard