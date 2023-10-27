import { BsTwitter } from "react-icons/bs";
import { Metaverses } from "../../enums/metaverses.enum";
import { AiFillQuestionCircle, AiOutlineExpand } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import FeedbackButtonsUI from "./feedbackButtons.ui";
import WatchlistButtonUI from "./watchlistButton.ui";
import Tooltip from "@mui/material/Tooltip";
import { RiLoader3Fill } from "react-icons/ri";
import DataComparisonBoxUI from "./dataComparisonBox.ui";
import Link from "next/link";
import { IPredictions } from "../../interfaces/heatmap.interface";
import { SingleLandAPIResponse } from "../../types/valuationTypes";
import PriceListUI from "../common/priceList.ui";
import { PriceListForm } from "../../enums/ui.enum";
import { METAVERSE_LABEL } from "../../constants/common.constant";


interface MapCardUIProps {
  landData: SingleLandAPIResponse;
  metaverse: Metaverses;
  predictions?: IPredictions | undefined;
  setOpenSpecificModal: (isOpenModal: boolean) => void;
  setIsVisible: (isVisible: boolean) => void;
}

export default function MapCardUI({ landData, metaverse, predictions, setOpenSpecificModal, setIsVisible }: MapCardUIProps) {
  return (
    <div className="bg-nm-fill dark:bg-nm-dm-fill rounded-3xl p-6 flex w-[650px]">
      <div className="absolute right-6 top-6 flex gap-3">
        {/* Twitter button */}
        <Link href={'www.twitter.com'} target={'_blank'}>
          <div className="rounded-lg shadow-relief-16 dark:shadow-dm-relief-16 p-2 hover:shadow-relief-12 dark:hover:shadow-dm-relief-12 transition duration-300 ease-in-out cursor-pointer text-lm-text dark:text-nm-highlight hover:text-blue-500 dark:hover:text-blue-500">
            <BsTwitter title="Share Valuation" className="text-xl " />
          </div>
        </Link>
        {/* Open specific asset modal button */}
        <div className="w-9 h-9 rounded-lg shadow-relief-16 dark:shadow-dm-relief-16 p-2 hover:shadow-relief-12 dark:hover:shadow-dm-relief-12  transition duration-300 ease-in-out flex justify-center items-center hover:text-xl cursor-pointer text-lm-text dark:text-nm-highlight hover:text-yellow-500 dark:hover:text-yellow-500" onClick={() => setOpenSpecificModal(true)}>
          <AiOutlineExpand />
        </div>
        {/* Close button */}
        <div className="rounded-lg shadow-relief-16 dark:shadow-dm-relief-16 p-2 hover:shadow-relief-12 dark:hover:shadow-dm-relief-12  transition duration-300 ease-in-out cursor-pointer text-xl text-lm-text dark:text-nm-highlight hover:text-red-500 dark:hover:text-red-500" onClick={() => setIsVisible(false)}>
          <IoClose />
        </div>
      </div>

      {/* Left side */}
      <div className='w-full max-w-[250px] mr-6'>
        <div className={`h-fit relative`}>
          <Image
            height={188}
            width={250}
            src={landData.images.image_url || ""}
            alt="map image"
            className="rounded-xl"
          />
          <div className='absolute bottom-4 left-3 flex justify-center items-center p-1 z-10'>
            {metaverse === Metaverses.SandBox && <Image src='/images/the-sandbox-sand-logo.png' width={40} height={40} alt={`${METAVERSE_LABEL[metaverse]} logo`} className='rounded-full p-1 bg-nm-highlight' />}
            {metaverse === Metaverses.Decentraland && <Image src='/images/decentraland-mana-logo.png' width={40} height={40} alt={`${METAVERSE_LABEL[metaverse]} logo`} className='rounded-full p-1 bg-nm-highlight' />}
            {metaverse === Metaverses.SomniumSpace && <Image src='/images/somnium-space-logo.png' width={40} height={40} alt={`${METAVERSE_LABEL[metaverse]} logo`} className='rounded-full p-1 bg-nm-highlight' />}
          </div>
        </div>
        {/* Feedback Buttons */}
        <FeedbackButtonsUI />
        {/* Add To Watchlist Button */}
        <WatchlistButtonUI />
      </div>

      {/* Right side */}
      <div className="flex flex-col justify-between">
        <h3 className="font-semibold text-2xl pt-10">
          {landData.name}
        </h3>
        <div>
          <div className="text-sm mb-3 flex gap-2 items-center text-lm-text dark:text-nm-highlight">
            Our Price Estimation:
            <Tooltip title={<p className="whitespace-pre-line">
              {`Stats
										MAPE:
										The Mean Absolute Percentage Error is the average forecast absolute error scaled to percentage units, where absolute errors allow to avoid the positive and negative errors cancelling.
										R-Squared:
										The R-Squared also known as coefficient of determination is the proportion of the variation between the forecasted valuations and actual selling predictions. It ranges from 0 to 1 where 1 indicates the forcasted values match perfectly with actual values.
										Maximum:
										Maximum forecasted value that the trained model returns
										Minimum:
										Minimum forecasted value that the trained model returns
									`}
            </p>}
              placement="bottom-start"
              arrow
            >
              <div>
                <AiFillQuestionCircle className='text-lm-text dark:text-nm-highlight cursor-pointer transition-all duration-300' />
              </div>
            </Tooltip>
          </div>
          {/* Price List Predictions */}
          {landData.eth_predicted_price ?
            <>
              {
                predictions &&
                <div className="w-fit">
                  <PriceListUI predictions={predictions} form={PriceListForm.Bold} metaverse={metaverse} />
                </div>
              }
            </>
            :
            <p className="flex gap-2 text-lg">
              Fetching Predictions
              <RiLoader3Fill className="animate-spin-slow h-5 w-5 xs:h-6 xs:w-6" />
            </p>
          }
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-lm-text dark:text-nm-highlight">Listing price: </p>
          <DataComparisonBoxUI currentPriceEth={landData.current_price_eth} predictions={predictions} />
        </div>
        <div>
          <p className="text-sm text-lm-text dark:text-nm-highlight">Find land on:</p>
          <div className="flex gap-5 font-bold">
            {
              landData.external_link &&
              <Link href={landData.external_link} target={'_blank'}>
                <div className="flex justify-center gap-1">
                  {metaverse === Metaverses.SandBox && <Image src='/images/the-sandbox-sand-logo.png' width={20} height={20} alt='Sandbox logo' />}
                  {metaverse === Metaverses.Decentraland && <Image src='/images/decentraland-mana-logo.png' width={20} height={20} alt='Decentraland logo' />}
                  {metaverse === Metaverses.SomniumSpace && <Image src='/images/somnium-space-logo.png' width={20} height={20} alt='Somniun space logo' />}
                  {METAVERSE_LABEL[metaverse]}
                </div>
              </Link>
            }
            {
              landData.market_links?.opensea &&
              <Link href={landData.market_links?.opensea} target={'_blank'}>
                <div className="flex justify-center gap-1">
                  <Image src="/images/icons/markets/opensea.svg" width={20} height={20} alt="Opensea logo" />
                  OpenSea
                </div>
              </Link>
            }
          </div>
        </div>
      </div>
    </div>
  )
}