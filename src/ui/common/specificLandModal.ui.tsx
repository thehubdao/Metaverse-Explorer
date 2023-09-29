import { IoClose } from "react-icons/io5";
import { SingleLandAPIResponse } from "../../types/valuationTypes";
import ExternalAssetLinkUI from "./externalAssetsLink.ui";
import SpecificInformationCardUI from "./specificInformationCard.ui";
import { Metaverses } from "../../enums/metaverses.enum";
import { CoinValuesType } from "../../utils/itrm/coin-gecko.util";

interface SpecificLandModalUIProps {
  onClose: () => void;
  land: SingleLandAPIResponse;
  prices: CoinValuesType;
  metaverse: Metaverses;
}

export default function SpecificLandModalUI({ onClose, land, prices, metaverse }: SpecificLandModalUIProps) {

  return (
    <div className="z-50 fixed w-full h-screen top-0 left-0 flex justify-center items-center bg-black/75" >
      <div className="w-auto 2xl:w-[1440px] h-auto 2xl:h-[728px] bg-lm-fill dark:bg-nm-dm-fill rounded-3xl relative px-3 mx-2" >
        <div className="absolute right-6 top-6 flex gap-3 z-10">
          <div
            className="rounded-lg shadow-relief-16 dark:shadow-dm-relief-16 hover:shadow-relief-12 dark:hover:shadow-dm-relief-12 p-2 bg-lm-fill dark:bg-nm-dm-fill text-lm-text dark:text-nm-fill hover:text-red-500 dark:hover:text-red-500 transition duration-300 ease-in-out cursor-pointer"
            onClick={onClose}
          >
            <IoClose />
          </div>
        </div>
        <div className="flex flex-col xl:flex-row relative h-full w-full">
          <div className="w-full xl:w-1/2 flex justify-center items-center mt-16 xl:mt-0 px-3">
            <div className="w-[300px] xl:w-[600px] h-[180px] xl:h-[600px] rounded-3xl p-2 xl:p-5 bg-lm-fill dark:bg-nm-dm-fill shadow-relief-12 dark:shadow-dm-relief-12">
              <ExternalAssetLinkUI land={land}  isOpen={true} metaverse={metaverse}/>
            </div>
          </div>
          <div className="w-full xl:w-1/2 flex justify-center items-center">
            <div className="w-auto xl:w-[600px] h-auto xl:h-[650px]">
              <SpecificInformationCardUI land={land} prices={prices} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}