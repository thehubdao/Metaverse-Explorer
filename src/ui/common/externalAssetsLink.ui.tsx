import { FiExternalLink } from 'react-icons/fi';
import Image from "next/image";
import Link from "next/link";
import { SingleLandAPIResponse } from '../../types/valuationTypes';
import { MetaverseOptionsKey, Metaverses } from '../../enums/metaverses.enum';

interface ExternalAssetLinkUIProps {
  land: SingleLandAPIResponse;
  isOpen: boolean;
  metaverse: MetaverseOptionsKey;
}

export default function ExternalAssetLinkUI ({land, isOpen, metaverse}: ExternalAssetLinkUIProps){
  return (
    <div className='h-full relative flex flex-col gap-3'>
      {/* External Img Link */}
      <Link href={land.external_link || ''} target='blank' className='relative h-full w-full'> 
        <Image src={land.images.image_url ?? '/images/noimage.png' } fill alt='land image' className={!isOpen? 'rounded rounded-l-xl' : 'rounded-2xl'}/>
        <FiExternalLink className='absolute top-0 right-0 text-white text-xs backdrop-filter backdrop-blur-sm rounded-xl w-6 h-6 p-1' />

        {metaverse === Metaverses.sandbox && <Image src='/images/the-sandbox-sand-logo.png' width={55} height={55} alt='sandabox' className='rounded-full p-1 bg-nm-highlight absolute bottom-3 left-3' />}
        {metaverse === Metaverses.decentraland && <Image src='/images/decentraland-mana-logo.png' width={55} height={55} alt='decentraland' className='rounded-full p-1 bg-nm-highlight absolute bottom-3 left-3' />}
        {metaverse === Metaverses['somnium-space'] && <Image src='/images/somnium-space-logo.png' width={55} height={55} alt='somniun-space' className='rounded-full p-1 bg-nm-highlight absolute bottom-3 left-3' />}
      </Link>
    </div>
  )
}