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
import { typedKeys } from "../lib/utilities";
import { chartSymbolOptions } from '../components/Analytics'
import { BsQuestionCircle } from 'react-icons/bs'
import GeneralSection from '../components/GeneralSection'
import FilterButton from '../components/Analytics/FilterButton'
import OptimizedImage from '../components/General/OptimizedImage'
import FilterColumn from '../components/Analytics/FilterColumn'
import NoData from '../components/General/NoData'
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

const mosaicOp = {
    twoCol: { logo: '/images/two-col.svg' },
    oneCol: { logo: '/images/one-col.svg' },
}

/* Time intervals options*/
const intervalLabels = {
    daily: { label: "1D", days: 1 },
    week: { label: "5D", days: 5 },
    month: { label: "1M", days: 30 },
    year: { label: "1Y", days: 365 },
    lustrum: { label: "5Y", days: 1825 },
    all: { label: "ALL" },
};

// array grahps filters
const Graphs = [
    { name: "Average Sale Price per Parcel" },
    { name: "Cheapest sale" },
    { name: "Average Price Per m^2" },
    { name: "Total Sales" },
    { name: "Standard Deviation" },
    { name: "Daily Sales Volume" },
    { name: "Max Price" },
]

const arrayMetaverses: Metaverse[] = [
    "sandbox",
    "decentraland",
    "somnium-space"
]

const Analytics: NextPage<Props> = ({ prices }) => {
    type RouteValues = Partial<
        Record<typeof chartRoutes[number]['route'], ChartInfo[]>
    >
    const [allMetaverse, setAllMetaverse] = useState<any>({
        'sandbox': { name: "Sandbox", active: true, color: "#1AABF4", data: undefined },
        'decentraland': { name: "Decentraland", active: true, color: "#FDB522", data: undefined },
        'somnium-space': { name: "Somnium-space", active: true, color: "#292D2E", data: undefined },
    })
    const [state, setState] = useState<AnalyticsState>('firstLoad')
    const [loading, loaded, firstLoad] = getState(state, [...analyticsState])
    const [markCap, setMarkCap] = useState(0)
    const [richList, setRichList] = useState<RichList>()
    const [interval, setInterval] = useState<TimeInterval>("month");
    const [symbol, setSymbol] = useState<keyof typeof chartSymbolOptions>("ETH");
    const [isData, setIsData] = useState<boolean>(false);
    // buttons mosaic
    const [mosaicButton, setMosaicButton] = useState<keyof typeof mosaicOp>("twoCol");
    // filters
    const [openedFilters, setOpenedFilters] = useState<boolean>(false);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [noFilters, setNoFilters] = useState<number>(0)

    const handleGraphFilter = (selectedFilter: string[], noFilter: number) => {
        setSelectedFilters(selectedFilter)
        setNoFilters(noFilter)
    }

    type TimeInterval = keyof typeof intervalLabels;

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
                else if (allMetaverse[name].data.avgPriceParcel
                    == undefined && allMetaverse[name].data.avgPriceParcelPerArea
                    == undefined && allMetaverse[name].data.floorPrice
                    == undefined && allMetaverse[name].data.maxPrice
                    == undefined && allMetaverse[name].data.salesVolume
                    == undefined && allMetaverse[name].data.stdSalesPrices
                    == undefined && allMetaverse[name].data.totalNumberOfSales
                    == undefined) {
                    setIsData(true)
                }

                setMarkCap((await fetchChartData(name, 'mCap')) as number)
                setRichList(
                    (await fetchChartData(name, 'richList')) as RichList
                )
            }
            setState('loaded')
        }
        salesVolumeCall()
    }, [allMetaverse])

    useEffect(() => {
        setInterval(interval)
    }, [mosaicButton])

    return (
        <>
            <Head>
                <title>MGH | Analytics</title>
                <meta name="description" content="Analytics Dashboard" />
            </Head>
            <div className="pt-32 w-full">
                {/* Main Header */}
                {/* General Section Layout */}
                <GeneralSection
                    sectionTitle="Analytics"
                    optionList={headerList}
                    backgroundClass={``}
                    children={undefined}
                />
                {/* Market Cap - Owners Land % */}

                {
                    isData ?
                        <div className="mb-28">
                            <NoData label="This service is currently experimenting some issues. Please come back later" />
                        </div>
                        :
                        <>
                            {/* <p className="px-11 py-24 flex gap-1 font-bold justify-center text-base tracking-[0.375em]">
                                LANDS HELD BY THE TOP 1% OF HOLDERS:{' '}
                                {loaded ? (
                                    richList?.pctParcels &&
                                    (richList.pctParcels * 100).toFixed() + '%'
                                ) : (
                                    <RiLoader3Fill className="animate-spin-slow h-5 w-5 xs:h-6 xs:w-6" />
                                )}
                            </p> */}
                            <div className="grid grid-cols-4 gap-5 w-full mt-10">
                                <FilterButton
                                    openedFilters={openedFilters}
                                    setOpenedFilters={setOpenedFilters}
                                />
                                {/* Wrapper Metaverse Options Buttons */}
                                <div className='col-span-3'>
                                    <div className='flex items-center justify-between pr-16 mb-10'>
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
                                                        className={`flex flex-col items-center justify-center rounded-xl cursor-pointer p-2 w-16 h-12 group focus:outline-none bg-[#F9FAFB] ${symbol === arrSymbol
                                                            ? 'border-opacity-20 nm-inset-medium'
                                                            : 'nm-flat-medium border-opacity-20 hover:border-opacity-100'
                                                            } border border-white transition duration-300 ease-in-out`}
                                                        onClick={() => setSymbol(arrSymbol)}
                                                    >
                                                        {/* arrSymbol === 'METAVERSE' */
                                                            //? chartSymbolOptions[arrSymbol][arrayMetaverses[index]]
                                                            /* : */ arrSymbol}
                                                    </button>
                                                ))}
                                            </div>
                                            {/* Interval Buttons */}
                                            <div className="flex gap-3 w-full pr-7">
                                                {typedKeys(intervalLabels).map((arrInterval) => (
                                                    <button
                                                        key={arrInterval}
                                                        className={`flex flex-col items-center justify-center rounded-xl cursor-pointer p-2 w-12 h-12 group focus:outline-none bg-[#F9FAFB] ${interval === arrInterval
                                                            ? 'border-opacity-20 nm-inset-medium'
                                                            : 'nm-flat-medium border-opacity-20 hover:border-opacity-100'
                                                            } border border-white transition duration-300 ease-in-out`}
                                                        onClick={() => setInterval(arrInterval)}
                                                    >
                                                        {intervalLabels[arrInterval]["label"]}
                                                    </button>
                                                ))}
                                            </div>
                                            {/* mosaic Buttons */}
                                            <div className="flex gap-3 w-full ">
                                                {typedKeys(mosaicOp).map((arrMosaic) => (
                                                    <button
                                                        key={arrMosaic}

                                                        className={`flex flex-col items-center justify-center rounded-xl cursor-pointer p-2 w-12 h-12 group focus:outline-none bg-[#F9FAFB] ${mosaicButton === arrMosaic
                                                            ? 'border-opacity-20 nm-inset-medium'
                                                            : 'nm-flat-medium border-opacity-20 hover:border-opacity-100'
                                                            } border border-white transition duration-300 ease-in-out`}
                                                        onClick={() => setMosaicButton(arrMosaic)}
                                                    >
                                                        <OptimizedImage
                                                            src={mosaicOp[arrMosaic].logo}
                                                            width={25}
                                                            height={48}
                                                            objectFit='contain'
                                                            className={` ${mosaicOp[arrMosaic].logo ? 'grayscale-0' : 'grayscale'
                                                                } group-hover:grayscale-0 transition duration-300 ease-in-out`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {openedFilters && (
                                    <FilterColumn
                                        selectedFilters={selectedFilters}
                                        handleGraphFilter={handleGraphFilter}
                                        graphFilter={Graphs}
                                    />
                                )}

                                <div className={`${openedFilters ? "col-span-3" : "col-span-full"} `}>
                                    {/* Loader for Initial Fetch */}
                                    {firstLoad ? (
                                        <Loader size={0} color={'blue'} />
                                    ) : (
                                        /* Charts Wrapper */
                                        <ul className={`grid  gap-12 w-full mr-7 my-5 px-16 ${mosaicButton === 'twoCol'
                                            ? 'grid-cols-2'
                                            : 'grid-cols-1'
                                            } `}>
                                            {/* Charts */}
                                            {chartRoutes.map((element, index) => {
                                                if (selectedFilters.includes(element.label) || noFilters === 0) {
                                                    return (
                                                        <li key={index} className='nm-flat-medium p-8 break-inside-avoid rounded-xl bg-[#F9FAFB]'>
                                                            <div className='flex flex-row flex-nowrap items-baseline'>
                                                                <img src='/images/analytics-icon-charts.svg' className='pr-2'></img>
                                                                <h4 className="text-grey-content font-plus relative text-xl md:text-xl lg:text-base font-bold flex h-[70px] align-middle">
                                                                    {element.label}{' '}
                                                                    <BsQuestionCircle className="text-black-300 cursor-pointer peer bottom-[2px] ml-[10px] " />
                                                                    <p className="relative -top-1 left-[1%] border border-black-500 p-2 rounded-lg bg-black bg-opacity-10 backdrop-filter backdrop-blur font-medium text-xs hidden peer-hover:block w-60 ">
                                                                        {element.description}
                                                                    </p>
                                                                </h4>
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
                                                                updateMosaic={mosaicButton}
                                                                openedFilters={openedFilters}
                                                            />
                                                        </li>
                                                    )
                                                }
                                            })}
                                        </ul>
                                    )}

                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    )

}

export async function getServerSideProps() {
    let prices = {
        "axie-infinity": {
            "usd": 0
        },
        "decentraland": {
            "usd": 0
        },
        "ethereum": {
            "usd": 0
        },
        "somnium-space-cubes": {
            "usd": 0
        },
        "the-sandbox": {
            "usd": 0
        }
    }
    try {
        const coin = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cthe-sandbox%2Cdecentraland%2Caxie-infinity%2Csomnium-space-cubes&vs_currencies=usd"
        );
        prices = await coin.json();
    } catch (error) {
        console.log(error)
    }
    return {
        props: {
            prices,
        },
    }
}
export default Analytics
