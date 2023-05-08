import { Alert, Snackbar, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { AiFillHeart, AiFillQuestionCircle, AiOutlineExpand } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { RiLoader3Fill } from "react-icons/ri";
import { useAccount } from "wagmi";
import { Metaverse } from "../../lib/metaverse";
import { SocialMediaOptions } from "../../lib/socialMediaOptions";
import { IAPIData, IPredictions } from "../../lib/types";
import { getState } from "../../lib/utilities";
import { handleLandName } from "../../lib/valuation/valuationUtils";
import { ValuationState } from "../../pages/metaverseexplorer";
import { useAppSelector } from "../../state/hooks";
import { OptimizedImage, PriceList } from "../General";
import DataComparisonBox from "../Valuation/DataComparison/DataComparisonBox";
import WatchlistButton from "../Valuation/WatchlistButton";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../state/shopCartList";
import CartButton from "../Valuation/CartButton";

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

const FeedbackButtons = () => {
  const [openAlert, setOpenAlert] = useState(false)
  const handleFeedback = () => {
    setOpenAlert(true)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenAlert(false);
  };

  return (
    <>
      <p className="text-center text-grey-icon font-normal text-sm">Do you like this price estimation?</p>
      <div className="flex justify-between py-3 gap-1">
        <button className="bg-[#1AB3F3] text-white rounded-lg text-xs p-2 w-full" onClick={() => handleFeedback()}>
          Perfect
        </button>
        <button className="bg-[#FF4949] text-white rounded-lg text-xs p-2 w-full" onClick={() => handleFeedback()}>
          Overvalued
        </button>
        <button className="bg-[#47E298] text-white rounded-lg text-xs p-2 w-full" onClick={() => handleFeedback()}>
          Undervalued
        </button>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity="info"
            sx={{ width: '100%' }}
            icon={<AiFillHeart />}
          >
            Thanks for your feedback
          </Alert>
        </Snackbar>
      </div>
    </>
  )
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
  const dispatch = useDispatch();
  const [loadingQuery, loadedQuery, errorQuery] = getState(mapState, [
    'loadingQuery',
    'loadedQuery',
    'errorQuery',
  ])
  const imgSize = 250
  const { address } = useAccount()

  // Shop Cart List controller
  const shopList = useSelector((state: any) => state.shopCartList)
  const [isOnShopCartList, setIsOnListSection] = useState<boolean>()

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

  useEffect(() => {
    const isOnShopCartListAux: boolean = shopList.list.find((land: any) => (land.tokenId === apiData?.tokenId && land.metaverse === apiData?.metaverse))
    setIsOnListSection(isOnShopCartListAux)
  }, [shopList.length, apiData])

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
              <div className="rounded-lg nm-flat-medium p-2 hover:nm-flat-soft hover:text-blue-500 transition duration-300 ease-in-out cursor-pointer">
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
                className="w-9 h-9 rounded-lg nm-flat-medium p-2 hover:nm-flat-soft hover:text-yellow-500 transition duration-300 ease-in-out flex justify-center items-center hover:text-xl cursor-pointer"
                onClick={() => { setOpenSpecificModal(true) }}
              >
                <AiOutlineExpand className="text-grey-conten" />
              </div>
              {/* Close button */}
              <div
                className="rounded-lg nm-flat-medium p-2 hover:nm-flat-soft hover:text-red-500 transition duration-300 ease-in-out cursor-pointer"
                onClick={() => setIsVisible(false)}
              >
                <IoClose className="text-xl text-grey-conten" />
              </div>
            </div>

            <div className='w-full max-w-[250px] mr-6'>
              <div className={`h-fit relative`}>
                <OptimizedImage
                  height={imgSize * 3 / 4}
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
              <FeedbackButtons />

              {/* Add To Watchlist Button */}
              <WatchlistButton land={apiData} />
              {/* Add to Cart Button */}
              {apiData.current_price_eth ? (
                <CartButton landData={apiData} classname="mt-3 font-bold py-3" textSize="sm" />
              ) : (
                <button className={`nm-flat-soft text-black w-full rounded-2xl py-3 mt-2 transition duration-300 ease-in-out text-sm font-bold bg-grey-dark`}>
                  {'NOT LISTED'}
                </button>
              )}
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
                <div className="text-sm text-grey-icon mb-3 flex gap-2 items-center">
                  Our Price Estimation:
                  <Tooltip title={<span className="whitespace-pre-line">
                    {`Stats
										MAPE:
										The Mean Absolute Percentage Error is the average forecast absolute error scaled to percentage units, where absolute errors allow to avoid the positive and negative errors cancelling.
										R-Squared:
										The R-Squared also known as coefficient of determination is the proportion of the variation between the forecasted valuations and actual selling prices. It ranges from 0 to 1 where 1 indicates the forcasted values match perfectly with actual values.
										Maximum:
										Maximum forecasted value that the trained model returns
										Minimum:
										Minimum forecasted value that the trained model returns
									`}
                  </span>}
                    placement="bottom-start"
                    arrow
                  >
                    <div>
                      <AiFillQuestionCircle className='text-grey-icon hover:text-grey-content cursor-pointer transition-all duration-300' />
                    </div>
                  </Tooltip>
                </div>
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
          </div >
        )}
    </>
  )
}

export default MapCard