import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import {
    ChartInfo,
    fetchChartData,
    RichList,
} from '../components/Analytics/fetchChartData'
import { Metaverse } from '../lib/metaverse'
import { getState } from '../lib/utilities'
import Head from 'next/head'
import {
    AnalyticsMultiChart,
    AnalyticsMvChoice,
    chartRoutes,
} from '../components/Analytics'
import { ICoinPrices } from '../lib/valuation/valuationTypes'
import { RiLoader3Fill } from 'react-icons/ri'
import { Loader } from '../components'
import { typedKeys } from "../lib/utilities";
import { chartSymbolOptions } from '../components/Analytics'
import { BsQuestionCircle } from 'react-icons/bs'
import GeneralSection from '../components/GeneralSection'
const analyticsState = ['loading', 'loaded', 'firstLoad'] as const
type AnalyticsState = typeof analyticsState[number]

interface Props {
    prices: ICoinPrices
}

const headerList = [
    {
        name: "Portfolio",
        route: "portfolio",
    },
    {
        name: "Watchlist",
        route: "watchlist",
    },
    {
        name: "Analytics",
        route: "analytics",
    },
];

const arrayMetaverses: Metaverse[] = [
    "sandbox",
    "decentraland",
    "somnium-space"
]

const Analytics: NextPage<Props> = ({ prices }) => {
    type RouteValues = Partial<
        Record<typeof chartRoutes[number]['route'], ChartInfo[]>
    >
    type RequiredMetaverse = {
        [metaverse in keyof Metaverse]: Metaverse[metaverse]
    }
    const [metaverses, setMetaverses] = useState<RequiredMetaverse>()
    const [allMetaverse, setAllMetaverse] = useState<any>({
        'sandbox': { name: "Sandbox", active: true, color: "#1AABF4", data: undefined },
        'decentraland': { name: "Decentraland", active: true, color: "#FDB522", data: undefined },
        'somnium-space': { name: "Somnium-space", active: true, color: "#292D2E", data: undefined },
    })
    const [values, setValues] = useState<RouteValues>({})
    const [state, setState] = useState<AnalyticsState>('firstLoad')
    const [loading, loaded, firstLoad] = getState(state, [...analyticsState])
    const [markCap, setMarkCap] = useState(0)
    const [richList, setRichList] = useState<RichList>()

    /* Time intervals options*/
    const intervalLabels = {
        daily: { label: "1D", days: 1 },
        week: { label: "5D", days: 5 },
        month: { label: "1M", days: 30 },
        year: { label: "1Y", days: 365 },
        lustrum: { label: "5Y", days: 1825 },
        all: { label: "ALL" },
    };

    type TimeInterval = keyof typeof intervalLabels;

    const [interval, setInterval] = useState<TimeInterval>("month");

    const [symbol, setSymbol] = useState<keyof typeof chartSymbolOptions>("ETH");

    useEffect(() => {
        const salesVolumeCall = async () => {
            //firstLoad shows loader instead of charts, we use it for the initial Load.
            state !== 'firstLoad' && setState('loading')

            let name: Metaverse;

            for (let i = 0; i < arrayMetaverses.length; i++) {

                let routesValues: RouteValues = {}

                name = arrayMetaverses[i]

                await Promise.all(
                    chartRoutes.map(async (_, i) => {
                        routesValues[chartRoutes[i].route] = (await fetchChartData(
                            name,
                            chartRoutes[i].route
                        )) as ChartInfo[]
                    }),
                )

                if (allMetaverse[name].data == undefined && allMetaverse[name].active == true)
                    setAllMetaverse((prevState: any) => ({
                        ...prevState,
                        [name]: {
                            ...prevState[name],
                            data: routesValues
                        },
                    }))

                setMarkCap((await fetchChartData(name, 'mCap')) as number)
                setRichList(
                    (await fetchChartData(name, 'richList')) as RichList
                )
            }
            setState('loaded')
        }
        salesVolumeCall()
    }, [allMetaverse])
    return (
        <>
            <Head>
                <title>MGH | Analytics</title>
                <meta name="description" content="Analytics Dashboard" />
            </Head>
            <div className="w-full min-w-7xl py-8 xl:pt-24 bg-grey-lightest rounded-lg p-8 justify-center">
                {/* Main Header */}
                {/* General Section Layout */}
                <GeneralSection
                    sectionTitle="Analytics"
                    optionList={headerList}
                    backgroundClass={``}
                    children={undefined}
                />
                {/* Market Cap - Owners Land % */}
                <p className="px-11 py-24 flex gap-1 justify-center">
                    LANDS HELD BY THE TOP 1% OF HOLDERS:{' '}
                    {loaded ? (
                        richList?.pctParcels &&
                        (richList.pctParcels * 100).toFixed() + '%'
                    ) : (
                        <RiLoader3Fill className="animate-spin-slow h-5 w-5 xs:h-6 xs:w-6" />
                    )}
                </p>
                {/* Wrapper Metaverse Options Buttons */}
                <div className='flex items-center justify-between'>
                    <div className="flex flex-col lg:flex-row gap-5 gray-box bg-opacity-5 w-64">
                        {/* Metaverse Choice Buttons */}
                        <AnalyticsMvChoice
                            allMetaverse={allMetaverse}
                            setAllMetaverse={setAllMetaverse}
                        />
                    </div>

                    <div className='flex'>
                        {/* Coin Buttons */}
                        <div className='flex gap-3 w-full px-7'>
                            {typedKeys(chartSymbolOptions).map((arrSymbol, index) => (
                                <button
                                    key={arrSymbol}
                                    className={`flex flex-col items-center justify-center rounded-xl cursor-pointer p-2 w-14 h-10 group focus:outline-none ${symbol === arrSymbol
                                        ? 'border-opacity-20 nm-inset-medium'
                                        : 'nm-flat-medium border-opacity-20 hover:border-opacity-100'
                                        } border border-gray-400 transition duration-300 ease-in-out`}
                                    onClick={() => setSymbol(arrSymbol)}
                                >
                                    {arrSymbol === 'METAVERSE'
                                        ? chartSymbolOptions[arrSymbol][arrayMetaverses[index]]
                                        : arrSymbol}
                                </button>
                            ))}
                        </div>
                        {/* Interval Buttons */}
                        <div className="flex gap-3 w-full px-5">
                            {typedKeys(intervalLabels).map((arrInterval) => (
                                <button
                                    key={arrInterval}
                                    className={`flex flex-col items-center justify-center rounded-xl cursor-pointer p-2 w-10 h-10 group focus:outline-none ${interval === arrInterval
                                        ? 'border-opacity-20 nm-inset-medium'
                                        : 'nm-flat-medium border-opacity-20 hover:border-opacity-100'
                                        } border border-gray-400 transition duration-300 ease-in-out`}
                                    onClick={() => setInterval(arrInterval)}
                                >
                                    {intervalLabels[arrInterval]["label"]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Loader for Initial Fetch */}
                {firstLoad ? (
                    <Loader size={0} color={'blue'} />
                ) : (
                    /* Charts Wrapper */
                    <ul className="grid grid-cols-2 gap-12 w-full mr-7 my-5 bg-[#F9FAFB]">
                        {/* Charts */}
                        {chartRoutes.map((element, index) => {
                            if (allMetaverse.sandbox.data)
                                return (
                                    <li key={index} className='nm-flat-medium p-8 break-inside-avoid rounded-xl '>
                                        <div className='flex flex-row flex-nowrap items-baseline'>
                                            <img src='/images/analytics-icon-charts.svg' className='pr-2'></img>
                                            <h3 className="text-grey-content font-plus relative text-xl md:text-xl lg:text-2xl flex h-[70px] align-middle">
                                                {element.label}{' '}
                                                <BsQuestionCircle className="text-black-300 cursor-pointer peer bottom-[2px] ml-[10px] " />
                                                <p className="relative -top-1 left-[1%] border border-black-500 p-2 rounded-lg bg-black bg-opacity-10 backdrop-filter backdrop-blur font-medium text-xs hidden peer-hover:block w-60 ">
                                                    {element.description}
                                                </p>
                                            </h3>
                                        </div>
                                        <AnalyticsMultiChart
                                            fetching={loading}
                                            prices={prices}
                                            metaverses={arrayMetaverses}
                                            dataMetaverse={allMetaverse}
                                            route={element.route}
                                            interval={interval}
                                            intervalLabels={intervalLabels}
                                            symbol={symbol}
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
