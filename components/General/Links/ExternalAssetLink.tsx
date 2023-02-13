import { FiExternalLink } from 'react-icons/fi'
import { ExternalLink } from '.'
import { OptimizedImage } from '..'
import { createOpenSeaLink } from '../../../backend/services/openSeaDataManager'
import { Metaverse } from '../../../lib/metaverse'
import { IAPIData } from '../../../lib/types'
import { formatName } from '../../../lib/utilities'
import { SingleLandAPIResponse } from '../../../lib/valuation/valuationTypes'
import {
  handleLandName,
  handleTokenID,
} from '../../../lib/valuation/valuationUtils'
interface Props {
  width?: number
  height?: number
  layout?: 'intrinsic' | 'fixed' | 'fill' | 'responsive' | undefined
  land: SingleLandAPIResponse
  landId: string
  metaverse: Metaverse
}
const ExternalAssetLink = ({
  metaverse,
  land,
  landId,
  width,
  height,
  layout,
}: Props) => {
  const openSeaLink = createOpenSeaLink(metaverse, landId)
  return (
    <div className='w-full relative flex lg:flex-col gap-3 lg:gap-4 xl:gap-6'>
      {/* External Img Link */}
      <a
        href={land.external_link || ''}
        target='_blank'
        className='hover:shadow-dark block relative w-[50vw] xs:w-32 sm:w-36 lg:w-full h-full'
      >
        <OptimizedImage

          src={land.images.image_url || '/images/mgh_logo.png'}

          rounded='lg'
          layout={layout}
          width={width || 150}
          height={height || 150}
        />

        <FiExternalLink className='absolute top-0 right-0 text-white text-xs backdrop-filter backdrop-blur-sm rounded-xl w-6 h-6 p-1' />
      </a>

      {/* Links and Info */}
      <div className='flex flex-col gap-6 md:gap-3'>
        {/* Name and Id */}
        <div>
          {/* Asset Name */}
          <h3 className='text-base xs:text-xl lg:font-bold 2xl:text-2xl lg:text-2xl md:text-lg p-0 leading-4  text-grey-content'>
            {handleLandName(metaverse, land.coords)}
          </h3>
          {/* Asset ID */}
          <p className='text-xs font-medium text-grey-content'>
            Token ID: {handleTokenID(landId)}
          </p>
        </div>
        {/* External Links */}
        <div className='flex flex-col lg:flex-row gap-5 lg:items-center'>
          {openSeaLink && <ExternalLink href={openSeaLink} text='OpenSea' />}
          <ExternalLink
            href={land.external_link || ''}
            text={formatName(metaverse)}
          />
        </div>
      </div>
    </div>
  )
}

export default ExternalAssetLink
