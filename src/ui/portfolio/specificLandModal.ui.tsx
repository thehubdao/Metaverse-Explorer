import { IoClose } from "react-icons/io5";
import { ICoinPrices, LandProps } from "../../types/valuationTypes";
import ExternalAssetLinkUI from "./externalAssetsLink.ui";
import SpecificInformationCardUI from "./specificInformationCard.ui";

interface SpecificLandModalUIProps {
  onClose: () => void;
  land: LandProps,
  prices: ICoinPrices
}

export default function SpecificLandModalUI({ onClose, land, prices }: SpecificLandModalUIProps) {

  return (
    <div className="z-50 fixed w-full h-screen top-0 left-0 flex justify-center items-center bg-black/75" >

      <div className="w-[1440px] h-[728px] bg-nm-highlight rounded-3xl relative " >
        <div className="absolute right-6 top-6 flex gap-3 z-10">
          <div
            className="rounded-lg shadow-relief-16 hover:shadow-relief-12 p-2 bg-nm-fill text-nm-dm-icons hover:text-red-500 transition duration-300 ease-in-out cursor-pointer"
            onClick={onClose}
          >
            <IoClose className="text-x" />
          </div>
        </div>
        <div className="flex relative h-full w-full">
          <div className="w-1/2 flex justify-center items-center ">
            <div className="w-[600px] h-[600px] rounded-3xl p-5 bg-nm-highlight shadow-relief-12">
              <ExternalAssetLinkUI land={land}  isOpen={true}/>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-[600px] h-[650px] ">
              <SpecificInformationCardUI land={land} prices={prices} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}