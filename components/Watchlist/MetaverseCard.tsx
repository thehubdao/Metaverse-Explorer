import Image from 'next/image'

import { Metaverse } from '../../lib/metaverse'

interface MetaverseCardProps {
    imageUrl: string
    label: string
    setMetaverse: Function
    currentMetaverse: Metaverse | undefined
    metaverseKey: Metaverse
}

const MetaverseCard = ({
    imageUrl,
    label,
    setMetaverse,
    currentMetaverse,
    metaverseKey,
}: MetaverseCardProps) => {
    return (
        <button
            key={label}
            onClick={() => setMetaverse(metaverseKey)}
            className={`flex flex-col items-center justify-center space-y-2 rounded-xl cursor-pointer p-2 px-3 pt-4 w-[200px] h-[250px] group focus:outline-none nm-flat-hard hover:scale-105 transition ease-in-out duration-300 ${
                currentMetaverse === label
                    ? ' text-gray-200 nm-inset-hard'
                    : ' hover:border-opacity-100 nm-flat-hard'
            }`}
        >
            <Image src={imageUrl} width={100} height={100} />
            <p className="text-grey-content font-plus font-normal text-lg md:text-lg pt-7">
                {label}
            </p>
        </button>
    )
}

export default MetaverseCard
