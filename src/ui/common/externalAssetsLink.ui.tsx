import { FiExternalLink } from 'react-icons/fi'
import { LandProps } from '../../types/valuationTypes'
import Image from "next/image";
import Link from "next/link";

interface ExternalAssetLinkUIProps {
  land: LandProps,
  isOpen: boolean
}

export default function ExternalAssetLinkUI ({land, isOpen}: ExternalAssetLinkUIProps){
  return (
    <div className='h-full relative flex flex-col gap-3'>
      {/* External Img Link */}
      <Link href={land.external_link || ''} target='blank' className='relative h-full w-full'> 
        <Image src={land.images.image_url} fill alt='land image' className={!isOpen? 'rounded rounded-l-3xl' : 'rounded-3xl'}/>
        <FiExternalLink className='absolute top-0 right-0 text-white text-xs backdrop-filter backdrop-blur-sm rounded-xl w-6 h-6 p-1' />

        {land.metaverse === "The Sandbox" && <Image src='/images/the-sandbox-sand-logo.png' width={55} height={55} alt='sandabox' className='rounded-full p-2 bg-nm-highlight absolute bottom-3 left-3' />}
        {land.metaverse === "Decentraland" && <Image src='/images/decentraland-mana-logo.png' width={55} height={55} alt='decentraland' className='rounded-full p-2 bg-nm-highlight absolute bottom-3 left-3' />}
        {land.metaverse === "Somnium Space" && <Image src='/images/somnium-space-logo.png' width={55} height={55} alt='somniun-space' className='rounded-full p-2 bg-nm-highlight absolute bottom-3 left-3' />}
      </Link>
    </div>
  )
}