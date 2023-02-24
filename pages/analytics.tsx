import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
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

import { BsQuestionCircle } from 'react-icons/bs'
import GeneralSection from '../components/GeneralSection'
const analyticsState = ['loading', 'loaded', 'firstLoad'] as const
type AnalyticsState = typeof analyticsState[number]

interface Props {
    prices: ICoinPrices
}

const headerList = [
    {
		name: "Land Valuation",
		route: "valuation",
	},
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
    const [metaverse, setMetaverse] = useState<Metaverse>('sandbox')
    type RouteValues = Partial<
        Record<typeof chartRoutes[number]['route'], ChartInfo[]>
    >
    type RequiredMetaverse = {
        [metaverse in keyof Metaverse]: Metaverse[metaverse]
    }
    const [metaverses, setMetaverses] = useState<RequiredMetaverse>()
    const [allMetaverse, setAllMetaverse] = useState<any>({
        'sandbox': { name: "Sandbox", active: true, color: "blue", data: undefined },
        'decentraland': { name: "Decentraland", active: true, color: "orange", data: undefined },
        'somnium-space': { name: "Somnium-space", active: true, color: "black", data: undefined },
    })
    const [values, setValues] = useState<RouteValues>({})
    const [state, setState] = useState<AnalyticsState>('firstLoad')
    const [loading, loaded, firstLoad] = getState(state, [...analyticsState])
    const [markCap, setMarkCap] = useState(0)
    const [richList, setRichList] = useState<RichList>()

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
                {/* Wrapper Metaverse Buttons - MarketCap/Owners */}
                <div className="flex flex-col lg:flex-row gap-5 gray-box bg-opacity-5 w-fit m-auto mt-20 mb-24 ">
                    {/* Metaverse Choice Buttons */}
                    <AnalyticsMvChoice
                        allMetaverse={allMetaverse}
                        setAllMetaverse={setAllMetaverse}
                    />
                </div>
                {/* Market Cap - Owners Land % */}
                <div className="nm-flat-hard w-fit m-auto mb-16 flex flex-col justify-center text-base sm:text-lg font-medium text-grey-content font-plus whitespace-nowrap border-1 rounded-3xl">
                    <p className="px-11 py-3.5 flex gap-1 justify-center">
                        LANDS HELD BY THE TOP 1% OF HOLDERS:{' '}
                        {loaded ? (
                            richList?.pctParcels &&
                            (richList.pctParcels * 100).toFixed() + '%'
                        ) : (
                            <RiLoader3Fill className="animate-spin-slow h-5 w-5 xs:h-6 xs:w-6" />
                        )}
                    </p>
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
                                            label={element.label}
                                            route={element.route}
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
