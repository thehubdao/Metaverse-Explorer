import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

// web3auth functions
import { useAccount } from 'wagmi'
import ConnectButton from '../components/ConnectButton'

import GeneralSection from '../components/GeneralSection'
import Land from '../components/Watchlist/Land'
import SearchLandForm from '../components/Watchlist/SearchForm'
import { Metaverse } from '../lib/metaverse'
import { addLandToWatchList, removeLandFromWatchList } from '../lib/FirebaseUtilities'
import { formatName, typedKeys } from '../lib/utilities'
import { OptimizedImage } from '../components/General'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { fetchWatchlist } from '../state/watchlist'

const headerList = [
  {
    name: "Heatmap",
    route: "valuation",
  },
  {
    name: 'Portfolio',
    route: 'portfolio',
  },
  {
    name: 'Watchlist',
    route: 'watchlist',
  },
  {
    name: 'Analytics',
    route: 'analytics',
  },
]

const mvOptions = {
  sandbox: { logo: '/images/the-sandbox-sand-logo.png' },
  decentraland: { logo: '/images/decentraland-mana-logo.png' },
  /*     'axie-infinity': { logo: '/images/axie-infinity-axs-logo.png' }, */
  'somnium-space': { logo: '/images/somnium-space-cube-logo.webp' }
}

const Watchlist: NextPage = () => {
  const dispatch = useAppDispatch()
  const [metaverse, setMetaverse] = useState<Metaverse>()
  const [watchlist, setWatchlist] = useState<any>()
  const { address } = useAccount()
  const accessToken: any = useAppSelector((state) => state.account.accessToken)
  const wList = useAppSelector((state) => state.watchlist.list)


  const addLand = async (land: any, metaverse: Metaverse) => {
    await addLandToWatchList(land, address!, metaverse, accessToken.token)
    dispatch(fetchWatchlist({address, accessToken}))
  }

  const removeLand = async (land: any, metaverse: Metaverse) => {
    await removeLandFromWatchList(land, address!, metaverse, accessToken.token)
    dispatch(fetchWatchlist({address, accessToken}))
  }

  useEffect(() => {
    if (!address || !accessToken.token) return;
    dispatch(fetchWatchlist({address, accessToken}))
  }, [])

  useEffect(() => {
    setWatchlist(wList)
  }, [wList])
  
  return (
    <>
      <Head>
        <title>MGH - NFT Valuation</title>
        <meta name="description" content="" />
      </Head>

      <div className="pt-32 w-full" />

      <GeneralSection
        sectionTitle="Your Watchlist"
        optionList={headerList}
      >
        {address ? (
          <div className='bg-[#f8f9fd] rounded-3xl py-16 my-10'>


            {/* Metaverse Card selector */}
            <div className="w-full grid justify-center items-center mb-16 pb-12">
              {/* Metaverse Buttons */}
              <div className='flex flex-wrap justify-center gap-16 pb-10'>
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
                      {formatName(landKey)}
                    </p>
                  </button>
                ))}
              </div>

              {/* Add land inputs */}
              {metaverse && (
                <div className="flex w-full justify-between items-center gap-24">
                  <SearchLandForm searchBy="tokenId" metaverse={metaverse} addLand={addLand} />
                  <SearchLandForm searchBy="coordinates" metaverse={metaverse} addLand={addLand} />
                </div>
              )}
            </div>

            {/* Watch List */}
            <ul className="grid gap-4 lg:gap-12 md:gap-6 md:grid-cols-3 p-8">
              {metaverse &&
                watchlist &&
                watchlist[metaverse] &&
                Object.values(watchlist[metaverse])
                  .map((land: any) => {
                    return (
                      <li
                        key={land.tokenId}
                        className="w-full gray-box shadowNormal"
                      >
                        <Land
                          land={land}
                          landId={land.tokenId}
                          metaverse={metaverse}
                          onTrashClick={
                            removeLand
                          }
                        />
                      </li>
                    )
                  })}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-28">
            {/* Auth Button */}
            <Image
              src="/images//mgh_logo/mgh_logo.svg"
              width={136}
              height={131}
              loading='lazy'
              objectFit='cover'
            />
            <p className='text-grey-icon font-light text-2xl pt-6'>Please log in to show your watchlist</p>
            <ConnectButton />
          </div>
        )}
      </GeneralSection>
    </>
  )
}

export default Watchlist
