import Link from "next/link";


const NftCard = ({ image, value, text }: any) => {

    return (
        <>

            <div>
                <a className="flex flex-col space-y-3 transition ease-in-out duration-500 lg:hover:scale-105 shadowDiv w-full bg-opacity-30 text-left p-3">
                    <img src={image} className="rounded-t-xl" />
                    <p className="text-grey-content font-plus font-normal leading-tight px-3 xs:text-xs sm:text-sm">{text}</p>
                    <p className="text-grey-content font-plus font-bold leading-tight px-3 xs:text-xs sm:text-sm">{value} ETH</p>
                </a>
            </div>

        </>
    )
};


export default NftCard;
