import Image from 'next/image'
import React from 'react'
import { Metaverse } from '../../lib/metaverse'
import { formatName, typedKeys } from '../../lib/utilities'
import { OptimizedImage } from '../General'

interface Props {
  metaverse: Metaverse
  setMetaverse: React.Dispatch<React.SetStateAction<Metaverse | undefined>>
  onClick: () => void
  opened: boolean
}

const MapChooseMetaverse = ({ metaverse, setMetaverse, onClick, opened }: Props) => {
  // const [opened, setOpened] = useState(false)
  const mvOptions = {
    sandbox: {
      src: '/images/the-sandbox-sand-logo.png',
      name: 'The Sandbox'
    },
    decentraland: {
      src: '/images/decentraland-mana-logo.png',
      name: 'Decentraland'
    },
    /*     'axie-infinity': { src: '/images/axie-infinity-axs-logo.png' }, */
    'somnium-space': {
      src: '/images/somnium-space-cube-logo.webp',
      name: 'Somnium Space'
    }
  }

  return (
    <div className='relative z-50'>
      <button
        onClick={() => onClick()}
      >
        <div className={`hidden sm:flex bg-grey-bone items-center justify-center rounded-full w-12 h-12 ${opened && "rounded-b-none h-15 pb-3"}`}>
          <OptimizedImage
            height={30}
            width={30}
            src={mvOptions[metaverse].src}
          />
        </div>
      </button>
      {opened &&
        <>
          <div className='absolute top-[48px] left-[48px] w-3 h-3'>
            <Image
              src={'/images/heatmap/curve.svg'}
              layout='fill'
            />
          </div>
          <div className={`flex flex-col space-y-4 absolute bg-grey-bone rounded-xl rounded-tl-none p-3 pt-5`}>

            {typedKeys(mvOptions).map(
              (mv) =>
                mv !== metaverse && (

                  <button
                    className='flex gray-box gap-2 md:gap-4 bg-opacity-100 items-center font-medium text-grey-content hover:text-[#7c7b7b] whitespace-nowrap min-w-max bg-grey-bone rounded-xl'
                    onClick={() => {
                      setMetaverse(mv)
                      onClick()
                    }}
                    key={mv}
                  >
                    <OptimizedImage
                      height={25}
                      width={25}
                      src={mvOptions[mv].src}
                    />
                    <span className='text-sm md:text-base'>
                      {mvOptions[mv].name}
                    </span>
                  </button>

                )
            )}
          </div>

        </>
      }
    </div>
  )
}

export default MapChooseMetaverse
