import React from 'react'
import { BsExclamationCircleFill } from 'react-icons/bs'
import { Metaverse } from '../../lib/metaverse'
import { formatName, typedKeys } from '../../lib/utilities'
import { OptimizedImage } from '../General'

interface Props {
  setMetaverse: React.Dispatch<React.SetStateAction<Metaverse | undefined>>
  metaverse?: Metaverse
}

const MapInitMvChoice = ({ metaverse, setMetaverse }: Props) => {
  const mvOptions = {
    sandbox: { logo: '/images/the-sandbox-sand-logo.png' },
    decentraland: { logo: '/images/decentraland-mana-logo.png' },
/*     'axie-infinity': { logo: '/images/axie-infinity-axs-logo.png' }, */
    'somnium-space': { logo: '/images/somnium-space-cube-logo.webp' }
  }

  return (
    <div className='w-full h-full p-8'>
      {/* Title */}
      <h2 className='text-grey-content font-plus font-normal rounded-2xl lg:text-3xl text-2xl text-center mb-8'>
        Choose a Metaverse
      </h2>

      <div className='flex space-x-2 items-center justify-center bg-grey-dark rounded-2xl w-[70%] m-auto p-2'>
        <BsExclamationCircleFill className={`text-2xl z-10 text-[#6196FF]`} />
        <p className='flex text-xs xs:text-base xl:text-base font-normal font-plus text-grey-content pl-3'>
          You can have &nbsp;<span className='font-bold'>5 free valuations</span>, after that pro version is needed
        </p>
      </div>

      {/* Metaverse Buttons */}
      <div className='flex justify-center gap-8 pt-10'>
        {typedKeys(mvOptions).map((landKey) => (
          <button
            key={landKey}
            onClick={() => setMetaverse(landKey)}
            className={`flex flex-col shadowMetaverse items-center justify-center space-y-2 rounded-xl cursor-pointer p-2 px-3 pt-4 w-[200px] h-[250px] group focus:outline-none nm-flat-hard hover:scale-105 transition ease-in-out duration-300 ${metaverse === landKey
              ? ' text-gray-200'
              : ' hover:border-opacity-100 nm-flat-hard'
              }`}
          >
            <OptimizedImage
              src={mvOptions[landKey].logo}
              height={100}
              width={100}
              objectFit='contain'
              className={`w-10 ${metaverse === landKey ? 'grayscale-0' : 'grayscale'
                } group-hover:grayscale-0 transition duration-300 ease-in-out`}
            />
            <p className='text-grey-content font-plus font-normal text-lg md:text-lg pt-7'>
              {formatName(landKey)}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MapInitMvChoice
