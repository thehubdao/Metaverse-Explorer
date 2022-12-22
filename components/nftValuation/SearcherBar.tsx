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
  setfilteredItem: Function
  checked: number | undefined,
  setChecked: Function
}

export default function SearcherBar({ nftObject, setfilteredItem, checked, setChecked }: SearcherBarProps) {


  const filtered = (e: any) => {
    const keyWord = e.target.value;
    const results = nftObject.filter((fluf: nftObject) => {
      return fluf.tokenId == keyWord;
    });
    setfilteredItem(results);
    setChecked(keyWord);
  };

  return (
    <div className="relative rounded-full col-span-3 flex">
      <input
        type="number"
        onChange={filtered}
        value={checked}
        placeholder="Search by ID"
        className="font-normal font-plus justify-center text-grey-content nm-inset-soft focus:outline-none placeholder-gray-300 p-4 rounded-full w-full"
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