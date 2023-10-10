import { Metaverses } from "../../enums/metaverses.enum";
import { SingleLandAPIResponse } from "../../types/valuationTypes";
import SearchByCoordsUI from "./searchByCoords.ui";
import SearchByIdUI from "./searchById.ui";

interface SearchLandFormUIProps {
  metaverse?: Metaverses;
  land?: SingleLandAPIResponse;
}

export default function SearchLandFormUI({ metaverse, land }: SearchLandFormUIProps) {
  return (
    <div className="bg-lm-fill dark:bg-nm-dm-fill dark:shadow-dm-relief-12 rounded-xl flex flex-wrap w-full min-h-[208px] items-center px-10 py-6">
      <div className="flex flex-wrap w-full  justify-center xl:justify-between items-center">
        <p className="text-lm-text dark:text-nm-fill pb-2 w-full xl:w-auto text-center xl:text-start">Add by Token ID:</p>
        <SearchByIdUI metaverse={metaverse} land={land} />
      </div>
      <div className="flex flex-wrap w-full justify-center xl:justify-between items-center mt-4">
        <p className="text-lm-text dark:text-nm-fill pb-2 w-full xl:w-auto text-center xl:text-start">Add by Coordinates:</p>
        <SearchByCoordsUI metaverse={metaverse} land={land} />
      </div>
    </div>
  )
}