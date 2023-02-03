import { useEffect, useState } from "react";
import Head from "next/head";
import { Pagination } from "@mui/material";
import { nftObject } from "../lib/types";

// Components
import CollectionsChoise from "../components/General/Choicer/CollectionsChoise";
import GeneralSection from "../components/GeneralSection";
import InitChoice from "../components/InitChoice";
import DescriptionContent from "../components/DescriptionContent";
import {
	Content,
	FilterColumn,
	SearcherBar,
	TraitsButton,
} from "../components/nftValuation/index";

// Services
import {
	getDataTraits,
	getNftCollection,
	getNftGlobalData,
} from "../backend/services/nftCollectionInfo";

// Filters
import { typedKeys } from "../lib/utilities";
import SpecificAssetModal from "../components/General/SpecificAssetModal";
import { Loader } from "../components";
import { Link } from "react-router-dom";
import Image from "next/image";

interface nftCollectionProps {
	num_owners: number;
	market_cap: number;
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

const collectionsList = [
	{
		name: "FLUF World",
		logo: "https://i.seadn.io/gcs/files/eae1fd3d26c6558ec5bba12c8aa29bd7.png?auto=format&w=1920",
		creator: "FLUF_World",
		nItems: 10000,
		collection: "fluf",
	},
];

export default function NftValuation() {
	const commingSoon = true

	// Fetched Data
	const [collectionName, setCollectionName] = useState<string>("");
	const [nftGlobal, setnftGlobal] = useState<nftCollectionProps | null>(null);
	const [nftTraitsFilters, setnftTraitsFilters] = useState<any[]>([]);
	const [nftObject, setnftObject] = useState<any[]>([]);

	// Control Flags
	const [openedTraitsColumn, setOpenedTraitsColumn] = useState<boolean>(false);
	const [loadingGlobalData, setLoadingGlobalData] = useState<boolean>(true);
	const [loadingCollection, setLoadingCollection] = useState<boolean>(true);

	// Pagination Controller
	const [numberOfPages, setNumberOfPages] = useState<number>(0)
	const [controlPageIndex, setControlPageIndex] = useState<number>(0);
	const pageLenght: number = 20;

	// Filter Controller
	const [filteredItems, setfilteredItems] = useState<nftObject[]>(nftObject);
	const [selectedFilters, setSelectedFilters] = useState({}) // array of traits filters selected 
	const [nFiltersSelected, setNFiltersSelected] = useState<number>(0) // number of filters checked
	const [inputValue, setInputValue] = useState<string | undefined>(undefined); // input on search by Id
	const [inputValueMin, setInputValueMin] = useState<number>(0);
	const [inputValueMax, setInputValueMax] = useState<number>(Number.MAX_VALUE);
	const [isFilteredByPrice, setIsFilteredByPrice] = useState<boolean>(false); // flag if is filter by price
	const [ejectSelectFilter, setEjectSelectFilter] = useState<boolean>(false); // flag if is filter by traits
	const [isFilteredByListed, setIsFilteredByListed] = useState<boolean>(false); // flag if is filter by listed nft

	// Specific Nft modal controller
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [specificNftSelected, setSpecificNftSelected] = useState<nftObject>();

	const handleApply = () => {
		setIsFilteredByPrice(inputValueMax !== Number.MAX_VALUE || inputValueMin !== 0)
	}

	const handleTraitFilter = (selectedFilter: nftObject, noFiltersSelected: number) => {
		setSelectedFilters(selectedFilter)
		setNFiltersSelected(noFiltersSelected)
		setEjectSelectFilter(!ejectSelectFilter)
	}

	const handleSpecificNftData = (openModal: boolean, nftData?: nftObject, nftId?: string) => {
		setIsModalOpen(openModal)
		if (nftId) {
			const results = nftObject.filter((nft: nftObject) => nft.tokenId == nftId);
			setSpecificNftSelected(results[0])
		}
		nftData && setSpecificNftSelected(nftData)
	}

	useEffect(() => {
		setNumberOfPages(Math.ceil(filteredItems.length > 0 ? filteredItems.length : nftObject?.length) / pageLenght);
		setControlPageIndex(0);
	}, [filteredItems, nftObject]);

	useEffect(() => {
		if (!nftTraitsFilters) return
		const auxSelectedFilters: any = selectedFilters
		typedKeys(nftTraitsFilters).map((filter) => { auxSelectedFilters[filter] = [] })
		setSelectedFilters(auxSelectedFilters)
	}, [nftTraitsFilters]);

	// Collection Fetching
	useEffect(() => {
		const getDataCollection = async () => {
			let response, traits, globalResponse
			if (!collectionName) return
			setLoadingGlobalData(true);
			setLoadingCollection(true);
			response = await getNftCollection(collectionName);
			traits = await getDataTraits(collectionName)
			globalResponse = await getNftGlobalData(collectionName);
			setnftObject(response);
			setnftTraitsFilters(traits);
			setnftGlobal(globalResponse.stats);
			setLoadingGlobalData(false);
			setLoadingCollection(false);
		};
		getDataCollection();
	}, [collectionName]);

	// Use Effect to handle filters
	useEffect(() => {
		if (inputValue) {
			const results = nftObject.filter((nft: nftObject) => {
				return nft.tokenId == inputValue;
			});
			setfilteredItems(results);
		} else if (nFiltersSelected > 0 || isFilteredByPrice || isFilteredByListed) {
			const results = nftObject.filter((nft: any) => {
				// Traits Filter
				let isReturnItemByTrait = !(nFiltersSelected > 0)
				let noItemsByTraits = 0 // its a counter of filters on the object.
				Object.entries(selectedFilters).forEach(([key, value]: any) => {
					value.map((item: any) => {
						if (nft.traits[key] == item) { noItemsByTraits = noItemsByTraits + 1 }
					})
				});
				if (noItemsByTraits === nFiltersSelected) { isReturnItemByTrait = true }
				// Price filter
				let isReturnItemByPrice = true
				if (inputValueMin !== 0 || inputValueMax !== Number.MAX_VALUE) {
					isReturnItemByPrice = isFilteredByPrice
						&& nft.floor_adjusted_predicted_price >= inputValueMin
						&& nft.floor_adjusted_predicted_price <= inputValueMax
				}
				// Listed Filter
				let isReturnItemByListed = !isFilteredByListed
				if (isFilteredByListed) { isReturnItemByListed = nft.listed_eth_price ? true : false }
				return (isReturnItemByTrait && isReturnItemByPrice && isReturnItemByListed)
			});
			setfilteredItems(results)
		} else { setfilteredItems(nftObject) }
	}, [inputValue, ejectSelectFilter, isFilteredByPrice, isFilteredByListed])

	if (commingSoon) {
		return (
			<div className="flex justify-center items-center w-full h-screen gap-6">
				<Image src='/images/mgh_logo.svg' width={100} height={100} />
				<h2 className="font-bold text-xl">Coming soon!</h2>
			</div>
		)
	}

	return (
		<>
			<Head>
				<title>MGH - NFT Valuation</title>
				<meta name="description" content="" />
			</Head>

			{/* Top Padding or Image */}
			<div className={`relative ${collectionName && !isModalOpen ? "p-0 mb-8 w-full" : "pt-24"}`}>
				<img
					src="/images/nft_valuation_header.svg"
					alt="nft_valuation_header"
					className={`${collectionName && !isModalOpen ? "object-fill flex w-full" : "hidden"}`}
				/>
			</div>

			{/* General Section Layout */}
			{isModalOpen
				? <SpecificAssetModal
					collectionName={collectionName}
					specificAssetSelected={specificNftSelected}
					handleSpecificAssetData={handleSpecificNftData}
				/>
				: (
					<GeneralSection
						sectionTitle="NFT Valuation"
						optionList={headerList}
						backgroundClass={`${collectionName ? "" : "bg-grey-lightest"}`}
					>
						{collectionName ? (
							<>
								{nftGlobal && (
									<DescriptionContent
										title="FLUF World"
										description="Direct repair of aneurysm, pseudoaneurysm, or excision (partial or total) and graft insertion, with or without patch graft; for ruptured aneurysm, abdominal aorta  Direct repair of aneurysm, pseudoaneurysm, or excision (partial or total) and graft insertion, with or without patch graft; for ruptured aneurysm, abdominal aorta"
										boxInfo={nftGlobal}
										isLoading={loadingGlobalData}
									/>
								)}
								<div className="grid grid-cols-4 gap-5 w-full">
									{
										!loadingCollection && <>
											{/* Searcher Bar */}
											<TraitsButton
												openedTraits={openedTraitsColumn}
												setOpenedTraits={setOpenedTraitsColumn}
											/>
											<div className="col-span-3 ">
												<SearcherBar
													inputValue={inputValue}
													setInputValue={setInputValue}
												/>
											</div>
											{/* Traits Filter Column */}
											{openedTraitsColumn && (
												<FilterColumn
													selectedFilters={selectedFilters}
													nftTraitsFilters={nftTraitsFilters}
													inputValueMax={inputValueMax}
													inputValueMin={inputValueMin}
													setInputValueMax={setInputValueMax}
													setInputValueMin={setInputValueMin}
													handleApply={handleApply}
													handleTraitFilter={handleTraitFilter}
													setIsFilteredByListed={setIsFilteredByListed}
													isFilteredByListed={isFilteredByListed}
												/>
											)}
										</>
									}
									{/* NFT Collection List */}
									<div className={`${openedTraitsColumn ? "col-span-3" : "col-span-full"} `}>
										<Content
											filteredItems={filteredItems}
											nftObject={nftObject}
											isLoading={loadingCollection}
											controlPageIndex={controlPageIndex}
											pageLenght={pageLenght}
											collectionName={collectionName}
											handleSpecificNftData={handleSpecificNftData}
										/>
									</div>
									{/* Pagination of collection list content */}
									<div className="col-span-full flex justify-center p-10">
										{numberOfPages > 1 ? (
											<Pagination
												count={numberOfPages}
												defaultPage={controlPageIndex + 1}
												siblingCount={3} boundaryCount={2}
												shape="rounded"
												size="large"
												onChange={(e, page) => { setControlPageIndex(page - 1) }}
											/>
										) : (<></>)}
									</div>
								</div>
								{/* Footer */}
								<p className="text-grey-icon text-center text-xs p-20">
									The MGH DAO does not provide, personalized investment
									recommendations or advisory services. Any information provided
									through the land evaluation tool and others is not, and should not
									be, considered as advice of any kind and is for information
									purposes only. That land is “valuated” does not mean, that it is
									in any way approved, checked audited, and/or has a real or correct
									value. In no event shall the MGH DAO be liable for any special,
									indirect, or consequential damages, or any other damages of any
									kind, including but not limited to loss of use, loss of profits,
									or loss of data, arising out of or in any way connected with the
									use of or inability to use the Service, including without
									limitation any damages resulting from reliance by you on any
									information obtained from using the Service.
								</p>
							</>
						) : (
							<InitChoice title="Choose a NFT Collection">
								<CollectionsChoise
									options={collectionsList}
									setCollection={setCollectionName}
								/>
							</InitChoice>
						)}
					</GeneralSection>
				)
			}
		</>
	);
}