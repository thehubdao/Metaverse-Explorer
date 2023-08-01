import { Metaverses } from "../../enums/enums";
import { LandProps } from "../../types/valuationTypes";
import SearchByCoordsUI from "./searchByCoords.ui";
import SearchByIdUI from "./searchById.ui";

interface SearchLandFormUIProps {
  metaverse: Metaverses;
  land?: LandProps;
}

export default function SearhLandFormUI({ metaverse, land }: SearchLandFormUIProps) {
  return (
    <>
      <div className="text-center">
        <p className="w-full text-lm-text py-2">Add by Token ID</p>
        <SearchByIdUI metaverse={metaverse} land={land} />
      </div>
      <div className="text-center">
        <p className="w-full text-lm-text py-2">Add by Coordinates</p>
        <SearchByCoordsUI metaverse={metaverse} land={land} />
      </div>
    </>
  )
}