import { BsPlusLg } from "react-icons/bs"

interface SearchLandFormProps {
  searchBy: 'tokenId' | 'coordinates'
}

const SearchByCoords = () => {
  return (
    <div className="flex font-normal font-plus justify-center text-grey-content placeholder-gray-300 gap-3">
      <input
        type="number"
        placeholder="X"
        className="nm-inset-soft focus:outline-none p-4 rounded-full text-center"
      />
      <input
        type="number"
        placeholder="Y"
        className="nm-inset-soft focus:outline-none p-4 rounded-full text-center"
      />
    </div>
  )
}

const SearchById = () => {
  return (
    <div className="w-full">
      <input
        type="number"
        placeholder="Token ID"
        className="nm-inset-soft focus:outline-none p-4 rounded-full text-center"
        min={0}
      />
    </div>
  )
}

const AddLandButton = () => {
  return (
    <button className="w-full flex justify-center items-center m-4 nm-flat-medium py-4 px-10 rounded-full gap-8 font-bold">
      <BsPlusLg />
      Add Land
    </button>
  )
}

const SearchLandForm = ({ searchBy }: SearchLandFormProps) => {
  const title = searchBy === 'tokenId' ? 'Add by Token ID' : 'Add by Coordinates'

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col justify-center items-center">
        <p className="w-full font-plus text-grey-icon py-2">{title}</p>
        {searchBy === 'tokenId' && <SearchById />}
        {searchBy === 'coordinates' && <SearchByCoords />}
        <AddLandButton />
      </div>
    </div>
  )
}

export default SearchLandForm