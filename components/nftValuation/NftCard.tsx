import Image from "next/image";

const NftCard = ({ image, value, text }: any) => {

    return (
        <div
            className={`grid grid-rows-3 rounded-xl cursor-pointer w-[240px] h-[360px] focus:outline-none nm-flat-hard  hover:nm-flat-soft transition duration-300 ease-in-out`}
        >
            <div className="w-full h-full relative row-span-2">
                <Image
                    src={image}
                    loading='lazy'
                    layout="fill"
                    className="rounded-xl"
                />
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
                <p className='font-bold text-base leading-none'>{text}</p>
                <p className='font-light text-base'>{value} ETH</p>
            </div>
        </div>
    )
};


export default NftCard;
