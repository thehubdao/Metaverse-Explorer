import axios from 'axios'
import { useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { Metaverse } from '../../lib/metaverse'

interface SearchLandFormProps {
    searchBy: 'tokenId' | 'coordinates'
    metaverse: Metaverse
    addLand: any
}

const SearchByCoords = ({ metaverse, addLand }: any) => {
    const [x, setX] = useState<string>()
    const [y, setY] = useState<string>()

    const onClick = async () => {
        if (!x || !y) return
        const response = await axios.get(
            `${process.env.ITRM_SERVICE}/test/${metaverse}/map?x=${x}&y=${y}`
        )
        const land:any = Object.values(await response.data)[0]
        if (!land?.tokenId) return
        addLand(land, metaverse)
    }

    return (
        <>
            <div className="flex font-normal font-plus justify-center text-grey-content placeholder-gray-300 gap-3">
                <input
                    type="number"
                    placeholder="X"
                    className="nm-inset-soft focus:outline-none p-4 rounded-full text-center"
                    onChange={(input) => {
                        setX(input.target.value)
                    }}
                />
                <input
                    type="number"
                    placeholder="Y"
                    className="nm-inset-soft focus:outline-none p-4 rounded-full text-center"
                    onChange={(input) => {
                        setY(input.target.value)
                    }}
                />
            </div>
            <AddLandButton onClick={onClick} />
        </>
    )
}

const SearchById = ({ metaverse, addLand }: any) => {
    const [tokenId, setTokenId] = useState<any>()
    const onClick = async () => {
        if (!tokenId) return
        const response = await axios.get(
            `${process.env.ITRM_SERVICE}/test/${metaverse}/map?tokenId=${tokenId}`
        )
        const land:any = Object.values(await response.data)[0]
        
        if (!land?.tokenId) return
        
        addLand(land, metaverse)
    }

    return (
        <>
            <div className="w-full">
                <input
                    type="number"
                    placeholder="Token ID"
                    className="nm-inset-soft focus:outline-none p-4 rounded-full text-center"
                    min={0}
                    onChange={(input) => {
                        setTokenId(input.target.value)
                    }}
                />
            </div>
            <AddLandButton onClick={onClick} />
        </>
    )
}

const AddLandButton = ({ onClick }: any) => {
    return (
        <button
            onClick={onClick}
            className="w-full flex justify-center items-center m-4 nm-flat-medium py-4 px-10 rounded-full gap-8 font-bold"
        >
            <BsPlusLg />
            Add Land
        </button>
    )
}

const SearchLandForm = ({
    searchBy,
    metaverse,
    addLand,
}: SearchLandFormProps) => {
    const title =
        searchBy === 'tokenId' ? 'Add by Token ID' : 'Add by Coordinates'

    return (
        <div className="flex justify-center items-center ">
            <div className="flex flex-col justify-center items-center">
                <p className="w-full font-plus text-grey-icon py-2">{title}</p>
                {searchBy === 'tokenId' && (
                    <SearchById metaverse={metaverse} addLand={addLand} />
                )}
                {searchBy === 'coordinates' && (
                    <SearchByCoords metaverse={metaverse} addLand={addLand} />
                )}
            </div>
        </div>
    )
}

export default SearchLandForm
