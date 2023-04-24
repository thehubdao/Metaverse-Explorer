import { NextPage } from "next";
import { AnyObject } from "immer/dist/internal";
import React, { useEffect, useRef, useState } from "react";
import {
	HeatmapSize,
	LandCoords,
	LegendFilter,
	MapFilter,
	PercentFilter,
	ValuationTile,
} from "../lib/heatmap/heatmapCommonTypes";
import { useVisible } from "../lib/hooks";
import { ICoinPrices } from "../lib/valuation/valuationTypes";
import { IAPIData, IPredictions, UserData } from "../lib/types";
import {
	FloorPriceTracker,
	SalesVolumeDaily,
	TopPicksLands,
	TopSellingLands,
} from "../components/Valuation";
import {
	ColorGuide,
	MapCard,
	MapChooseFilter,
	MapChooseMetaverse,
	MapLegend,
	MapInitMvChoice,
	MapSearch,
	MaptalksCanva,
} from "../components/Heatmap";
import { useAppSelector } from "../state/hooks";
import { FullScreenButton } from "../components/General";
import { Metaverse } from "../lib/metaverse";
import { findHeatmapLand } from "../lib/heatmap/findHeatmapLand";
import Head from "next/head";
import { Heatmap2D } from "../components/Heatmap/index";
import { metaverseInitialCenter } from "../lib/valuation/valuationUtils";
import EstimateAccuracy from "../components/Valuation/EstimateAccuracy";
import GeneralSection from "../components/GeneralSection";
import Footer from "../components/General/Footer";
import Image from "next/image";
import HistoricalFloorPrice from "../components/Valuation/HistoricalFloorPrice";
import SpecificLandModal from "../components/Valuation/SpecificLandModal";
import { getCallsCount, updateCallsCount } from "../lib/FirebaseUtilities";
import { useAccount } from "wagmi";
import router from "next/router";
import ConnectButton from "../components/ConnectButton";
import HotDeals from "../components/Valuation/HotDeals/HotDeals";
import web3authService from "../backend/services/Web3authService";
import { getCoingeckoPrices } from "../backend/services/openSeaDataManager";

// Making this state as an object in order to iterate easily through it
export const VALUATION_STATE_OPTIONS = [
	"loading",
	"loaded",
	"error",
	"loadingQuery",
	"loadedQuery",
	"errorQuery",
] as const;
export type ValuationState = typeof VALUATION_STATE_OPTIONS[number];

const MAX_FREE_VALUATIONS = 10

interface CardData {
	apiData: IAPIData;
	predictions: IPredictions;
	landCoords: { x: string | number; y: string | number };
	name: string | undefined;
}

interface Hovered {
	name?: string;
	coords: { x: number; y: number };
	owner?: string;
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

const metaverseLabels: Record<Metaverse, string> = {
	sandbox: "The Sandbox",
	decentraland: "Decentraland",
	"somnium-space": "Somnium Space"
}

const Valuation: NextPage<{ prices: ICoinPrices }> = ({ prices }) => {
	const [globalData, setglobalData] = useState<AnyObject>({})

	const { token }: any = useAppSelector((state) => state.account.accessToken)
	const { address } = useAccount()

	const [mapState, setMapState] = useState<ValuationState>("loading");
	/* const [loading] = getState(mapState, ['loading']) */

	const [selected, setSelected] = useState<LandCoords>();
	const [hovered, setHovered] = useState<Hovered>({ coords: { x: NaN, y: NaN }, });

	// Hook for Popup
	const { ref, isVisible, setIsVisible } = useVisible(false);
	const [metaverse, setMetaverse] = useState<Metaverse>();
	const [filterBy, setFilterBy] = useState<MapFilter>("basic");
	const [percentFilter, setPercentFilter] = useState<PercentFilter>();
	const [legendFilter, setLegendFilter] = useState<LegendFilter>();
	const [heatmapSize, setHeatmapSize] = useState<HeatmapSize>();

	//Land Modal (and card data)
	const [openSpecificModal, setOpenSpecificModal] = useState<boolean>(false)
	const [cardData, setCardData] = useState<CardData>();

	//Heatmap options
	const [openMetaverseFilter, setOpenMetaverseFilter] = useState(false)
	const [openMapFilter, setOpenMapFilter] = useState(false)
	const [openSearchFilter, setOpenSearchFilter] = useState(false)
	const valuationCount = useRef<number>()

	function isSelected(x: number, y: number) {
		return selected?.x === x && selected?.y === y;
	}

	const mapDivRef = useRef<HTMLDivElement>(null);

	const [dims, setDims] = useState({
		height: mapDivRef.current?.offsetWidth,
		width: mapDivRef.current?.offsetWidth,
	});

	const formatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 4,
	});
	// Function for resizing heatmap
	const resize = () => {
		if (!mapDivRef.current) return;
		setDims({
			height: mapDivRef.current.offsetHeight,
			width: mapDivRef.current.offsetWidth,
		});
	};

	const handleHover = (
		x: number,
		y: number,
		name: string | undefined,
		owner: string | undefined
	) => {
		const coords = { x, y };
		setHovered({ coords, owner, name });
	};

	const getglobalData = async () => {
		if (!metaverse) return;
		try {
			const url = metaverse == "somnium-space"
				? `${process.env.ITRM_SERVICE}/mgh/v2/${metaverse}/globalData` : `${process.env.ITRM_SERVICE}/test/${metaverse}/globalData`
			const response = await fetch(
				url,
				{
					method: "GET"
				}
			);
			setglobalData(await response.json());
		} catch (e) {
			console.log("error", e);
			setMapState("errorQuery");
			return setTimeout(() => setIsVisible(false), 1100);
		}
	};

	// Main Search Function through Clicks,Form inputs.
	const handleMapSelection = async (
		lands?: ValuationTile | any,
		x?: number,
		y: number = 0,
		tokenId?: string,
	) => {
		setCardData(undefined);
		setMapState("loadingQuery");
		setIsVisible(true);
		if (!metaverse) return;
		if (!lands) {
			try {
				let data;
				const parameters = (x !== undefined && y !== undefined) ? `x=${x}&y=${y}` : tokenId ? `tokenId=${tokenId}` : null;
				const response = await fetch(
					`${process.env.ITRM_SERVICE}${metaverse == "somnium-space"/*  || metaverse == "axie-infinity" */
						? ""
						: "/test"
					}/${metaverse}/${/* metaverse == "axie-infinity" */false ? "predict" : "map"
					}?${parameters}`,
					{
						method: "GET",
						body: JSON.stringify(data),
					}
				);
				lands = await response.json();
				let auxLands
				Object.entries(lands).forEach(([key, value]) => {
					auxLands = value
				});
				lands = auxLands

				if (metaverse !== 'somnium-space') {
					const auxY = lands.coords.y
					lands.coords.y = -auxY
				}
				/* 				if (metaverse !== "axie-infinity") {
									Object.entries(lands).forEach(([key, value]) => {
										lands = value;
										lands.land_id = key;
									});
								} */
			} catch (e) {
				console.log("error");
				setMapState("errorQuery");
				return setTimeout(() => setIsVisible(false), 1100);
			}
		}
		try {
			if (!lands.name) throw "myException";
			const landData: any = findHeatmapLand(
				lands,
				prices,
				metaverse,
				{
					x: x,
					y: y,
				},
				tokenId,
				filterBy
			);
			x = lands.coords ? lands.coords.x : lands.center.x;
			y = lands.coords ? lands.coords.y : lands.center.y;
			setSelected({ x, y });
			setMapState("loadedQuery");
			setCardData(landData as CardData);
		} catch (e) {
			setMapState("errorQuery");
			return setTimeout(() => setIsVisible(false), 1100);
		}
	};

	// Use Effect for Metaverse Fetching and Map creation
	useEffect(() => {
		if (metaverse) setHeatmapSize(metaverseInitialCenter[metaverse]);
		resize();
		window.addEventListener("resize", resize);

		return () => window.removeEventListener("resize", resize);
	}, [metaverse, address]);

	useEffect(() => {
		if (!token || !address) {
			return
		}
		const getValuationCount = async () => {
			const callsCount = await getCallsCount(address, token)
			valuationCount.current = callsCount as number
		}
		getValuationCount()
	}, [token])

	useEffect(() => {
		setIsVisible(false);
		setFilterBy("basic");
		getglobalData();
	}, [metaverse]);

	return (
		<>
			<Head>
				<title>MGH | Valuation</title>
				<meta
					name="description"
					content="Land Valuation with our Custom Heatmap"
				/>
			</Head>

			{/* Top Padding or Image */}
			<div className={`relative p-0 mb-24 w-full h-[400px]`}>
				<Image
					src="/images/land_header.png"
					objectFit={'cover'}
					alt='land header'
					layout="fill"
				/>
			</div>

			{/* General Section Layout */}
			<GeneralSection
				sectionTitle="LAND Valuation"
				optionList={headerList}
				backgroundClass={``}
			>
				{!token ? (<div className="relative py-8 h-full">
					<div className="flex flex-col justify-center items-center mt-28">
						{/* Auth Button */}
						<Image
							src="/images/mgh_logo/mgh_logo.svg"
							width={136}
							height={131}
							loading='lazy'
							objectFit='cover'
						/>
						<p className='text-grey-icon font-light text-2xl pt-6'>Please log in to use the valuation tool</p>
						<ConnectButton />
					</div>
				</div>) : (<div >
					{metaverse && <div className="flex items-center justify-between p-8 mt-7">
						<div className="flex flex-col space-y-3 max-w-xl">
							<p className="text-3xl font-semibold">{metaverseLabels[metaverse]}</p>
							<p className="font-medium">The MGH LAND price estimator uses AI to calculate the fair value of LANDs and help you find undervalued ones.  Leverage our heatmap to quickly get an overview of {metaverseLabels[metaverse]} Map and get insights about current price trends. The valuations are updated at a daily basis.</p>
						</div>
						<div className="flex space-x-8 w-full items-center justify-evenly max-w-2xl">
							<div className="flex flex-col space-y-1 items-center">
								<p className="font-black text-3xl whitespace-nowrap">{formatter.format(globalData.stats?.floor_price)} ETH</p>
								<p className="text-sm">Floor</p>
							</div>
							<div className="flex flex-col space-y-1 items-center">
								<p className="font-black text-3xl whitespace-nowrap">{formatter.format(Math.round(globalData.stats?.total_volume))} ETH</p>
								<p className="text-sm">Trading Volume</p>
							</div>
							<div className="flex flex-col space-y-1 items-center">
								<p className="font-black text-3xl whitespace-nowrap">{formatter.format(Math.round(globalData.stats?.market_cap))} ETH</p>
								<p className="text-sm">MCAP</p>
							</div>
							<div className="flex flex-col space-y-1 items-center">
								<p className=" font-black text-3xl whitespace-nowrap">{formatter.format(globalData.stats?.num_owners)}</p>
								<p className="text-sm">Owners</p>
							</div>
						</div>
					</div>}

					<div className="relative py-8 h-full">
						{!metaverse && (
							<MapInitMvChoice
								metaverse={metaverse}
								setMetaverse={setMetaverse}
							/>
						)}

						{metaverse && (
							<div className="rounded-[30px] p-7 nm-flat-medium h-[80vh]">
								<div className="w-full h-full relative" ref={mapDivRef}>

									<div className="absolute top-1 left-1 z-20 flex gap-4 md:w-fit w-full unselectable m-4">
										<div className="md:flex gap-2 md:gap-4 hidden font-medium">
											{/* Metaverse Selection */}
											<MapChooseMetaverse
												metaverse={metaverse}
												setMetaverse={setMetaverse}
												opened={openMetaverseFilter}
												onClick={() => { setOpenMapFilter(false), setOpenMetaverseFilter(!openMetaverseFilter), setOpenSearchFilter(false) }}
											/>
											{/* Filter Selection */}
											<MapChooseFilter
												filterBy={filterBy}
												setFilterBy={setFilterBy}
												opened={openMapFilter}
												onClick={() => { setOpenMapFilter(!openMapFilter), setOpenMetaverseFilter(false), setOpenSearchFilter(false) }}
											/>

											<MapSearch
												mapState={mapState}
												handleMapSelection={handleMapSelection}
												opened={openSearchFilter}
												onClick={() => { setOpenMapFilter(false), setOpenMetaverseFilter(false), setOpenSearchFilter(!openSearchFilter) }}
											/>
										</div>
									</div>

									<p className="flex bg-grey-dark px-4 py-2 absolute bottom-1 left-1 hover:scale-105 transition ease-in-out duration-300 rounded-xl m-4	">
										Unlimited access until April 15th
									</p>


									{/* Color Guide - Hides when MapCard is showing (only mobile) */}
									{filterBy !== "basic" && (
										<div
											className={
												(isVisible && "hidden") +
												" md:block absolute z-20 bottom-1 right-1 unselectable rounded-full bg-grey-dark px-4 py-2 m-4"
											}
										>
											<ColorGuide
												filterBy={filterBy}
												percentFilter={percentFilter}
												setPercentFilter={setPercentFilter}
											/>
										</div>
									)}

									{/* Full screen button - Hides when MapCard is showing (all screens) */}
									{!isVisible && (
										<div className="absolute z-20 top-1 right-1 rounded-full bg-grey-bone m-4 p-2 h-9 w-9">
											<FullScreenButton
												fullScreenRef={mapDivRef}
												className="text-xl text-grey-content"
											/>
										</div>
									)}
									{/*  Map */}
									{metaverse !== "somnium-space" ? (
										<Heatmap2D
											// min and max values for x and y
											minX={heatmapSize?.minX || 0}
											maxX={heatmapSize?.maxX || 0}
											minY={heatmapSize?.minY || 0}
											maxY={heatmapSize?.maxY || 0}
											initialX={heatmapSize?.initialX || 0}
											initialY={heatmapSize?.initialY || 0}
											filter={filterBy}
											// Filter lands by percentage. On bottom left
											percentFilter={percentFilter}
											// Filter lands by utility (watchlist, portfolio, etc..). On bottom right
											// starting position of the map
											x={
												typeof selected?.x == "string"
													? parseFloat(selected?.x)
													: selected?.x
											}
											y={
												typeof selected?.y == "string"
													? parseFloat(selected?.y)
													: selected?.y
											}
											//legend filter
											legendFilter={legendFilter}
											width={dims.width}
											height={dims.height}
											onHover={(
												x: number,
												y: number,
												name?: string,
												owner?: string
											) => {
												handleHover(x, y, name, owner);
											}}
											onClickLand={(
												landRawData: any
											) => {
												const land = JSON.parse(landRawData)
												const { x, y } = land.coords
												if (isSelected(x, y)) {
													setSelected(undefined);
												} else {
													const isntFullScreen = document.fullscreenElement ? false : true
													//UNCOMMENT ON APRIL 15
													/* if (valuationCount.current && valuationCount.current >= MAX_FREE_VALUATIONS) {
														router.push("/purchase")
														return
													} */
													handleMapSelection(undefined, x, y, undefined);
													/* updateCallsCount(address, 1, token)
													if (valuationCount.current != undefined)
														valuationCount.current += 1 */


												}
											}}
											metaverse={metaverse}
										/>
									) : (
										<MaptalksCanva
											filter={filterBy}
											// Filter lands by percentage. On bottom left
											percentFilter={percentFilter}
											// Filter lands by utility (watchlist, portfolio, etc..). On bottom right
											// starting position of the map
											x={
												typeof selected?.x == "string"
													? parseFloat(selected?.x)
													: selected?.x
											}
											y={
												typeof selected?.y == "string"
													? parseFloat(selected?.y)
													: selected?.y
											}
											//legend filter
											legendFilter={legendFilter}
											width={dims.width}
											height={dims.height}
											onClickLand={(
												landRawData: any
											) => {
												const land = JSON.parse(landRawData)
												const { x, y } = land.center
												if (isSelected(x, y)) {
													setSelected(undefined);
												} else {
													const isntFullScreen = document.fullscreenElement ? false : true
													//UNCOMMENT ON APRIL 15
													/* if (valuationCount.current && valuationCount.current >= MAX_FREE_VALUATIONS) {
														router.push("/purchase")
														return
													} */
													handleMapSelection(land, x, y, undefined);
													/* updateCallsCount(address, 1, token)
													if (valuationCount.current != undefined)
														valuationCount.current += 1 */
												}
											}}
											metaverse={metaverse}
										/>
									)}

									{/* Selected Land Card */}
									{isVisible && (
										<div ref={ref} className="absolute bottom-16 right-1 flex flex-col gap-4 m-4">
											<MapCard
												setIsVisible={setIsVisible}
												setOpenSpecificModal={setOpenSpecificModal}
												metaverse={metaverse}
												apiData={cardData?.apiData}
												predictions={cardData?.predictions}
												landCoords={cardData?.landCoords}
												name={cardData?.name}
												mapState={mapState}
											/>
										</div>
									)}

									{/* Map Legend - Hides when MapCard is showing (all screens) */}
									{filterBy === "basic" ? (
										!isVisible && (
											<MapLegend
												className="absolute bottom-1 right-1 m-4"
												legendFilter={legendFilter}
												setLegendFilter={setLegendFilter}
												metaverse={metaverse}
											/>
										)
									) : (
										<></>
									)}

									{/* Specific land modal */}
									{openSpecificModal && metaverse && <SpecificLandModal
										collectionName={metaverseLabels[metaverse]}
										specificAssetSelected={cardData?.apiData}
										setOpenSpecificModal={setOpenSpecificModal}
										predictions={cardData?.predictions}
										landCoords={cardData?.landCoords}
										metaverse={metaverse}
										setIsVisible={setIsVisible}
										coinPrices={prices}
									/>}
								</div>
							</div>
						)}
					</div>
					{/* Hot Deals Lands */}
					{metaverse && (
						<>
							<div className="flex items-center justify-center p-8 mt-7">
								<div className="flex flex-col justify-center space-y-3 max-w-xl text-center">
									<p className="text-grey-content font-bold lg:text-3xl text-2xl text-center">{metaverseLabels[metaverse]} Floor Listings <Image src='/images/icons/hot-icon.svg' width={24} height={26} alt="Hot Deals" className=''/></p>
									<p className="font-medium text-cente">Undervalued floor listings</p>
								</div>
							</div>
							<div className="flex items-center justify-center p-8 mt-7">
								<HotDeals metaverse={metaverse}/>
							</div>
						</>
					)}
					{/* Daily Volume and Floor Price Wrapper */}
					{metaverse && (
						<>
							<div className="grid grid-cols-5 gap-5 mb-20 mt-10">
								<div>
									{/* Daily Volume */}
									<SalesVolumeDaily metaverse={metaverse} coinPrices={prices} />
								</div>
								<div>
									{/* Floor Price */}
									<FloorPriceTracker
										metaverse={metaverse}
										coinPrices={prices}
									/>
								</div>
								<div>
									{/* Estimate accuracy */}
									<EstimateAccuracy metaverse={metaverse} coinPrices={prices} />
								</div>
								<div className="col-span-2">
									{/* Historic Floor Price */}
									<HistoricalFloorPrice metaverse={metaverse} coinPrices={prices} />
								</div>
							</div>
							<div className="rounded-3xl bg-grey-bone p-5 mb-10 nm-flat-hard">
								<TopPicksLands metaverse={metaverse} />
							</div>
							<div className="rounded-3xl bg-grey-bone p-5 nm-flat-hard">
								<TopSellingLands metaverse={metaverse} />
							</div>
						</>
					)}
				</div>)}

				<Footer
					label="The MGH DAO does not provide, personalized investment
							recommendations or advisory services. Any information provided
							through the land evaluation tool and others is not, and should
							not be, considered as advice of any kind and is for
							information purposes only. That land is “valuated” does not
							mean, that it is in any way approved, checked audited, and/or
							has a real or correct value. In no event shall the MGH DAO be
							liable for any special, indirect, or consequential damages, or
							any other damages of any kind, including but not limited to
							loss of use, loss of profits, or loss of data, arising out of
							or in any way connected with the use of or inability to use
							the Service, including without limitation any damages
							resulting from reliance by you on any information obtained
							from using the Service."
				/>
			</GeneralSection>
		</>
	);
};

export async function getServerSideProps() {
	let prices = await getCoingeckoPrices()
	return {
		props: {
			prices,
		},
	};
}

export default Valuation;
