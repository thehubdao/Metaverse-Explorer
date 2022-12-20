import React from 'react'
import { Metaverse } from '../../lib/metaverse'
import { formatName, typedKeys } from '../../lib/utilities'
import { OptimizedImage } from '../General'

interface Props {
  setMetaverse: React.Dispatch<React.SetStateAction<Metaverse>>
  metaverse?: Metaverse
}

const AnalyticsMvChoice = ({ metaverse, setMetaverse }: Props) => {
  const mvOptions = {
    sandbox: { logo: '/images/the-sandbox-sand-logo.png' },
    decentraland: { logo: '/images/decentraland-mana-logo.png' },
    /* 'axie-infinity': { logo: '/images/axie-infinity-axs-logo.png' }, */
    'somnium-space': { logo: '/images/somnium-space-cube-logo.webp'}
  }
  return (
    <div className='w-full h-full p-2'>
      {/* Metaverse Buttons */}
      <div className='flex justify-center gap-2 sm:gap-4'>
        {typedKeys(mvOptions).map((landKey) => (
          <button
            key={landKey}
            onClick={() => setMetaverse(landKey)}
            className={`flex flex-col items-center justify-center space-y-2 rounded-xl cursor-pointer p-2 px-3 pt-4 md:w-30 md:h-[9.7rem] w-24 h-24 group focus:outline-none ${
              metaverse === landKey
                ? 'border-opacity-100 text-gray-200'
                : 'border-opacity-40 hover:border-opacity-100 text-gray-400 hover:text-gray-200'
            } border border-gray-400 focus:border-opacity-100 transition duration-300 ease-in-out`}
          >
            <OptimizedImage
              src={mvOptions[landKey].logo}
              height={60}
              width={60}
              objectFit='contain'
              className={`w-10 ${
                metaverse === landKey ? 'grayscale-0' : 'grayscale'
              } group-hover:grayscale-0 transition duration-300 ease-in-out`}
            />
            <p className='font-medium text-xs md:text-sm pt-1'>
              {formatName(landKey)}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default AnalyticsMvChoice
