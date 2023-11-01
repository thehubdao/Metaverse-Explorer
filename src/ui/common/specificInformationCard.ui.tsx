import Tooltip from "@mui/material/Tooltip";
import PriceListUI from "./priceList.ui";
import ExternalLinkUI from "./externalLink.ui";

import { Metaverses } from "../../enums/metaverses.enum";
import { IPredictions } from "../../interfaces/heatmap.interface";
import WatchlistButtonUI from "../heatmap/watchlistButton.ui";
import DataComparisonBoxUI from "../heatmap/dataComparisonBox.ui";
import { BiTargetLock } from "react-icons/bi";
import { InformationCardForm, PriceListForm } from "../../enums/ui.enum";
import { SingleLandAPIResponse } from "../../interfaces/land.interface";

interface SpecificInformationCardUIProps {
  land: SingleLandAPIResponse;
  predictions?: IPredictions | undefined;
  metaverse: Metaverses;
  cardForm: InformationCardForm;
}
export default function SpecificInformationCardUI({ land, predictions, metaverse, cardForm }: SpecificInformationCardUIProps) {

  return (
    <div className='h-full px-7 flex flex-col items-center xl:items-start justify-between '>
      <div className=' mt-3 xl:mt-5'>
        {/* Asset Name */}
        <Tooltip title={land.name} placement='top' arrow>
          <p className='text-xl xl:text-3xl text-lm-text dark:text-nm-fill font-semibold text-center xl:text-start'>
            {land.name}
          </p>
        </Tooltip>
        <div className="pt-3 flex gap-6">
          {
            land.owner &&
            <div className="w-[100px]">
              <p className='text-sm text-nm-dm-remark dark:text-nm-fill font-normal pb-2'>Owner</p>
              <Tooltip title={land.owner} placement='bottom'>
                <p className="text-base font-bold truncate dark:text-lm-text-gray">{land.owner}</p>
              </Tooltip>
            </div>
          }
          {
            land.tokenId &&
            <div className="w-[100px]">
              <p className='text-sm text-nm-dm-remark dark:text-nm-fill font-normal pb-2'>Token ID</p>
              <Tooltip title={land.tokenId} placement='bottom'>
                <p className="text-base font-bold truncate dark:text-lm-text-gray">{land.tokenId}</p>
              </Tooltip>
            </div>
          }
          {land.coords && Object.keys(land.coords).length > 0 && (
            <div className="w-[100px]">
              <p className='text-sm text-nm-dm-remark dark:text-nm-fill font-normal pb-2'>Coordinate</p>
              <Tooltip title={`${land.coords?.x}, ${land.coords?.y}`} placement='bottom'>
                <div className="flex items-center justify-start">
                  <BiTargetLock />
                  <p className="text-base font-bold truncate dark:text-lm-text-gray pl-1">{land.coords?.x}, {land.coords?.y}</p>
                </div>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
      <div className="flex pt-2">
        <div className="xl:mt-4 ml-0 xl:ml-4">
          <p className="text-nm-dm-remark dark:text-nm-fill font-normal text-sm mb-2 text-start">
            Estimated Price:
          </p>
          <PriceListUI predictions={predictions} form={PriceListForm.Bold} metaverse={metaverse} />
        </div>
        <div className="xl:mt-4 ml-6 xl:ml-20">
          <p className="text-nm-dm-remark dark:text-nm-fill font-normal text-sm mb-2 text-start">
            Listing price:
          </p>
          <DataComparisonBoxUI currentPriceEth={land.current_price_eth} predictions={predictions} />
        </div>
      </div>

      {/* TODO: graph to be made */}
      {/* <div className="w-[250px] xl:w-[461px] h-[100px] xl:h-[155px] bg-lm-fill dark:bg-nm-dm-fill rounded-xl shadow-relief-12 dark:shadow-dm-relief-12 hidden xl:flex items-center justify-center mt-4">
        <p>historical estimated price</p>
      </div> */}
      {/* External Links */}
      <div className='flex flex-wrap mt-3 xl:mt-20'>
        <div>
          <p className="text-base text-nm-dm-remark dark:text-nm-fill font-normal">Find land on:</p>
          <div className="flex flex-wrap justify-center xl:grid xl:grid-cols-4 items-center pb-4 xl:pb-0 xl:my-2">
            <ExternalLinkUI text="Sandbox" icon='/images/somnium-space-logo.png' externalLink={''} />
            <ExternalLinkUI text="OpenSea" icon="/images/icons/markets/opensea.svg" externalLink={land.market_links?.opensea ?? ''} />
            <ExternalLinkUI text="X2y2" icon="/images/icons/markets/x2y2.svg" externalLink={land.market_links?.X2Y2 ?? ''} />
            <ExternalLinkUI text="Looksrare" icon="/images/icons/markets/looksrare.svg" externalLink={land.market_links?.looksrare ?? ''} />
          </div>
        </div>
      </div>
      {
        cardForm == InformationCardForm.MapCard &&
        <div className="w-[234px] h-12 rounded-2xl bg-lm-fill dark:bg-nm-dm-fill flex items-center justify-center xl:mt-3 shadow-relief-12 dark:shadow-dm-relief-12 hover:shadow-relief-32 dark:hover:shadow-dm-relief-32 transition-all duration-300 cursor-pointer mb-4">
          <WatchlistButtonUI />
        </div>
      }
    </div>
  )
}