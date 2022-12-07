import Link from "next/link";


const HomeCard = ({ image, link, text }: any) => {

    return (
        <>

            <Link href={link}>
                <a className="flex flex-col space-y-3 items-start transition ease-in-out duration-500 lg:hover:scale-105 shadowDiv w-full bg-opacity-30 text-left">
                    <img src={image} className="rounded-t-xl" />
                    <p className="text-grey-content font-plus font-normal leading-tight px-3 pb-3 xs:text-xs sm:text-sm">{text}</p>
                </a>
            </Link>

        </>
    )
};


export default HomeCard;
