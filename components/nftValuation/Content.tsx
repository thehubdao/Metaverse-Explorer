import Loader from "../Loader";
import Pagination from "../Pagination";
import NftCard from "./NftCard";

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

interface ContentProps {
  filteredItem: nftObject[]
  checked: number | undefined
  nftObject: nftObject[]
  controlPageIndex: number
  pageLenght: number
  setControlPageIndex: Function
  isLoading: boolean
}

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
});

export default function Content({
  filteredItem,
  checked,
  nftObject,
  controlPageIndex,
  pageLenght,
  setControlPageIndex,
  isLoading
}: ContentProps) {

  const dataFluf = () => {
    const flufs: React.ReactElement[] = [];
    for (
      let index: number = controlPageIndex * 10;
      index < controlPageIndex * 10 + 20;
      index++
    ) {
      if (!nftObject[index]) return flufs;
      flufs.push(
        <NftCard
          image={nftObject[index]["images"]["image_small"]}
          text="Estimated Price: "
          value={formatter.format(
            nftObject[index]["floor_adjusted_predicted_price"]
          )}
          key={index}
        />
      );
    }
    return flufs;
  }

  const datafiltered = () => {
    const flufs: React.ReactElement[] = [];
    for (
      let index: number = controlPageIndex * 10;
      index < controlPageIndex * 10 + 20;
      index++
    ) {
      if (!filteredItem[index]) return flufs;
      flufs.push(
        <NftCard
          image={filteredItem[index]["images"]["image_small"]}
          text="Estimated Price: "
          value={formatter.format(
            filteredItem[index]["floor_adjusted_predicted_price"]
          )}
          key={index}
        />
      );
    }
    return flufs;
  }

  return (
    <>
      {
        isLoading ? (
          <div className="w-full pt-16">
            <Loader />
            <p className="w-full text-center p-5">Loading ...</p>
          </div>
        ) : (
          <>
            {filteredItem && checked && filteredItem.length > 0 ? (
              <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full justify-items-center">
                {datafiltered()}
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center">
                {dataFluf()}
              </div>
            )}
            { (
              <Pagination
                pageLenght={pageLenght}
                controlPageIndex={controlPageIndex + 1}
                setControlPageIndex={setControlPageIndex}
              />
            )}
          </>
        )
      }
    </>
  )
}