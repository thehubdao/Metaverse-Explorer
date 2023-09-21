import React from 'react'
import { Metaverse } from '../../lib/metaverse'
import { formatName, typedKeys } from '../../lib/utilities'
import { OptimizedImage } from '../General'

interface Props {
  setAllMetaverse: React.Dispatch<React.SetStateAction<Metaverse>>
  allMetaverse: any
}

const AnalyticsMvChoice = ({ allMetaverse, setAllMetaverse }: Props) => {
  const mvOptions = {
    sandbox: { logo: '/images/the-sandbox-sand-logo.png' },
    decentraland: { logo: '/images/decentraland-mana-logo.png' },
    /* 'axie-infinity': { logo: '/images/axie-infinity-axs-logo.png' }, */
    'somnium-space': { logo: '/images/somnium-space-cube-logo.webp' }
  }
  return (
    <div className='w-full h-full'>
      {/* Metaverse Buttons */}
      <div className='nm-insert-hard flex justify-start gap-2 sm:gap-4'>
        {typedKeys(mvOptions).map((landKey: Metaverse) => (
          <button
            key={landKey}
            onClick={() => {
              let state: boolean;
              allMetaverse[landKey].active ? state = false : state = true
              setAllMetaverse((prevState: any) => ({
                ...prevState,
                [landKey]: {
                  ...prevState[landKey],
                  active: state
                },
              })
              )
            }}
            className={`flex flex-col items-center justify-center rounded-xl cursor-pointer p-1 w-14 h-12 group focus:outline-none ${allMetaverse[landKey].active
              ? 'border-opacity-20 nm-inset-medium'
              : 'nm-flat-medium border-opacity-20 hover:border-opacity-100'
              } border border-white transition duration-300 ease-in-out`}
          >
            <OptimizedImage
              src={mvOptions[landKey].logo}
              height={42}
              width={60}
              objectFit='contain'
              className={` ${allMetaverse[landKey].active ? 'grayscale-0' : 'grayscale'
                } group-hover:grayscale-0 transition duration-300 ease-in-out`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default AnalyticsMvChoice
