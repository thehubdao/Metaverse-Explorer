import { FiExternalLink } from 'react-icons/fi'
import { OptimizedImage } from '..'
import { Metaverse } from '../../../lib/metaverse'
import { SingleLandAPIResponse } from '../../../lib/valuation/valuationTypes'
interface Props {
  land: SingleLandAPIResponse
  metaverse: Metaverse
}
const ExternalAssetLink = ({
  metaverse,
  land,
}: Props) => {

  return (
    <div className='w-[50%] relative flex lg:flex-col gap-3 lg:gap-4 xl:gap-6'>
      {/* External Img Link */}
      <a
        href={land.external_link || ''}
        target='_blank'
        className='hover:shadow-dark relative h-full w-full '
      >
        <OptimizedImage
          src={land.images.image_url || '/images/mgh_logo.svg'}
          className=""
          layout={'fill'}
        />

        <FiExternalLink className='absolute top-0 right-0 text-white text-xs backdrop-filter backdrop-blur-sm rounded-xl w-6 h-6 p-1' />

        {metaverse === "sandbox" && <img className='rounded-full p-2 bg-grey-bone h-16 w-16 absolute bottom-3 left-3' src="/images/the-sandbox-sand-logo.png" />}
        {metaverse === "decentraland" && <img className='rounded-full p-2 bg-grey-bone h-16 w-16 absolute bottom-3 left-3' src="/images/decentraland-mana-logo.png" />}
        {metaverse === "somnium-space" && <img className='rounded-full p-2 bg-grey-bone h-16 w-16 absolute bottom-3 left-3' src="/images/somnium-space-cube-logo.webp" />}

      </a>
    </div>
  )
}

export default ExternalAssetLink
