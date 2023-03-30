import React from 'react'
import { BsExclamationCircleFill } from 'react-icons/bs'
import { Metaverse } from '../../lib/metaverse'
import { formatName, typedKeys } from '../../lib/utilities'
import { OptimizedImage } from '../General'

interface Props {
  setMetaverse: React.Dispatch<React.SetStateAction<Metaverse | undefined>>
  metaverse?: Metaverse
}

const MapInitMvChoice = ({ metaverse, setMetaverse }: Props) => {
  const mvOptions = {
    sandbox: { logo: '/images/the-sandbox-sand-logo.png' },
    decentraland: { logo: '/images/decentraland-mana-logo.png' },
    /*     'axie-infinity': { logo: '/images/axie-infinity-axs-logo.png' }, */
    'somnium-space': { logo: '/images/somnium-space-cube-logo.webp' }
  }

  const mvTitle = {
    sandbox: 'The Sandbox',
    decentraland: 'Decentraland',
    'somnium-space': 'Somnium Space'
  }

  return (
    <div className='w-full h-full py-14 bg-[#f8f9fd] rounded-3xl'>
      {/* Title */}
      <h2 className='text-grey-content font-plus font-bold rounded-2xl lg:text-3xl text-2xl text-center my-8'>
        Choose a Metaverse
      </h2>

      <div className='flex space-x-2 items-center justify-center bg-[#eceef8] rounded-2xl w-fit m-auto py-2 px-24'>
        <BsExclamationCircleFill className={`text-2xl z-10 text-[#6196FF]`} />
        <p className='flex text-xs xs:text-base xl:text-base font-normal font-plus text-grey-content pl-3'>
          You can request up to &nbsp;<span className='font-bold'>10 free valuations</span>, after that pro version is needed
        </p>
      </div>

      {/* Metaverse Buttons */}
      <div className='flex justify-center gap-16 pt-20'>
        {typedKeys(mvOptions).map((landKey) => (
          <button
            key={landKey}
            onClick={() => setMetaverse(landKey)}
            className={`flex flex-col bg-[#f3f5f8] items-center justify-center space-y-2 rounded-3xl cursor-pointer p-2 px-3 pt-4 w-[240px] h-[320px] group focus:outline-none nm-flat-hard hover:nm-flat-soft transition ease-in-out duration-300 border-white border ${metaverse === landKey
              ? ' text-gray-200'
              : ' hover:border-opacity-100'
              }`}
          >
            <OptimizedImage
              src={mvOptions[landKey].logo}
              height={100}
              width={100}
              objectFit='contain'
              className={`w-10 ${metaverse === landKey ? 'grayscale-0' : 'grayscale'
                } group-hover:grayscale-0 transition duration-300 ease-in-out`}
            />
            <p className='text-grey-content font-plus font-normal text-lg md:text-lg pt-7'>
              {mvTitle[landKey]}
            </p>
          </button>
        ))}
      </div>
      <div className='w-full flex justify-center items-center pt-14'>
        <button
          onClick={() => { window.open('https://magic.store/app/mgh-analytics', '_blank') }}
          className={`flex flex-row bg-[#f3f5f8] rounded-xl cursor-pointer p-2 px-7 group focus:outline-none nm-flat-medium hover:nm-flat-soft transition ease-in-out duration-300 border-white border text-[#130E3A] font-bold text-xs`}>
          <svg width="31" height="31" viewBox="10 13 44 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="sidebar_logo"><path d="M34.698 12.829c-1.798-1.735-4.715-1.735-6.515 0a4.33 4.33 0 0 0 0 6.282l12.325 11.884 2.897-2.794a4.81 4.81 0 0 0 0-6.977l-8.707-8.395Z" fill="url(#msq-logo_svg__a)"></path><path d="m23.537 18.164 24.078 23.581-6.642 6.505-24.078-23.581 6.642-6.505Z" fill="url(#msq-logo_svg__b)"></path><path d="m23.546 34.977 12.33 11.642a4.57 4.57 0 0 1 0 6.482 4.614 4.614 0 0 1-6.508 0l-8.717-8.776c-1.996-1.989-1.996-4.477 0-6.465l2.895-2.883Z" fill="url(#msq-logo_svg__c)"></path><path d="M52.616 29.24a4.475 4.475 0 0 0-6.39 0 4.629 4.629 0 0 0 0 6.479l3.196 3.24 3.194-3.24a4.629 4.629 0 0 0 0-6.48Z" fill="url(#msq-logo_svg__d)"></path><path d="m15.54 27.013 3.194 3.24a4.627 4.627 0 0 1 0 6.479 4.472 4.472 0 0 1-6.389 0 4.629 4.629 0 0 1 0-6.48l3.195-3.24Z" fill="url(#msq-logo_svg__e)"></path><defs><linearGradient id="msq-logo_svg__a" x1="41.627" y1="19.488" x2="19.739" y2="44.267" gradientUnits="userSpaceOnUse"><stop stopColor="#F170A8"></stop><stop offset="0.474" stopColor="#D561CE"></stop><stop offset="1" stopColor="#6EBFFA"></stop></linearGradient><linearGradient id="msq-logo_svg__b" x1="41.627" y1="19.488" x2="19.739" y2="44.267" gradientUnits="userSpaceOnUse"><stop stopColor="#F170A8"></stop><stop offset="0.474" stopColor="#D561CE"></stop><stop offset="1" stopColor="#6EBFFA"></stop></linearGradient><linearGradient id="msq-logo_svg__c" x1="41.627" y1="19.488" x2="19.739" y2="44.267" gradientUnits="userSpaceOnUse"><stop stopColor="#F170A8"></stop><stop offset="0.474" stopColor="#D561CE"></stop><stop offset="1" stopColor="#6EBFFA"></stop></linearGradient><linearGradient id="msq-logo_svg__d" x1="41.627" y1="19.488" x2="19.739" y2="44.267" gradientUnits="userSpaceOnUse"><stop stopColor="#F170A8"></stop><stop offset="0.474" stopColor="#D561CE"></stop><stop offset="1" stopColor="#6EBFFA"></stop></linearGradient><linearGradient id="msq-logo_svg__e" x1="41.627" y1="19.488" x2="19.739" y2="44.267" gradientUnits="userSpaceOnUse"><stop stopColor="#F170A8"></stop><stop offset="0.474" stopColor="#D561CE"></stop><stop offset="1" stopColor="#6EBFFA"></stop></linearGradient></defs></svg>
          <p className='flex flex-col text-left pl-2'>
            GET IT ON <span className='text-sm font-black'>Magic Store</span>
          </p>
        </button>
      </div>
    </div>
  )
}

export default MapInitMvChoice
