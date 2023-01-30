import React from 'react'
import { LegendFilter } from '../../lib/heatmap/heatmapCommonTypes'
import { LEGEND_COLORS } from '../../lib/heatmap/valuationColoring'
import { Metaverse } from '../../lib/metaverse'
import { formatName, typedKeys } from '../../lib/utilities'

interface Props {
  legendFilter: LegendFilter
  setLegendFilter: React.Dispatch<React.SetStateAction<LegendFilter>>
  metaverse: Metaverse
  className?: string
}

const MapLegend = ({
  legendFilter,
  setLegendFilter,
  metaverse,
  className,
}: Props) => {
  const colors = typedKeys(LEGEND_COLORS).filter((element) => {
    return metaverse === 'decentraland'
      ? true
      : ['watchlist', 'portfolio', 'on-sale'].includes(element)
  })
  const handleLegendClick = (legend: keyof typeof LEGEND_COLORS) => {
    if (colors.includes(legend)) {
      setLegendFilter(
        legend === legendFilter ? undefined : (legend as LegendFilter)
      )
    }
  }

  return (
    <ul
      className={
        'flex flex-col gap-2 gray-box bg-grey-bone rounded-xl p-2 w-fit ' + className
      }
    >
      {colors.map((key) => (
        <li className='flex gap-6 items-center' key={key}>
          <button
            style={{ background: LEGEND_COLORS[key] }}
            className={
              'w-4 h-4 top-[2px] peer cursor-pointer ' +
              (legendFilter && legendFilter !== key && 'opacity-30')
            }
            onClick={() => handleLegendClick(key)}
          />
          <span className='text-grey-content text-sm md:text-base font-semibold'>
            {formatName(key)}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default MapLegend
