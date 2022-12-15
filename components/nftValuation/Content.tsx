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
  searchById: nftObject[]
  nftId: number | undefined
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
  searchById,
  nftId,
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
  };

  return (
    <>
      {
        isLoading ? (
          <div className="w-full">
            <Loader />
            <p className="w-full text-center">Loading ...</p>
          </div>
        ) : (
          <>
            {searchById && searchById.length > 0 ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 xs:gap-2 sm:gap-5 w-full">
                {searchById.map((fluf: nftObject, key: number) => {
                  return (
                    <NftCard
                      key={key}
                      image={fluf.images.image_small}
                      text="Estimated Price: "
                      value={formatter.format(
                        fluf.floor_adjusted_predicted_price
                      )}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 xs:gap-2 sm:gap-5 w-full">
                {dataFluf()}
              </div>
            )}
            {!nftId && (
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