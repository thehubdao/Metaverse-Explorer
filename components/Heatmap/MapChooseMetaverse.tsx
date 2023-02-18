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
    sandbox: { src: '/images/the-sandbox-sand-logo.png' },
    decentraland: { src: '/images/decentraland-mana-logo.png' },
    /*     'axie-infinity': { src: '/images/axie-infinity-axs-logo.png' }, */
    'somnium-space': { src: '/images/somnium-space-cube-logo.webp' }
  }

  return (
    <div className='relative z-50'>
      <button
        onClick={() => onClick()}
      >
        <div className={`hidden sm:flex bg-grey-bone items-center justify-center rounded-full w-12 h-12 ${opened && "rounded-b-none"}`}>
          <OptimizedImage
            height={30}
            width={30}
            src={mvOptions[metaverse].src}
          />
        </div>
        {/* <span className='text-base hidden sm:block'>
          {formatName(metaverse)}
        </span> */}
        {/* <span className='text-base block sm:hidden'>Metaverse</span>
        <IoIosArrowDown
          className={
            (opened ? 'rotate-180' : '') +
            ' transition-all duration-500 relative bottom-[1px]'
          }
        /> */}
      </button>
      {opened &&

        <div className={`flex flex-col space-y-4 md:absolute bg-grey-bone rounded-xl rounded-tl-none p-3 pt-5`}>

          {typedKeys(mvOptions).map(
            (mv) =>
              mv !== metaverse && (

                <button
                  className='flex gray-box gap-2 md:gap-4 bg-opacity-100 items-center font-plus font-medium text-grey-content hover:text-[#7c7b7b] whitespace-nowrap min-w-max bg-grey-bone rounded-xl'
                  onClick={() => {
                    setMetaverse(mv)
                    onClick()
                  }}
                >
                  <OptimizedImage
                    height={25}
                    width={25}
                    src={mvOptions[mv].src}
                  />
                  <span className='text-sm md:text-base'>
                    {formatName(mv)}
                  </span>
                </button>

              )
          )}
        </div>
      }
    </div>
  )
}

export default MapChooseMetaverse
