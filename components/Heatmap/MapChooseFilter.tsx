import React, { useState } from 'react'
import { Fade, FadeProps } from 'react-awesome-reveal'
import { BiTargetLock, BiTransferAlt, BiBullseye } from 'react-icons/bi'
import { FiMap } from 'react-icons/fi'
import { IoIosArrowDown } from 'react-icons/io'
import { MdAttachMoney } from 'react-icons/md'
import { VscGraphLine } from 'react-icons/vsc'
import { GiStopwatch } from 'react-icons/gi'
import { MapFilter } from '../../lib/heatmap/heatmapCommonTypes'
import { typedKeys } from '../../lib/utilities'
import { useAppSelector } from '../../state/hooks'

interface Props {
  filterBy: MapFilter
  setFilterBy: React.Dispatch<React.SetStateAction<MapFilter>>
}

const MapChooseFilter = ({ filterBy, setFilterBy }: Props) => {
  const { role } = useAppSelector((state) => state.account)
  const isPremium = true // This will be replaced with role when we release this feature.
  const [openModal, setOpenModal] = useState(false);
  const [opened, setOpened] = useState(false)
  const filterOptions = {
    basic: {
      name: 'Basic',
      shortName: undefined,
      icon: <FiMap />,
      description: 'Quickly find undervalued LANDs when clicking on the squares in the map'
    },
    eth_predicted_price: {
      name: 'Predicted Price',
      shortName: undefined,
      icon: <BiTargetLock />,
      description: 'This  filter shows the estimated price of the LANDs in a specifc area of the map.  green = low price estimation, red = high price estimation'
    },
    floor_adjusted_predicted_price: {
      name: 'Floor Adjusted Predicted Price',
      shortName: undefined,
      icon: <BiBullseye />,
      description: 'This fliter adjusts the price predictions to the floor price of the collection eg. if the price prediction is below the floor price it gets adjusted to the current floor price of the collection'
    },
    listed_lands: {
      name: 'Listed Lands',
      shortName: undefined,
      icon: <VscGraphLine />,
      description: 'This filter only shows the listed LANDs and their respective price estimation. green = low price estimation, red = high price estimation'
    },
    price_difference: {
      name: 'Price Difference',
      shortName: undefined,
      icon: <MdAttachMoney />,
      description: 'This filter only shows the listed LANDs and their respective price estimation in relation to the listed price. green = undervalued red = overvalued'
    },
    transfers: {
      name: 'Transfers',
      shortName: undefined,
      icon: <BiTransferAlt />,
      description: 'This filter shows how many times LANDs have exchanged owners throughout their trading history'
    },
    last_month_sells: {
      name: 'Sales of the last Month',
      shortName: undefined,
      icon: <GiStopwatch />,
      description: 'This filter shows to which price the LANDs were sold in the last month. green= low selling price, red = high selling price'
    },

    // Not using this filters for now..Will delete if decision is permanent
    // variation_last_week: {
    //   name: 'Weekly Price Variation',
    //   shortName: 'W.P.V.',
    //   icon: <VscGraphLine />,
    // },
    // variation_last_four_weeks: {
    //   name: 'Monthly Price Variation',
    //   shortName: 'M.P.V.',
    //   icon: <VscGraphLine />,
    // },
    // variation_last_six_months: {
    //   name: 'Semestral Price Variation',
    //   shortName: 'S.P.V.',
    //   icon: <VscGraphLine />,
    // },
  }
  return (
    <div>
      {/* Filter Button + Name */}

      <button
        onClick={() => setOpened(!opened)}
        className='h-16 gray-box bg-grey-bone mb-2 items-center w-96 tracking-wider font-plus font-medium text-grey-content hover:text-[#7c7b7b] flex justify-between cursor-pointer transition-all'
      >
        {/* Icon */}
        <span className='hidden sm:block text-lg'>
          {filterOptions[filterBy].icon}
        </span>

        {/* Name */}
        <p className='hidden sm:block'>
          {filterOptions[filterBy].shortName ?? filterOptions[filterBy].name}
        </p>
        {/* Mobile Name */}
        <p className='block sm:hidden'>Stats</p>
        {/* Down/Up Arrow */}

        <IoIosArrowDown
          className={
            (isPremium ? '' : 'opacity-0 ') +
            (opened ? 'rotate-180 ' : '') +
            'transition-all duration-500 relative bottom-[1px]'
          }
        />
      </button>
      {/* FilterOptions */}
      <div
        className={(opened && 'mb-1 md:mb-0') + 'md:absolute flex flex-col gap-2'}
      >
        {opened &&
          isPremium &&
          typedKeys(filterOptions).map(
            (filter) =>
              filter !== filterBy && (
                <div key={filter}>
                  <Fade duration={500} direction='down'>
                    <button
                      className=' flex gray-box gap-4 bg-opacity-100 items-center  font-plus font-medium text-grey-content hover:text-[#7c7b7b] w-96 text-sm md:text-base'
                      onClick={() => {
                        setFilterBy(filter)
                        setOpened(false)
                      }}

                    >
                      {filterOptions[filter].icon}
                      <span className='whitespace-nowrap tooltip' data-tooltip={filterOptions[filter].description}>
                        {filterOptions[filter].name}
                      </span>
                    </button>
                  </Fade>
                </div>
              )
          )}
      </div>
    </div>
  )
}

export default MapChooseFilter
