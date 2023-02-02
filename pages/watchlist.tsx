import axios from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { FaWallet } from 'react-icons/fa'

// web3auth functions
import { useAccount, useConnect } from 'wagmi'
import ConnectButton from '../components/ConnectButton'

import OvalButton from '../components/General/Buttons/OvalButton'
import GeneralSection from '../components/GeneralSection'
import { MapInitMvChoice } from '../components/Heatmap'
import MetaverseCard from '../components/Watchlist/MetaverseCard'
import SearchLandForm from '../components/Watchlist/SearchForm'
import { Metaverse } from '../lib/metaverse'

const headerList = [
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

const metaverseOptions = [
    {
        name: 'Sandbox',
        logo: '/images/the-sandbox-sand-logo.png',
    },
    {
        name: 'Decentraland',
        logo: '/images/decentraland-mana-logo.png',
    },
    {
        name: 'Somnium space',
        logo: '/images/somnium-space-cube-logo.webp',
    },
]

const Watchlist: NextPage = () => {
    const [metaverse, setMetaverse] = useState<Metaverse>()
    const [watchList, setWatchList] = useState()
    const { address } = useAccount()

    useEffect(() => {
        const getWatchList = async () => {
          const watchlistrequest = await axios.get(`${process.env.ITRM_SERVICE}/watchlistService/getWatchlist?address=${address}`)
          const watchlist = watchlistrequest.data
          setWatchList(watchlist)
        }
        getWatchList()
    }, [])

    return (
        <>
            <Head>
                <title>MGH - NFT Valuation</title>
                <meta name="description" content="" />
            </Head>

            <div className="pt-24 w-full" />

            <GeneralSection
                sectionTitle="Your Watchlist"
                optionList={headerList}
            >
                {address ? (
                    <div className="w-full flex flex-col justify-center items-center">
                        {/* Metaverse Card selector */}
                        <div className="flex flex-wrap gap-10 my-10">
                            {metaverseOptions.map((option) => {
                                return (
                                    <MetaverseCard
                                        currentMetaverse={metaverse}
                                        imageUrl={option.logo}
                                        label={option.name}
                                        setMetaverse={setMetaverse}
                                    />
                                )
                            })}
                        </div>

                        {/* Add land inputs */}
                        <div className="flex w-full justify-center items-center gap-24">
                            <SearchLandForm searchBy="tokenId" />
                            <SearchLandForm searchBy="coordinates" />
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        {/* Auth Button */}
                        <ConnectButton />
                    </div>
                )}
            </GeneralSection>
        </>
    )
}

export default Watchlist
