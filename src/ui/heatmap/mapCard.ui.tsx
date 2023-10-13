import { BsTwitter } from "react-icons/bs";
import { METAVERSE_LABEL, Metaverses } from "../../enums/metaverses.enum";
import { MapCardData } from "../../interfaces/heatmap.interface";
import { AiFillQuestionCircle, AiOutlineExpand } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import FeedbackButtonsUI from "./feedbackButtons.ui";
import WatchlistButtonUI from "./watchlistButton.ui";
import Tooltip from "@mui/material/Tooltip";
import PricePredictionsUI from "./pricePredictions.ui";
import { RiLoader3Fill } from "react-icons/ri";
import DataComparisonBoxUI from "./dataComparisonBox.ui";

interface MapCardUIProps {
  landData: MapCardData;
  metaverse: Metaverses
  setOpenSpecificModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MapCardUI({ landData, metaverse, setOpenSpecificModal, setIsVisible }: MapCardUIProps) {
  return (
    <div className="bg-nm-fill dark:bg-nm-dm-fill rounded-3xl p-6 flex w-[650px]">
      <div className="absolute right-6 top-6 flex gap-3">
        {/* Twitter button */}
        <div className="rounded-lg shadow-relief-16 dark:shadow-dm-relief-16 p-2 hover:shadow-relief-12 dark:hover:shadow-dm-relief-12 transition duration-300 ease-in-out cursor-pointer">
          <BsTwitter title="Share Valuation" onClick={() => window.open("www.twitter.com")} className="text-xl text-lm-text dark:text-nm-highlight hover:text-blue-500 dark:hover:text-blue-500" />
        </div>
        {/* Open specific asset modal button */}
        <div className="w-9 h-9 rounded-lg shadow-relief-16 dark:shadow-dm-relief-16 p-2 hover:shadow-relief-12 dark:hover:shadow-dm-relief-12  transition duration-300 ease-in-out flex justify-center items-center hover:text-xl cursor-pointer" onClick={() => { setOpenSpecificModal(true) }}>
          <AiOutlineExpand className="text-lm-text dark:text-nm-highlight hover:text-yellow-500 dark:hover:text-yellow-500" />
        </div>
        {/* Close button */}
        <div className="rounded-lg shadow-relief-16 dark:shadow-dm-relief-16 p-2 hover:shadow-relief-12 dark:hover:shadow-dm-relief-12  transition duration-300 ease-in-out cursor-pointer" onClick={() => setIsVisible(true)}>
          <IoClose className="text-xl text-lm-text dark:text-nm-highlight hover:text-red-500 dark:hover:text-red-500" />
        </div>
      </div>

      {/* Left side */}
      <div className='w-full max-w-[250px] mr-6'>
        <div className={`h-fit relative`}>
          <Image
            height={188}
            width={250}
            src={landData.apiData.images.image_url || ""}
            alt="map image"
            className="rounded-xl"
          />
          <div className='absolute bottom-4 left-3 bg-grey-panel rounded-full flex justify-center items-center p-1'>
            {metaverse === Metaverses.SandBox && <Image src='/images/the-sandbox-sand-logo.png' width={40} height={40} alt='sandbox' className='rounded-full p-1 bg-nm-highlight absolute bottom-3 left-3' />}
            {metaverse === Metaverses.Decentraland && <Image src='/images/decentraland-mana-logo.png' width={40} height={40} alt='decentraland' className='rounded-full p-1 bg-nm-highlight absolute bottom-3 left-3' />}
            {metaverse === Metaverses.SomniumSpace && <Image src='/images/somnium-space-logo.png' width={40} height={40} alt='somniun-space' className='rounded-full p-1 bg-nm-highlight absolute bottom-3 left-3' />}
          </div>
        </div>
        {/* Feedback Buttons */}
        <FeedbackButtonsUI />
        {/* Add To Watchlist Button */}
        <WatchlistButtonUI landData={landData} />
      </div>

      {/* Right side */}
      <div className="flex flex-col justify-between">
        <h3 className="font-semibold text-2xl pt-10">
          {landData.name}
        </h3>
        <div>
          <div className="text-sm mb-3 flex gap-2 items-center text-lm-text dark:text-nm-highlight">
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
                <AiFillQuestionCircle className='text-lm-text dark:text-nm-highlight cursor-pointer transition-all duration-300' />
              </div>
            </Tooltip>
          </div>
          {/* Price List Predictions */}
          {landData.predictions ? (
            <div className="w-fit">
              <PricePredictionsUI metaverse={metaverse} landData={landData} />
            </div>
          ) : (
            <span className="flex gap-2 text-lg">
              Fetching Predictions
              <RiLoader3Fill className="animate-spin-slow h-5 w-5 xs:h-6 xs:w-6" />
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-lm-text dark:text-nm-highlight">Listing price: </p>
          <DataComparisonBoxUI currentPriceEth={landData.apiData.current_price_eth} predictions={landData.predictions} />
        </div>
        <div>
          <p className="text-sm text-lm-text dark:text-nm-highlight">Find land on:</p>
          <div className="flex gap-5 font-bold">
            <button
              onClick={() => { window.open(landData.apiData.external_link || "") }}
              className="flex justify-center gap-1"
            >
              {metaverse === Metaverses.SandBox && <Image src='/images/the-sandbox-sand-logo.png' width={20} height={20} alt='sandbox' />}
              {metaverse === Metaverses.Decentraland && <Image src='/images/decentraland-mana-logo.png' width={20} height={20} alt='decentraland' />}
              {metaverse === Metaverses.SomniumSpace && <Image src='/images/somnium-space-logo.png' width={20} height={20} alt='somniun-space' />}
              {METAVERSE_LABEL[metaverse]}
            </button>
            <button
              onClick={() => { window.open(landData.apiData.market_links?.opensea || "") }}
              className="flex justify-center gap-1"
            >
              <Image src="/images/icons/markets/opensea.svg" width={20} height={20} alt="opensea logo" />
              OpenSea
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}