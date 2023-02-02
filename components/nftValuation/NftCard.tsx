import Image from "next/image";
import { nftObject } from "../../lib/types";

interface INftCard {
    dataObject: nftObject
    collectionName: string
    handleSpecificNftData: Function
}

interface BoxPriceProps {
    text: string
    price?: string
}

const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 3,
});

const BoxPrice = ({ text, price }: BoxPriceProps) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-end text-center">
            <p className='text-xs leading-none text-grey-icon'>{text}</p>
            {price
                ? <p className='font-bold text-base'>{price} ETH</p>
                : <p className='font-bold text-base'>No Listed</p>
            }
        </div>
    )
}

const NftCard = ({ dataObject, collectionName, handleSpecificNftData }: INftCard) => {
    return (
        <div
            onClick={() => { handleSpecificNftData(true, dataObject) }}
            className={`grid grid-rows-3 rounded-xl cursor-pointer lg:w-[200px] lg:h-[300px] 2xl:w-[240px] 2xl:h-[360px] focus:outline-none nm-flat-hard  hover:nm-flat-soft transition duration-300 ease-in-out`}
        >
            <div className="relative row-span-2">
                <Image
                    src={dataObject["images"]["image_small"]}
                    loading='lazy'
                    layout="fill"
                    className="rounded-xl"
                />
            </div>
            <div className="flex flex-col justify-around py-1">
                <p className="text-center font-bold">{dataObject['name'] ? dataObject['name'] : `${collectionName.toUpperCase()} #${dataObject['tokenId']}`}</p>
                <div>
                    <div className="flex w-full flex-row">
                        {dataObject['listed_eth_price']
                            ? <BoxPrice text='Listed Price' price={formatter.format(dataObject['listed_eth_price'])} />
                            : <BoxPrice text='Listed Price' />
                        } <BoxPrice text='Price Estimation' price={formatter.format(dataObject["floor_adjusted_predicted_price"])} />
                    </div>
                    {dataObject['listed_eth_price'] && (dataObject['listed_eth_price'] > dataObject["floor_adjusted_predicted_price"] && <p className='text-red-500 w-full text-center text-xs pt-1'>Overvalue</p>)}
                </div>
            </div>
        </div>
    )
};


export default NftCard;
