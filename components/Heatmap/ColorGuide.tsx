import React from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import { PercentFilter, MapFilter } from '../../lib/heatmap/heatmapCommonTypes'
import { FILTER_COLORS } from '../../lib/heatmap/valuationColoring'
import { ValueOf } from '../../lib/types'
import { typedKeys } from '../../lib/utilities'

interface Props {
  setPercentFilter: React.Dispatch<React.SetStateAction<PercentFilter>>
  percentFilter: PercentFilter
  filterBy: MapFilter
}

const ColorGuide = ({ percentFilter, setPercentFilter, filterBy }: Props) => {
  const colorOptions: Record<number, PercentFilter> = {
    1: 20,
    2: 40,
    3: 60,
    4: 80,
    5: 100,
  }

  const MESSAGE_BY_FILTER: Record<MapFilter, string> = {
    eth_predicted_price: 'predicted price',
    listed_lands: 'listed lands',
    transfers: 'transfers',
    price_difference: 'price difference',
    basic: 'basic',
    floor_adjusted_predicted_price: "floor adjusted predicted price",
    last_month_sells: "Sales of the last seven days"

    // Not using this filters for now.. will delete if permanent
    // variation_last_week: 'variation las week',
    // variation_last_four_weeks: 'variation mounth',
    // variation_last_six_months: 'variation semester',
  }

  const handleColorClick = (percent: ValueOf<typeof colorOptions>) => {
    if (percentFilter === percent) {
      setPercentFilter(undefined)
    } else {
      setPercentFilter(percent)
    }
  }
  return (
    <ul className='flex gap-2 gray-box bg-grey-bone h-16 items-baseline w-[248px]'>
      {/* Best/Min */}
      <li className='text-grey-content text-sm font-semibold'>
        {filterBy === 'price_difference' ? 'Best' : 'Min'}
      </li>
      {typedKeys(FILTER_COLORS).map(
        (color, i) =>
          i !== 0 && (
            <li key={color} className='relative'>
              {/* Color Tile */}
              <button
                style={{ background: FILTER_COLORS[color] }}
                className={
                  'w-4 h-4 top-[2px] peer cursor-pointer ' +
                  (percentFilter &&
                    colorOptions[i] !== percentFilter &&
                    'opacity-30')
                }
                onClick={() => handleColorClick(colorOptions[i])}
              />
              {/* Text */}
              <span className='hidden peer-hover:block absolute -top-5 text-grey-content font-semibold text-xs'>
                {colorOptions[i]}%
              </span>
            </li>
          )
      )}
      {/* Max/Worst */}
      <li className='text-grey-content text-sm font-semibold'>
        {filterBy === 'price_difference' ? 'Worst' : 'Max'}
      </li>
      <BsQuestionCircle className='text-grey-content cursor-pointer peer relative bottom-[2px]' />
      <p className='absolute -top-7 border border-gray-500 -left-6 xs:left-0 p-2 rounded-lg bg-black bg-opacity-10 backdrop-filter backdrop-blur font-medium text-xs text-gray-200 hidden peer-hover:block w-70'>
        Message for {MESSAGE_BY_FILTER[filterBy]}
      </p>
    </ul>
  )
}

export default ColorGuide
