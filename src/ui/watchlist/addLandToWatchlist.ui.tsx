import { Metaverses } from "../../enums/metaverses.enum";
import { SingleLandAPIResponse } from "../../interfaces/land.interface";
import AddByCoordsUI from "./addByCoords.ui";
import AddByIdUI from "./addById.ui";

interface AddLandToWatchListUIProps {
  metaverse?: Metaverses;
  land?: SingleLandAPIResponse;
}

export default function AddLandToWatchListUI({ metaverse, land }: AddLandToWatchListUIProps) {
  return (
    <div className="bg-lm-fill dark:bg-nm-dm-fill dark:shadow-dm-relief-12 rounded-xl flex flex-wrap w-full min-h-[208px] items-center px-10 py-6">
      <div className="flex flex-wrap w-full  justify-center xl:justify-between items-center">
        <p className="text-lm-text dark:text-nm-fill pb-2 w-full xl:w-auto text-center xl:text-start">Add by Token ID:</p>
        <AddByIdUI metaverse={metaverse} land={land} />
      </div>
      <div className="flex flex-wrap w-full justify-center xl:justify-between items-center mt-4">
        <p className="text-lm-text dark:text-nm-fill pb-2 w-full xl:w-auto text-center xl:text-start">Add by Coordinates:</p>
        <AddByCoordsUI metaverse={metaverse} land={land} />
      </div>
    </div>
  )
}