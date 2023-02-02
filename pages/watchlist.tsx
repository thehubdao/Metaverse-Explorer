import axios from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { FaWallet } from 'react-icons/fa'
import { Fade } from 'react-awesome-reveal'
// web3auth functions
import { useAccount, useConnect } from 'wagmi'
import ConnectButton from '../components/ConnectButton'

import OvalButton from '../components/General/Buttons/OvalButton'
import GeneralSection from '../components/GeneralSection'
import { MapInitMvChoice } from '../components/Heatmap'
import Land from '../components/Watchlist/Land'
import MetaverseCard from '../components/Watchlist/MetaverseCard'
import SearchLandForm from '../components/Watchlist/SearchForm'
import { Metaverse } from '../lib/metaverse'
import { removeLandFromWatchList } from '../lib/FirebaseUtilities'

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
        key: 'sandbox',
    },
    {
        name: 'Decentraland',
        logo: '/images/decentraland-mana-logo.png',
        key: 'decentraland',
    },
    {
        name: 'Somnium space',
        logo: '/images/somnium-space-cube-logo.webp',
        key: 'somnium-space',
    },
]

const Watchlist: NextPage = () => {
    const [metaverse, setMetaverse] = useState<Metaverse>()
    const [watchlist, setWatchlist] = useState<any>()
    const { address } = useAccount()

    const removeFromWatchlist = async (land: any, metaverse: Metaverse) => {
        await removeLandFromWatchList(land, address!, metaverse)
        const newWatchlist = Object.assign({}, watchlist)
        delete newWatchlist[metaverse][land.tokenId]
        setWatchlist(newWatchlist)
    }

    const getWatchList = async () => {
        const watchlistRequest = await axios.get(
            `${process.env.ITRM_SERVICE}/authservice-mgh/watchlistService/getWatchlist?address=${address}`
        )
        const watchlist = watchlistRequest.data
        setWatchlist(watchlist)
    }

    useEffect(() => {
        getWatchList()
    }, [])

    useEffect(() => {
        if (!watchlist) return
        console.log(watchlist, 'UPDATE')
    }, [watchlist])

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
                    <div>
                        <div className="w-full flex flex-col justify-center items-center">
                            {/* Metaverse Card selector */}
                            <div className="flex flex-wrap gap-10 my-10">
                                {metaverseOptions.map((option) => {
                                    return (
                                        <MetaverseCard
                                            key={option.key}
                                            currentMetaverse={metaverse}
                                            imageUrl={option.logo}
                                            label={option.name}
                                            metaverseKey={
                                                option.key as Metaverse
                                            }
                                            setMetaverse={setMetaverse}
                                        />
                                    )
                                })}
                            </div>

                            {/* Add land inputs */}
                            {metaverse && (
                                <div className="flex w-full justify-center items-center gap-24">
                                    <SearchLandForm searchBy="tokenId" />
                                    <SearchLandForm searchBy="coordinates" />
                                </div>
                            )}
                        </div>
                        <ul className="grid gap-4 lg:gap-12 md:gap-6 md:grid-cols-3 p-8">
                            <Fade
                                duration={400}
                                className="w-full flex justify-center"
                            >
                                {metaverse &&
                                    watchlist &&
                                    watchlist[metaverse] &&
                                    Object.values(watchlist[metaverse])
                                        .filter((land) => land != null)
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
                                                            removeFromWatchlist
                                                        }
                                                    />
                                                </li>
                                            )
                                        })}
                            </Fade>
                        </ul>
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
