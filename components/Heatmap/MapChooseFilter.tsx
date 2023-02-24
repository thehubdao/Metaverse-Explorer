import React from 'react'
import { BiTargetLock, BiTransferAlt, BiBullseye } from 'react-icons/bi'
import { FiMap } from 'react-icons/fi'
import { MdAttachMoney } from 'react-icons/md'
import { VscGraphLine } from 'react-icons/vsc'
import { GiStopwatch } from 'react-icons/gi'
import { MapFilter } from '../../lib/heatmap/heatmapCommonTypes'
import { typedKeys } from '../../lib/utilities'

interface Props {
  filterBy: MapFilter
  setFilterBy: React.Dispatch<React.SetStateAction<MapFilter>>
  onClick: () => void
  opened: boolean
}

const MapChooseFilter = ({ filterBy, setFilterBy, onClick, opened }: Props) => {
  const isPremium = true // This will be replaced with role when we release this feature.
  // const [opened, setOpened] = useState(false)
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
      name: 'Undervalued Grabs',
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
        onClick={() => onClick()}
      >
        {/* Icon */}
        <div className={`hidden sm:flex bg-grey-bone items-center justify-center rounded-full w-12 h-12 ${opened && "rounded-b-none"}`}>
          {filterOptions[filterBy].icon}
        </div>

      </button>
      {/* FilterOptions */}

      {opened &&
        <div className={`flex flex-col space-y-4 md:absolute bg-grey-bone rounded-xl rounded-tl-none p-3 pt-5`}>
          {isPremium &&
            typedKeys(filterOptions).map(
              (filter) =>
                filter !== filterBy && (
                  <div key={filter}>
                    <button
                      className=' flex gray-box gap-4 bg-opacity-100 items-center  font-plus font-medium text-grey-content hover:text-[#7c7b7b] min-w-max text-sm md:text-base'
                      onClick={() => {
                        setFilterBy(filter)
                        onClick()
                      }}

                    >
                      {filterOptions[filter].icon}
                      <span className='whitespace-nowrap tooltip' data-tooltip={filterOptions[filter].description}>
                        {filterOptions[filter].name}
                      </span>
                    </button>
                  </div>
                )
            )}
        </div>}

    </div>
  )
}

export default MapChooseFilter
