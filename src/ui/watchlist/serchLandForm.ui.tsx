import { Metaverses } from "../../enums/enums"
import { LandProps } from "../../types/valuationTypes"
import SearchByCoordsUI from "./searchByCoords.ui"
import SearchByIdUI from "./searchById.ui"

interface SearchLandFormUIProps {
  metaverse: Metaverses,
  land?: LandProps
}

export default function SearhLandFormUI({ metaverse, land }: SearchLandFormUIProps) {
  return (
    <>
      <div>
        <p className="w-full text-nm-dm-icons py-2">Add by Token ID</p>
        <SearchByIdUI metaverse={metaverse} land={land} />
      </div>
      <div>
        <p className="w-full text-nm-dm-icons py-2">Add by Coordinates</p>
        <SearchByCoordsUI metaverse={metaverse} land={land} />
      </div>
    </>
  )
}