import React from 'react'
import { heatmapMvOptions } from '../../lib/heatmap/heatmapMvOptions'
import { Metaverse } from '../../lib/metaverse'
import ProgressBar from '../General/ProgressBar'
import Loader from '../Loader'

interface Props {
  landsLoaded: number
  metaverse: Metaverse
}

const HeatmapLoader = ({ landsLoaded, metaverse }: Props) => {
  const progress = (landsLoaded / heatmapMvOptions[metaverse].lands) * 100
  return (
    <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col gap-6'>
      <Loader />
      <p className='text-grey-content font-plus text-sm font-bold'>
        Loaded {landsLoaded} Lands of {heatmapMvOptions[metaverse].lands}
      </p>
      <ProgressBar progress={progress} />
    </div>
  )
}

export default HeatmapLoader
