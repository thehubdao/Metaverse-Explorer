import { FiSearch } from "react-icons/fi";

interface nftObject {
  tokenId: string
  floor_adjusted_predicted_price: number
  traits: {
    traitType: string
    value: string
  }[]
  images: {
    image_small: string
  }
}

interface SearcherBarProps {
  nftObject: nftObject[]
  setSearchById: Function
  nftId: number | undefined,
  setNftId: Function
}

export default function SearcherBar({ nftObject, setSearchById, nftId, setNftId }: SearcherBarProps) {


  const filtered = (e: any) => {
    const keyWord = e.target.value;
    const results = nftObject.filter((fluf: nftObject) => {
      return fluf.tokenId == keyWord;
    });
    setSearchById(results);
    setNftId(keyWord);
  };

  return (
    <div className="relative rounded-full col-span-3 flex">
      <input
        type="number"
        onChange={filtered}
        value={nftId}
        placeholder="Search by ID"
        className="font-normal font-plus justify-center text-grey-content nm-inset-hard appearance-none focus:outline-none placeholder-gray-300 p-3 rounded-full w-full"
      />
      <button
        type="submit"
        className="absolute block right-4 top-4 text-grey-content text-xl"
      >
        <FiSearch />
      </button>
    </div>
  )
}