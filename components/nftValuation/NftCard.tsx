import Image from "next/image";

interface INftCard {
    image: string
    predictedPrice: number
    collectionName: string
    tokenId: string
    listedPrice: number
}

const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 3,
});

const BoxPrice = ({ text, price }: any) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-end text-center">
            <p className='text-xs leading-none text-grey-icon'>{text}</p>
            <p className='font-bold text-base'>{price} ETH</p>
        </div>
    )
}

const NftCard = ({ image, predictedPrice, listedPrice, collectionName, tokenId }: INftCard) => {

    return (
        <div className={`grid grid-rows-3 rounded-xl cursor-pointer lg:w-[200px] lg:h-[300px] 2xl:w-[240px] 2xl:h-[360px] focus:outline-none nm-flat-hard  hover:nm-flat-soft transition duration-300 ease-in-out`}>
            <div className="relative row-span-2">
                <Image
                    src={image}
                    loading='lazy'
                    layout="fill"
                    className="rounded-xl"
                />
            </div>
            <div className="flex flex-col justify-around py-1">
                <p className="text-center font-bold">{`${collectionName.toUpperCase()} #${tokenId}`}</p>
                <div>
                    <div className="flex w-full flex-row">
                        <BoxPrice text='Listed Price' price={formatter.format(listedPrice)} />
                        <BoxPrice text='Price Estimation' price={formatter.format(predictedPrice)} />
                    </div>
                    {listedPrice > predictedPrice && <p className='text-red-500 w-full text-center text-xs pt-1'>Overvalue</p>}
                </div>
            </div>
        </div>
    )
};


export default NftCard;
