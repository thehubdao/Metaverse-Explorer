import { LandProps } from "../../types/valuationTypes"
import { Metaverse } from "../../utils/metaverse"
import SearchByCoordsUI from "./searchByCoords.ui"
import SearchByIdUI from "./searchById.ui"

interface SearchLandFormUIProps {
    searchBy: 'tokenId' | 'coordinates',
    metaverse: Metaverse,
    land: LandProps
}

export default function SearhLandFormUI({searchBy, metaverse, land}:SearchLandFormUIProps){
    const title =
        searchBy === 'tokenId' ? 'Add by Token ID' : 'Add by Coordinates'

    return (
        <div className="flex justify-center items-center ">
            <div className="flex flex-col justify-center items-center">
                <p className="w-full  text-grey-icon py-2">{title}</p>
                {searchBy === 'tokenId' && (
                    <SearchByIdUI metaverse={metaverse} land={land} />
                )}
                {searchBy === 'coordinates' && (
                    <SearchByCoordsUI metaverse={metaverse} land={land} />
                )}
            </div>
        </div>
    )
}