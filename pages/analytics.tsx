import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
    ChartInfo,
    fetchChartData,
    RichList,
} from '../components/Analytics/fetchChartData'
import { Metaverse } from '../lib/metaverse'
import { formatName, getState } from '../lib/utilities'
import Head from 'next/head'
import {
    AnalyticsChart,
    AnalyticsMvChoice,
    chartRoutes,
} from '../components/Analytics'
import { ICoinPrices } from '../lib/valuation/valuationTypes'
import { RiLoader3Fill } from 'react-icons/ri'
import { Loader } from '../components'

import { BsQuestionCircle } from 'react-icons/bs'
const analyticsState = ['loading', 'loaded', 'firstLoad'] as const
type AnalyticsState = typeof analyticsState[number]

interface Props {
    prices: ICoinPrices
}

const Analytics: NextPage<Props> = ({ prices }) => {
    const [metaverse, setMetaverse] = useState<Metaverse>('sandbox')
    type RouteValues = Partial<
        Record<typeof chartRoutes[number]['route'], ChartInfo[]>
    >
    const [values, setValues] = useState<RouteValues>({})
    const [state, setState] = useState<AnalyticsState>('firstLoad')
    const [loading, loaded, firstLoad] = getState(state, [...analyticsState])
    const [markCap, setMarkCap] = useState(0)
    const [richList, setRichList] = useState<RichList>()

    useEffect(() => {
        const salesVolumeCall = async () => {
            //firstLoad shows loader instead of charts, we use it for the initial Load.
            state !== 'firstLoad' && setState('loading')
            const routesValues: RouteValues = {}
            await Promise.all(
                chartRoutes.map(async (_, i) => {
                    routesValues[chartRoutes[i].route] = (await fetchChartData(
                        metaverse,
                        chartRoutes[i].route
                    )) as ChartInfo[]
                })
            )


            setValues(routesValues)
            setMarkCap((await fetchChartData(metaverse, 'mCap')) as number)
            setRichList(
                (await fetchChartData(metaverse, 'richList')) as RichList
            )
            setState('loaded')
        }
        salesVolumeCall()
    }, [metaverse])
    return (
        <>
            <Head>
                <title>MGH | Analytics</title>
                <meta name="description" content="Analytics Dashboard" />
            </Head>
            <div className="w-full max-w-7xl py-8 xl:pt-0 bg-grey-lightest rounded-lg p-8 ">
                {/* Main Header */}
                <div className="border-t border-l border-white/10 p-5 flex flex-col md:flex-row justify-between items-center mb-16 mt-5 bg-grey-dark rounded-xl">
                    <h1 className="lg:text-5xl text-3xl text-grey-content font-plus mb-0 ">
                        Analytics
                    </h1>
                    {/* Links Wrapper */}
                    <div className="flex gap-5">
                        {/* Links */}
                        {['portfolio', 'watchlist', 'valuation'].map(
                            (option) => (
                                <Link key={option} href={`/${option}`}>
                                    <a className="hover:scale-105 font-bold font-plus text-grey-content text-2xl px-3 sm:px-5 py-3 flex items-center justify-center rounded-3xl shadowDiv">
                                        <span className="text-base sm:text-lg md:text-xl">
                                            {formatName(option)}
                                        </span>
                                    </a>
                                </Link>
                            )
                        )}
                    </div>
                </div>
                {/* Wrapper Metaverse Buttons - MarketCap/Owners */}
                <div className="flex flex-col lg:flex-row gap-5 gray-box bg-opacity-5 w-fit m-auto mb-16 p-3 sm:p-5 ">
                    {/* Metaverse Choice Buttons */}
                    <AnalyticsMvChoice
                        metaverse={metaverse}
                        setMetaverse={setMetaverse}
                    />
                    {/* Market Cap - Owners Land % */}
                    <div className="w-fit flex flex-col justify-center text-base  sm:text-lg font-medium text-grey-content font-plus whitespace-nowrap">
                        <p className="mb-8 flex gap-1">
                            Lands held by the top 1% of holders:{' '}
                            {loaded ? (
                                richList?.pctParcels &&
                                (richList.pctParcels * 100).toFixed() + '%'
                            ) : (
                                <RiLoader3Fill className="animate-spin-slow h-5 w-5 xs:h-6 xs:w-6" />
                            )}
                        </p>
                    </div>
                </div>

                {/* Loader for Initial Fetch */}
                {firstLoad ? (
                    <Loader />
                ) : (
                    /* Charts Wrapper */
                    <ul className="flex flex-col gap-12">
                        {/* Charts */}
                        {chartRoutes.map((element, index) => {
                            if (values[element.route])
                                return (
                                    <li key={index}>
                                        <h3 className="text-grey-content font-plus relative text-xl md:text-xl lg:text-2xl flex h-[70px]">
                                            {element.label}{' '}
                                                <BsQuestionCircle className="text-gray-300 cursor-pointer peer bottom-[2px] ml-[5px] " />
                                                <p className="relative -top-1 left-[1%] border border-gray-500 p-2 rounded-lg bg-black bg-opacity-10 backdrop-filter backdrop-blur font-medium text-xs text-gray-200 hidden peer-hover:block w-70 ">
                                                    {element.description}
                                                </p>
                                        </h3>
                                        <AnalyticsChart
                                            fetching={loading}
                                            prices={prices}
                                            metaverse={metaverse}
                                            data={values[element.route]!}
                                            label={element.label}
                                        />
                                    </li>
                                )
                        })}
                    </ul>
                )}
            </div>
        </>
    )

}

export async function getServerSideProps() {
    const coin = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cthe-sandbox%2Cdecentraland%2Caxie-infinity%2Csomnium-space-cubes&vs_currencies=usd'
    )
    const prices = await coin.json()
    return {
        props: {
            prices,
        },
    }
}
export default Analytics
