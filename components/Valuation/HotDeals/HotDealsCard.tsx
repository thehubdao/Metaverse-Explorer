import axios from "axios";
import { useEffect, useState } from "react";
import { Metaverse } from "../../../lib/metaverse";
import { useAccount } from "wagmi";
import { IAPIData } from "../../../lib/types";
import { handleLandName } from "../../../lib/valuation/valuationUtils";
import { useAppSelector } from "../../../state/hooks";
import { OptimizedImage } from "../../General";
import CartButton from "../CartButton";
import Tooltip from "@mui/material/Tooltip";

interface Props {
apiData: IAPIData
landCoords?: { x: string | number; y: string | number }
metaverse: Metaverse
name?: string
}

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

const HotDealsCard = ({
    apiData,
    landCoords,
    metaverse,
    name,
}: Props ) => {
    const [watchlist, setWatchlist] = useState<any>()
    const { address } = useAccount()
    const { token }: any = useAppSelector((state) => state.account)

  const getWatchList = async (token: string) => {


    const watchlistRequest = await axios.get(
      `${process.env.ITRM_SERVICE}/watchlistService/getWatchlist?address=${address}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authentication': `${token}`
        }
      }
    )
    const watchlist = watchlistRequest.data
    setWatchlist(watchlist)
  }

  useEffect(() => {
    if (!address) return
    getWatchList(token)
  }, [address])

  console.log(apiData, 'data');
  

  return (
    <>
      {apiData &&
        landCoords && (
          <div className="bg-grey-bone rounded-2xl  flex w-[full] h-[full] shadow-lg">

            <div className='w-full'>
              <div className={`h-fit relative`}>
                <OptimizedImage
                  height={182}
                  width={280}
                  src={apiData.images?.image_url}
                  rounded="xl"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-center relative -top-4">
                <Tooltip title={`${(apiData.gap?.toFixed(2))*(-1)} % Underpriced`} placement="bottom">
                  <p className="w-3/4 font-normal text-sm truncate bg-green-400 text-white rounded-md px-2 py-1">{`${(apiData.gap?.toFixed(2))*(-1)} % Underpriced`}</p>
                </Tooltip>
                </div>
                <Tooltip title={name} placement="bottom">
                  <h3 className="font-semibold text-md truncate" title={name}>
                    {handleLandName(
                      metaverse,
                      {
                        x: landCoords.x,
                        y: landCoords.y,
                      },
                      name ? name : undefined
                    )}
                  </h3>
                </Tooltip>
                <div className="flex items-center justify-center">
                  <p className="text-sm text-grey-icon pt-2">Listed Price: </p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="font-semibold text-sm  truncate">{`${apiData.current_price_eth?.toFixed(2)} ETH`}</p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-sm text-grey-icon ">Estimated Price: </p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="font-semibold text-sm  truncate">{`${apiData.eth_predicted_price?.toFixed(2)} ETH`}</p>
                </div>
                <div className="flex items-center justify-center mt-3">
                  <CartButton />
                </div>

                <div className="flex justify-center my-5 gap-5 font-bold">
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
                  </button>
                </div>
              </div>
            </div>        
          </div>
        )}
    </>
  )
}

export default HotDealsCard