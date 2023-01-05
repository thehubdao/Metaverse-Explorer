import { NextPage } from "next";
import { AnyObject } from "immer/dist/internal";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Fade } from "react-awesome-reveal";
import {
	HeatmapSize,
	LandCoords,
	LegendFilter,
	MapFilter,
	PercentFilter,
	ValuationTile,
} from "../lib/heatmap/heatmapCommonTypes";
import { useVisible } from "../lib/hooks";
import { formatName } from "../lib/utilities";
import { ICoinPrices } from "../lib/valuation/valuationTypes";
import { IAPIData, IPredictions, UserData } from "../lib/types";
import {
	FloorPriceTracker,
	SalesVolumeDaily,
	TopPicksLands,
	TopSellingLands,
} from "../components/Valuation";
import Link from "next/link";
import {
	ColorGuide,
	MapCard,
	MapChooseFilter,
	MapChooseMetaverse,
	MapLegend,
	MapInitMvChoice,
	MapLandSummary,
	MapMobileFilters,
	MapSearch,
	MaptalksCanva,
} from "../components/Heatmap";
import { getUserInfo } from "../lib/FirebaseUtilities";
import { useAppSelector } from "../state/hooks";
import { getUserNFTs } from "../lib/nftUtils";
import useConnectWeb3 from "../backend/connectWeb3";
import { Chains } from "../lib/chains";
import { FullScreenButton } from "../components/General";
import { Metaverse } from "../lib/metaverse";
import { findHeatmapLand } from "../lib/heatmap/findHeatmapLand";
import Head from "next/head";
import { Heatmap2D } from "../components/Heatmap/index";
import { metaverseInitialCenter } from "../lib/valuation/valuationUtils";
import EstimateAccuracy from "../components/Valuation/EstimateAccuracy";
import FreeValuation from "../components/Valuation/FreeValuation";

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
const styleContent = 'text-xxs xs:text-xxs xl:text-xs font-plus font-bold text-grey-content pt-0 sm:pt-5 flex justify-between'

const Valuation: NextPage<{ prices: ICoinPrices }> = ({ prices }) => {
	const [globalData, setglobalData] = useState<AnyObject>({})
	const [estimateAccuracy, setestimateAccuracy] = useState<AnyObject>({})

	const { address, chainId } = useAppSelector((state) => state.account);
	const { web3Provider } = useConnectWeb3();

	const [mapState, setMapState] = useState<ValuationState>("loading");
	/* const [loading] = getState(mapState, ['loading']) */

	const [selected, setSelected] = useState<LandCoords>();
	const [hovered, setHovered] = useState<Hovered>({
		coords: { x: NaN, y: NaN },
	});
	// Hook for Popup
	const { ref, isVisible, setIsVisible } = useVisible(false);
	const [metaverse, setMetaverse] = useState<Metaverse>();
	const [filterBy, setFilterBy] = useState<MapFilter>("basic");
	const [percentFilter, setPercentFilter] = useState<PercentFilter>();
	const [legendFilter, setLegendFilter] = useState<LegendFilter>();
	const [heatmapSize, setHeatmapSize] = useState<HeatmapSize>();
	const [cardData, setCardData] = useState<CardData>();
	function isSelected(x: number, y: number) {
		return selected?.x === x && selected?.y === y;
	}

	const mapDivRef = useRef<HTMLDivElement>(null);
	const [dims, setDims] = useState({
		height: mapDivRef.current?.offsetWidth,
		width: mapDivRef.current?.offsetWidth,
	});

	const formatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
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
			let data;
			const response = await fetch(
				`${process.env.ITRM_SERVICE}${metaverse == "somnium-space"/*  || metaverse == "axie-infinity" */
					? ""
					: "/test"
				}/${metaverse}/globalData`,
				{
					method: "GET",
					body: JSON.stringify(data),
				}
			);
			setglobalData(await response.json());
		} catch (e) {
			console.log("error", e);
			setMapState("errorQuery");
			return setTimeout(() => setIsVisible(false), 1100);
		}
	};

	useEffect(() => {
		setIsVisible(false);
		setFilterBy("basic");
		getglobalData();
	}, [metaverse]);

	// Main Search Function through Clicks,Form inputs.
	const handleMapSelection = async (
		lands?: ValuationTile | any,
		x?: number,
		y?: number,
		tokenId?: string,
		isntFullScreen?: boolean
	) => {
		setCardData(undefined);
		setMapState("loadingQuery");
		setIsVisible(true);
		if (!metaverse) return;
		if (!lands) {
			try {
				let data;
				const parameters =
					x && y ? `x=${x}&y=${y}` : tokenId ? `tokenId=${tokenId}` : null;
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
			const landData = findHeatmapLand(
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
			if (!isntFullScreen)
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

	return (
		<>
			<Head>
				<title>MGH | Valuation</title>
				<meta
					name="description"
					content="Land Valuation with our Custom Heatmap"
				/>
			</Head>
			<section className="w-full h-full relative">
				<div className="bg-grey-lightest rounded-xl p-8 pt-24">
					{/* Main Header */}
					<div className="border-t border-l border-white/10 rounded-xl p-5 w-full bg-opacity-30; flex flex-col lg:flex-row justify-between items-center mb-8 bg-grey-dark">
						<h1 className="text-grey-content font-plus font-normal rounded-2xl lg:text-3xl text-3xl  mb-0 sm:mb-2">
							LAND Valuation
						</h1>

						{/* Links Wrapper */}
						<div className="flex gap-5">
							{/* Links */}
							{["portfolio", "watchlist", "analytics"].map((option) => (
								<Link key={option} href={`/${option}`}>
									<a className="hover:scale-105 px-8 py-3 flex items-center justify-center rounded-3xl shadowNormal">
										<span className="pt-1 font-bold font-plus text-grey-content text-xl">
											{formatName(option)}
										</span>
									</a>
								</Link>
							))}
						</div>
					</div>
					{metaverse && (
						<>
							<span>
								<img src="/images/imagevaluation.svg" alt="IMG" className="w-full flex" />
							</span>
							<div className="flex border-t border-l border-white/10 rounded-3xl shadowDiv p-5 bg-opacity-30 justify-between bg-[#F9FAFB] my-9">
								<div className="pr-5 w-3/4">
									<h2 className="text-grey-content font-plus font-normal rounded-2xl lg:text-5xl text-3xl mb-0 sm:mb-2">
										Description
										<br />
									</h2>
									<p
										className={`text-sm xs:text-base xl:text-lg font-plus font-normal text-grey-content`}
									>
										Direct repair of aneurysm, pseudoaneurysm, or excision (partial or total) and graft insertion, with or without patch graft; for ruptured aneurysm, abdominal aorta  Direct repair of aneurysm, pseudoaneurysm, or excision (partial or total) and graft insertion, with or without patch graft; for ruptured aneurysm, abdominal aorta
									</p>
								</div>
								<div className="flex border-t border-l border-white/10 shadow-blck rounded-xl p-3 bg-[#D4D7DD] bg-opacity-30 w-1/4  justify-between pt-5 pb-5">
									<div className="flex flex-col ">
										<p className={styleContent}>
											MCAP :
										</p>
										<p className={styleContent}>
											OWNERS :
										</p>
									</div>
									<div className="items-end">
										<p className={styleContent}>
											{formatter.format(globalData.stats?.market_cap)}
										</p>
										<p className={styleContent}>
											{globalData.stats?.num_owners}
										</p>
									</div>
								</div>
							</div>
						</>
					)}
					{/* Heatmap */}
					<div className="relative mb-8 h-[55vh]" ref={mapDivRef}>
						{!metaverse && (
							<MapInitMvChoice
								metaverse={metaverse}
								setMetaverse={setMetaverse}
							/>
						)}

						{metaverse && (
							<>

								<div className="absolute top-0 z-20 flex gap-4 p-2 md:w-fit w-full unselectable">
									<div>
										{/* Top left Coordinates */}
										{metaverse === "somnium-space" ? (
											<div className="md:block w-[190px]"></div>
										) : (
											<div className="mb-2 hidden md:block w-[190px] gray-box bg-grey-bone z-30">
												<MapLandSummary
													owner={hovered.owner}
													name={hovered.name}
													coordinates={hovered.coords}
													metaverse={metaverse}
												/>
											</div>
										)}
										{/* 'Search By' Forms */}
										<MapSearch
											mapState={mapState}
											handleMapSelection={handleMapSelection}
										/>
									</div>
									{/* Main Filter Button. Only for small screens  */}
									<div className="md:hidden w-2/4">
										<MapMobileFilters
											metaverse={metaverse}
											setMetaverse={setMetaverse}
											filterBy={filterBy}
											setFilterBy={setFilterBy}
										/>
									</div>
									<div className="md:flex gap-2 md:gap-4 hidden">
										{/* Metaverse Selection */}
										<MapChooseMetaverse
											metaverse={metaverse}
											setMetaverse={setMetaverse}
										/>
										{/* Filter Selection */}
										<MapChooseFilter
											filterBy={filterBy}
											setFilterBy={setFilterBy}
										/>
									</div>
								</div>
								{/* Color Guide - Hides when MapCard is showing (only mobile) */}
								{filterBy !== "basic" && (
									<div
										className={
											(isVisible && "hidden") +
											" md:block absolute z-20 bottom-2 right-2 unselectable"
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
									<div className="absolute z-20 top-2 right-2 gray-box bg-grey-bone w-fit h-15">
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
										onClick={(
											land: ValuationTile | undefined,
											x: number,
											y: number
										) => {
											if (isSelected(x, y)) {
												setSelected(undefined);
											} else {
												const isntFullScreen = document.fullscreenElement ? false : true
												handleMapSelection(land, x, y, undefined, isntFullScreen);
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
										onClick={(land, x, y) => {
											if (isSelected(x, y)) {
												setSelected(undefined);
											} else {
												const isntFullScreen = document.fullscreenElement ? false : true
												handleMapSelection(land, x, y, undefined, isntFullScreen);
											}
										}}
										metaverse={metaverse}
									/>
								)}
								{/* Selected Land Card */}
								{isVisible && (
									<div
										ref={ref}
										className="absolute bottom-2 right-8 flex flex-col gap-4"
									>
										<Fade duration={300}>
											<MapCard
												setIsVisible={setIsVisible}
												metaverse={metaverse}
												apiData={cardData?.apiData}
												predictions={cardData?.predictions}
												landCoords={cardData?.landCoords}
												name={cardData?.name}
												mapState={mapState}
											/>
										</Fade>
									</div>
								)}

								{/* Map Legend - Hides when MapCard is showing (all screens) */}
								{filterBy === "basic" ? (
									!isVisible && (
										<MapLegend
											className="absolute bottom-2 right-2"
											legendFilter={legendFilter}
											setLegendFilter={setLegendFilter}
											metaverse={metaverse}
										/>
									)
								) : (
									<></>
								)}
							</>
						)}
					</div>

					{/* Daily Volume and Floor Price Wrapper */}
					{metaverse && (
						<Fade duration={600} className="w-full">
							<div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 space-x-0 sm:space-x-5 md:space-x-10 items-stretch justify-between w-full mb-8">
								{/* Daily Volume */}
								<div className="flex flex-col justify-between w-full space-y-5 md:space-y-10 lg:space-y-5">
									<SalesVolumeDaily metaverse={metaverse} coinPrices={prices} />
								</div>
								{/* Floor Price */}
								<div className="flex flex-col justify-between w-full space-y-5 md:space-y-10 lg:space-y-5">
									<FloorPriceTracker
										metaverse={metaverse}
										coinPrices={prices}
									/>
								</div>
								{/* Estimate accuracy */}
								<div className="flex flex-col justify-between w-full space-y-5 md:space-y-10 lg:space-y-5">
									<EstimateAccuracy metaverse={metaverse} coinPrices={prices} />
								</div>
								{/* Free Valuation */}
								<div className="flex flex-col justify-between w-full space-y-5 md:space-y-10 lg:space-y-5">
									<FreeValuation />
								</div>
							</div>
							<div className="rounded-3xl shadowDiv bg-grey-bone p-5 mb-10">
								<h3 className="lg:text-3xl text-2xl text-grey-content font-plus mb-0 sm:mb-2">
									Our Top Picks
								</h3>
								<TopPicksLands metaverse={metaverse} />
							</div>
							<div className="rounded-3xl shadowDiv bg-grey-bone p-5">
								<TopSellingLands metaverse={metaverse} />
							</div>
							<div className="flex flex-col text-center shadow-blck rounded-xl py-3 px-4 w-full bg-grey-dark bg-opacity-20 mb-8">
								<p className="text-xs sm:text-sm text-grey-content font-plus pt-44 px-10">
									The MGH DAO does not provide, personalized investment
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
									from using the Service.
								</p>
							</div>
						</Fade>
					)}
				</div>
			</section>
		</>
	);
};

export async function getServerSideProps() {
	const coin = await fetch(
		"https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cthe-sandbox%2Cdecentraland%2Caxie-infinity%2Csomnium-space-cubes&vs_currencies=usd"
	);
	const prices = await coin.json();
	return {
		props: {
			prices,
		},
	};
}
export default Valuation;
