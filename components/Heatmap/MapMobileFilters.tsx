import React, { useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { FaXbox } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { MapFilter } from '../../lib/heatmap/heatmapCommonTypes'
import { Metaverse } from '../../lib/metaverse'
import MapChooseFilter from './MapChooseFilter'
import MapChooseMetaverse from './MapChooseMetaverse'

interface Props {
  metaverse: Metaverse
  setMetaverse: React.Dispatch<React.SetStateAction<Metaverse | undefined>>
  filterBy: MapFilter
  setFilterBy: React.Dispatch<React.SetStateAction<MapFilter>>
}

const MapMobileFilters = ({
  metaverse,
  setMetaverse,
  filterBy,
  setFilterBy,
}: Props) => {
  const [opened, setOpened] = useState(false)
  return (
    <div className='w-full xs:w-[177px]'>
      <button
        onClick={() => setOpened(true)}
        className='h-16 gray-box bg-grey-bone mb-2 items-center tracking-wider font-semibold text-grey-content hover:text-[#7c7b7b] flex justify-between cursor-pointer transition-all'
      >
        <p>Filters</p>
        <IoIosArrowDown
          className={
            (opened ? '-rotate-90' : 'rotate-90') +
            ' transition-all duration-500 relative bottom-[1px]'
          }
        />
      </button>
      {opened && metaverse && (
        <div className='flex flex-col items-center gap-1 fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm z-30 overflow-hidden py-20 px-8'>
          <Fade direction='right' duration={800}>
            <MapChooseFilter filterBy={filterBy} setFilterBy={setFilterBy} />

            <MapChooseMetaverse
              metaverse={metaverse}
              setMetaverse={setMetaverse}
            />
          </Fade>
          <button
            onClick={() => setOpened(false)}
            className='p-3 w-fit gray-box bg-opacity-100 items-center tracking-wider font-semibold text-grey-content hover:text-[#7c7b7b] flex justify-between cursor-pointer transition-all absolute bottom-2 right-8'
          >
            <IoClose
              className={
                'rotate-90 text-2xl transition-all duration-500 relative bottom-[1px]'
              }
            />
          </button>
        </div>
      )}
    </div>
  )
}

export default MapMobileFilters
