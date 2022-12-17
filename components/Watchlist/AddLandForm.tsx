import React, { useState } from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import { AddLandButton } from '.'
import { WalletModal } from '..'
import useConnectWeb3 from '../../backend/connectWeb3'
import { Metaverse } from '../../lib/metaverse'
import { formatName } from '../../lib/utilities'
import { LandsKey } from '../../lib/valuation/valuationTypes'
import { WatchListState } from '../../pages/watchlist'
import { OptimizedImage } from '../General'
import WalletButton from '../WalletButton'

interface Props {
  state: WatchListState
  addToWatchList: (
    metaverse: Metaverse,
    landId?: string,
    coordinates?: {
      X: string
      Y: string
    }
  ) => Promise<NodeJS.Timeout | undefined>
  ids: string[]
  landKeys: LandsKey[]
}
const AddLandForm = ({ state, addToWatchList, ids, landKeys }: Props) => {
  const limitReached = ids.length === landKeys.length * 10
  const [landId, setLandId] = useState<string>('')
  const [coordinates, setCoordinates] = useState<{ X: string; Y: string }>({
    X: '',
    Y: '',
  })
  const [metaverse, setMetaverse] = useState<any>('sandbox')
  const [openModal, setOpenModal] = useState(false)
  const { disconnectWallet } = useConnectWeb3()

  const mvOptions = {
    sandbox: { logo: '/images/the-sandbox-sand-logo.png' },
    decentraland: { logo: '/images/decentraland-mana-logo.png' },
/*     'axie-infinity': { logo: '/images/axie-infinity-axs-logo.png' }, */
    'somnium-space': { logo: '/images/somnium-space-cube-logo.webp' }
  }

  const addById = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!metaverse) return
    await addToWatchList(metaverse, landId, undefined)
    setLandId('')
  }

  const addByCoordinates = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!metaverse) return
    await addToWatchList(metaverse, undefined, {
      X: coordinates.X,
      Y: coordinates.Y,
    })
    setCoordinates({ X: '', Y: '' })
  }

  return state === 'noWallet' ? (
    <>
      {openModal && <WalletModal onDismiss={() => setOpenModal(false)} />}

      <div className='w-full flex justify-center'>
        <WalletButton
          onClick={() => setOpenModal(true)}
          disconnectWallet={disconnectWallet}
        />
      </div>
    </>
  ) : (
    <div className='gray-box bg-opacity-10 transition-all w-fit mb-14 flex flex-col md:flex-row gap-6 font-plus'>
      {/* Metaverse Options */}
      <div>
        <p className='font-medium mb-2 text-xs md:text-sm pt-1'>
          Choose Metaverse
        </p>
        <div className='flex items-stretch gap-2'>
          {/* Mapping Through Options */}
          {landKeys.map((landKey) => (
            <button
              disabled={limitReached}
              key={landKey}
              onClick={() => {
                setMetaverse(landKey)}}
              className={`flex flex-col items-center justify-center space-y-2 rounded-xl cursor-pointer p-2 px-3 pt-4 md:w-30 md:h-[9.7rem] w-24 h-24 group focus:outline-none ${
                metaverse === landKey
                  ? 'border-opacity-100 text-gray-200'
                  : 'border-opacity-40 hover:border-opacity-100 text-gray-400 hover:text-gray-200'
              } border border-gray-400 focus:border-opacity-100 transition duration-300 ease-in-out`}
            >
              <OptimizedImage
                src={mvOptions[landKey as keyof typeof mvOptions].logo}
                height={60}
                width={60}
                objectFit='contain'
                className={`w-10 ${
                  metaverse === landKey ? 'grayscale-0' : 'grayscale'
                } group-hover:grayscale-0 transition duration-300 ease-in-out`}
              />
              <p className='font-medium text-xs md:text-sm pt-1 text-grey-content'>
                {formatName(landKey)}
              </p>
            </button>
          ))}
        </div>
      </div>
      {/* Add By Wrapper */}
      <div className='flex flex-col gap-6'>
        {/* Add by Token Id */}
        <form onSubmit={(e) => addById(e)}>
          <div className='flex gap-2 relative items-center'>
            <p
              className={
                'font-medium mb-2 text-xs md:text-sm pt-1 font-plus ' +
                (state === 'successId' && 'text-green-500')
              }
            >
              Add by Token ID
            </p>

            <BsQuestionCircle className='text-gray-300 cursor-pointer peer relative bottom-1' />
            <p className='absolute -top-7 border border-gray-500 -left-6 xs:left-0 pl-2 p-2 rounded-lg bg-black bg-opacity-10 backdrop-filter backdrop-blur font-medium text-xs text-gray-400 hidden peer-hover:block w-70'>
              Find LAND on Opensea &gt; Details &gt; Token ID
            </p>
          </div>
          <div className='flex gap-4 relative'>
            <input
              required
              disabled={limitReached}
              type='number'
              onChange={(e) => setLandId(e.target.value)}
              value={landId}
              placeholder='14271'
              className={
                (state === 'successId'
                  ? 'border-green-500 placeholder-green-500'
                  : 'border-gray-300 placeholder-gray-300') +
                ' bg-transparent block w-[8.5rem] text-grey-content p-3 focus:outline-none border border-opacity-40 hover:border-opacity-100 focus:border-opacity-100 transition duration-300 ease-in-out rounded-xl placeholder-opacity-75'
              }
            />
            {/* Add land Button */}
            <AddLandButton
              addBy='id'
              state={state}
              limitReached={limitReached}
            />

            {/* Warning Texts */}

            {/* Bad Land Query */}
            {state === 'badQueryId' && (
              <p className='font-medium text-xs absolute -bottom-5  text-red-500 mt-1 pl-2 text-left w-full max-w-sm'>
                LAND doesn't exist
              </p>
            )}
            {/* Limit of any lands */}
            {state.includes('limitId') && (
              <p className='font-medium text-xs absolute -bottom-5  text-red-500 mt-1 pl-2 text-left w-full max-w-sm'>
                {state === 'limitIdSandbox'
                  ? 'Sandbox Limit Reached'
                  : 'Decentraland Limit Reached'}
              </p>
            )}
          </div>
        </form>
        {/* Add by Coordinates */}
        <form onSubmit={(e) => addByCoordinates(e)}>
          <p
            className={
              'mb-2 font-medium text-xs md:text-sm pt-1 ' +
              (state === 'successCoordinates' && 'text-green-500')
            }
          >
            Add by Coordinates
          </p>
          <div className='flex gap-4 relative'>
            <div className='flex gap-2'>
              <input
                required
                disabled={limitReached}
                type='number'
                onChange={(e) =>
                  setCoordinates({ ...coordinates, X: e.target.value })
                }
                value={coordinates?.X}
                placeholder='X'
                className={
                  (state === 'successCoordinates'
                    ? 'border-green-500 placeholder-green-500'
                    : 'border-gray-300 placeholder-gray-300') +
                  ' bg-transparent block w-16  text-grey-content p-3 focus:outline-none border border-opacity-40 hover:border-opacity-100 focus:border-opacity-100 transition duration-300 ease-in-out rounded-xl placeholder-opacity-75'
                }
              />
              <input
                required
                disabled={limitReached}
                value={coordinates?.Y}
                onChange={(e) =>
                  setCoordinates({ ...coordinates, Y: e.target.value })
                }
                type='number'
                placeholder='Y'
                className={
                  (state === 'successCoordinates'
                    ? 'border-green-500 placeholder-green-500'
                    : 'border-gray-300 placeholder-gray-300') +
                  ' bg-transparent block w-16  text-white p-3 focus:outline-none border border-opacity-40 hover:border-opacity-100 focus:border-opacity-100 transition duration-300 ease-in-out rounded-xl placeholder-opacity-75'
                }
              />
            </div>
            {/* Add land Button */}
            <AddLandButton
              addBy='coordinates'
              state={state}
              limitReached={limitReached}
            />

            {/* Warning Texts */}

            {/* Bad Land Query */}
            {state === 'badQueryCoordinates' && (
              <p className='font-medium text-xs absolute -bottom-5  text-red-500 mt-1 pl-2 text-left w-full max-w-sm'>
                LAND doesn't exist
              </p>
            )}
            {/* Limit of any lands */}
            {state.includes('limitCoordinates') && (
              <p className='font-medium text-xs absolute -bottom-5  text-red-500 mt-1 pl-2 text-left w-full max-w-sm'>
                {state === 'limitCoordinatesSandbox'
                  ? 'Sandbox Limit Reached'
                  : 'Decentraland Limit Reached'}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default React.memo(AddLandForm)
