import { useEffect, useState } from "react";
import Head from "next/head";

// Components
import CollectionsChoise from "../components/General/Choicer/CollectionsChoise";
import GeneralSection from "../components/GeneralSection";
import InitChoice from "../components/InitChoice";
import DescriptionContent from "../components/DescriptionContent";
import {
	Content,
	SearcherBar,
	TraitsButton,
  	FiltersColumn
} from "../components/nftValuation/index";

// Services
import {
	getNftCollection,
	getNftGlobalData,
} from "../backend/services/nftCollectionInfo";

// Filters
import { typedKeys } from "../lib/utilities";
interface nftCollectionProps {
	num_owners: number
	market_cap: number
}

interface nftObject {
	tokenId: string;
	floor_adjusted_predicted_price: number;
	traits: {
		traitType: string;
		value: string;
	}[]
	images: {
		image_small: string;
	}
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
]

const filterOptions = {
	Status: {
		name: "Status",
		description: "",
	},
	Price: {
		name: "Price Estimation",
		description: "",
	},
	TraitFilter: {
		name: "TraitFilter",
		description: "",
	},
}
const collectionsList = [
	{
		name: "FLUF World",
		logo: "https://i.seadn.io/gcs/files/eae1fd3d26c6558ec5bba12c8aa29bd7.png?auto=format&w=1920",
		creator: "FLUF_World",
		nItems: 10000,
		collection: "fluf",
	}
];

export default function NftValuation() {
	// Data
	const [collectionName, setCollectionName] = useState<string>("");
	const [nftGlobal, setnftGlobal] = useState<nftCollectionProps | null>(null);
	const [nftObject, setnftObject] = useState<nftObject[]>([]);

	// Control Flags
	const [openedTraits, setOpenedTraits] = useState<boolean>(false);
	//const [filterBy, setFilterBy] = useState<TraitFilter>('traits')
	const [filteredItem, setfilteredItem] = useState(nftObject);
	//const [filterElement, setFilteredElement] = useState(nftObject);
	const [checked, setChecked] = useState();
	const [loadingGlobalData, setLoadingGlobalData] = useState<boolean>(true);
	const [loadingCollection, setLoadingCollection] = useState<boolean>(true);

	// Pagination Controller
	const [pageLenght, setPageLenght] = useState(0);
	const [controlPageIndex, setControlPageIndex] = useState<number>(0);

	useEffect(() => {
		const getNftData = async () => {
			setLoadingGlobalData(true);
			const globalResponse = await getNftGlobalData();
			setnftGlobal(globalResponse.stats);
			setLoadingGlobalData(false);
		};
		//setFilterBy("traits");
		getNftData();
	}, []);

  useEffect(() => {
    const getDataCollection = async () => {
      let response
      if (collectionName) {
        setLoadingCollection(true)
        response = await getNftCollection(collectionName)
        setnftObject(response)
        setPageLenght(Math.trunc(response.length / 10));
        setControlPageIndex(0);
        setLoadingCollection(false)
      }
    }
    getDataCollection()
  }, [collectionName])

	return (
		<>
			<Head>
				<title>MGH - NFT Valuation</title>
				<meta name="description" content="" />
			</Head>

			{/* Top Padding or Image */}
			<div
				className={`relative ${collectionName ? "p-0 mb-8 w-full" : "pt-24"}`}
			>
				<img
					src="/images/nft_valuation_header.svg"
					alt="nft_valuation_header"
					className={`${collectionName ? "object-fill flex w-full" : "hidden"}`}
				/>
			</div>

			{/* General Section Layout */}
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
							{/* Searcher Bar */}
							<TraitsButton
								openedTraits={openedTraits}
								setOpenedTraits={setOpenedTraits}
							/>
							<div className="col-span-3 ">
								<SearcherBar
									nftObject={nftObject}
									setfilteredItem={setfilteredItem}
									checked={checked}
									setChecked={setChecked}
								/>
							</div>
							{/* Traits Filter Column */}
							{openedTraits && (
								<div className="flex flex-col p-2 nm-flat-medium rounded-3xl">
									{typedKeys(filterOptions).map((filter) => (
										<FiltersColumn 
										title={filterOptions[filter].name} 
										key={filter} filterObject={nftObject} 
										setfilteredItem={setfilteredItem} 
										setChecked={setChecked}/>
									))}
								</div>
							)}
							{/* NFT Collection List */}
							<div
								className={`${openedTraits ? "col-span-3" : "col-span-full"} `}
							>
								<Content
									filteredItem={filteredItem}
									checked={checked}
									nftObject={nftObject}
									controlPageIndex={controlPageIndex}
									pageLenght={pageLenght}
									setControlPageIndex={setControlPageIndex}
									isLoading={loadingCollection}
								/>
							</div>
						</div>
						{/* Footer */}
						<p className="text-grey-icon text-xs p-20">
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
		</>
	);
}
