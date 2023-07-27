import Head from 'next/head'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Image from "next/image";
import { useAccount } from 'wagmi'
import {
	ICoinPrices, LandListAPIResponse,
} from '../lib/valuation/valuationTypes'
import { PriceList } from '../components/General'
import { IAPIData, IPredictions } from '../lib/types'
import { typedKeys } from '../lib/utilities'
import PortfolioList from '../components/Portfolio/PortfolioList'
import { Metaverses } from "../lib/enums"
import { Metaverse, metaverseObject } from '../lib/metaverse'
import GeneralSection from '../components/GeneralSection'
import Footer from '../components/General/Footer'
import ConnectButton from '../components/ConnectButton';
import NoLands from '../components/Portfolio/NoLands';
// import { printAlchemy } from '../lib/alchemyProvider';
import SpecificLandModal from '../components/Valuation/SpecificLandModal';
import { findHeatmapLand } from '../lib/heatmap/findHeatmapLand';
import { getCoingeckoPrices } from '../backend/services/openSeaDataManager';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchPortfolio } from '../state/portfolio';
import { Loader } from '../components';

interface CardData {
	apiData: IAPIData;
	predictions: IPredictions;
	landCoords: { x: string | number; y: string | number };
	name: string | undefined;
	metaverse: Metaverse
}

const headerList = [
	{
		name: "Heatmap",
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

const PortfolioPage: NextPage<{ prices: ICoinPrices }> = ({ prices }) => {
	const { address } = useAccount()

	const prtfolio = useAppSelector((state) => state.portfolio)
	const [metaverse, setMetaverse] = useState(Metaverses.ALL)

	const initialWorth = {
		ethPrediction: 0,
		usdPrediction: 0,
	}

	// Portfolio data
	const [lands, setLands] = useState<Record<Metaverse, LandListAPIResponse>>()
	const [totalLands, setTotalLands] = useState<number>(0)
	const [totalWorth, setTotalWorth] = useState<{ ethPrediction: number, usdPrediction: number }>(initialWorth)

	//Land Modal (and card data)
	const [openSpecificModal, setOpenSpecificModal] = useState<boolean>(false)
	const [specificLandSelected, setSpecificLandSelected] = useState<CardData>();

	const metaverseLabels: Record<Metaverse, string> = {
		sandbox: "The Sandbox",
		decentraland: "Decentraland",
		"somnium-space": "Somnium Space"
	}

	const handleSpecificLandData = (
		openModal: boolean,
		landData: any,
		metaverse: Metaverse
	) => {
		const specificLand: any = findHeatmapLand(
			landData,
			prices,
			metaverse,
			{
				x: landData.coords ? landData.coords.x : landData.center.x,
				y: landData.coords ? landData.coords.y : landData.center.y,
			},
			landData.tokenId
		);
		specificLand.metaverse = metaverse
		setSpecificLandSelected(specificLand)
		setOpenSpecificModal(openModal)
	}

	useEffect(() => {
		setLands({ sandbox: {}, decentraland: {}, "somnium-space": {} })
		setTotalLands(0)
		setTotalWorth(initialWorth)
		if (address === prtfolio.currentAddress) {
			setLands(prtfolio.list)
			setTotalLands(prtfolio.length)
			setTotalWorth(prtfolio.totalWorth)
		}
	}, [address, prtfolio.length])

	return (
		<>
			<Head>
				<title>MGH - Portfolio</title>
				<meta
					name="description"
					content="Governance of metaverse related items, fair valuation and minting of NFT backed tokens and provision of metaverse market data."
				/>
			</Head>

			{/* {openModal && <WalletModal onDismiss={() => setOpenModal(false)} />} */}

			{/* Top Padding or Image */}
			<div className={`relative p-0 w-full h-[400px] mb-24`}>
				<Image
					src="/images/land_header.png"
					objectFit={'cover'}
					alt='land header'
					layout="fill"
				/>
			</div>

			{/* Specific land modal */}
			{openSpecificModal && specificLandSelected && <SpecificLandModal
				collectionName={metaverseLabels[specificLandSelected.metaverse]}
				specificAssetSelected={specificLandSelected.apiData}
				setOpenSpecificModal={setOpenSpecificModal}
				predictions={specificLandSelected.predictions}
				landCoords={specificLandSelected.landCoords}
				metaverse={specificLandSelected.metaverse}
				coinPrices={prices}
				setIsVisible={() => { }}
			/>}

			{/* General Section Layout */}
			<GeneralSection
				sectionTitle="Portfolio"
				optionList={headerList}
				backgroundClass={``}
			>

				<div className="flex items-center justify-between p-8 space-x-20">
					<div className="flex flex-col space-y-3 max-w-2xl">
						<p className="text-2xl font-semibold">Description</p>
						<p className="text-sm">The MGH LAND price estimator uses AI to calculate the fair value of LANDs and help you find undervalued ones.  Leverage our heatmap to quickly get an overview of the Sandbox Map and get insights about current price trends. The valuations are updated at a daily basis.</p>
					</div>
					<div className="flex space-x-8 w-full items-stretch justify-end max-w-2xl min-w-max">
						<div className="flex flex-col space-y-5 items-center justify-end nm-flat-hard py-3 px-7 rounded-3xl bg-grey-bone">
							<p className=" font-black text-3xl">{totalLands}</p>
							<p className="text-sm">Total LANDs owned</p>
						</div>

						<div className="flex flex-col space-y-2 items-center nm-flat-hard py-3 px-10 rounded-3xl  bg-grey-bone">
							<div className=" font-black text-2xl"><PriceList predictions={totalWorth} /></div>
							<p className="text-sm">Total Value worth</p>
						</div>

					</div>
				</div>

				{!address ? (
					<div className="flex flex-col justify-center items-center mt-28">
						{/* Auth Button */}
						<Image
							src="/images//mgh_logo/mgh_logo.svg"
							width={136}
							height={131}
							loading='lazy'
							objectFit='cover'
						/>
						<p className='text-grey-icon font-light text-2xl pt-6'>Please log in to show your portfolio</p>
						<ConnectButton />
					</div>
				) : (<>
					<div className='mx-16 mb-24'>
						<div className='w-full flex items-center justify-center space-x-5 py-16 border-b border-grey-panel'>
							{(Object.keys(Metaverses) as Array<keyof typeof Metaverses>).map((key) => (
								<button
									key={key}
									type="button"
									className={`flex items-center py-3 px-10 text-sm font-bold focus:outline-none rounded-3xl  transition ease-in-out duration-300 bg-grey-bone ${metaverse === Metaverses[key] ? "nm-inset-medium text-grey-content" : "nm-flat-medium hover:nm-flat-soft border border-white text-grey-icon"}`}
									onClick={() => setMetaverse(Metaverses[key])}
								>
									{Metaverses[key] === Metaverses.SANDBOX && <img src="/images/the-sandbox-sand-logo.png" className='h-6 w-6 mr-4' />}
									{Metaverses[key] === Metaverses.DECENTRALAND && <img src="/images/decentraland-mana-logo.png" className='h-6 w-6 mr-4' />}
									{/* {Metaverses[key] === Metaverses.AXIE && <img src="/images/axie-infinity-axs-logo.png" className='h-6 w-6 mr-4' />} */}
									{Metaverses[key] === Metaverses.SOMNIUM && <img src="/images/somnium-space-cube-logo.webp" className='h-6 w-6 mr-4' />}

									{Metaverses[key].toUpperCase()}
								</button>
							))}
						</div>
					</div>

					{/* Lands Grid */}
					{lands && metaverse === Metaverses.ALL &&
						typedKeys(metaverseObject).map(
							(metaverse, index) =>
								lands[metaverse] &&
								typedKeys(lands[metaverse]).length > 0 && (
									<div key={metaverse} className="mb-8 sm:mb-12">
										<PortfolioList
											metaverse={metaverse}
											lands={lands[metaverse]}
											prices={prices}
											handleSpecificLandData={handleSpecificLandData}
										/>
									</div>
								)
						)}

					{lands && metaverse === Metaverses.SANDBOX && (
						lands["sandbox"]
							? (
								<div key={metaverse} className="mb-8 sm:mb-12">
									<PortfolioList
										metaverse={"sandbox"}
										lands={lands["sandbox"]}
										prices={prices}
										handleSpecificLandData={handleSpecificLandData}
									/>
								</div>
							) : (
								<NoLands />
							)
					)}

					{lands && metaverse === Metaverses.DECENTRALAND && (
						lands["decentraland"]
							? (
								<div key={metaverse} className="mb-8 sm:mb-12">
									<PortfolioList
										metaverse={"decentraland"}
										lands={lands["decentraland"]}
										prices={prices}
										handleSpecificLandData={handleSpecificLandData}
									/>
								</div>
							) : (
								<NoLands />
							)
					)}

					{lands && metaverse === Metaverses.SOMNIUM && (
						lands["somnium-space"]
							? (
								<div key={metaverse} className="mb-8 sm:mb-12">
									<PortfolioList
										metaverse={"somnium-space"}
										lands={lands["somnium-space"]}
										prices={prices}
										handleSpecificLandData={handleSpecificLandData}
									/>
								</div>

							) : (
								<NoLands />
							)
					)}
					{/* Loader component */}
					{prtfolio.isLoading && prtfolio.length == 0 && <div className='w-full flex flex-col justify-center items-center gap-3'>
						<Loader color='blue' size={60} />
						<p className='text-grey-content text-xs font-semibold'>Loading lands...</p>
					</div>}
				</>)}

				<div className='mt-60'>
					<Footer
						label='The MGH DAO does not provide, personalized investment recommendations or advisory services. Any information provided through the land evaluation tool and others is not, and should not be, considered as advice of any kind and is for information purposes only. That land is “valuated” does not mean, that it is in any way approved, checked audited, and/or has a real or correct value. In no event shall the MGH DAO be liable for any special, indirect, or consequential damages, or any other damages of any kind, including but not limited to loss of use, loss of profits, or loss of data, arising out of or in any way connected with the use of or inability to use the Service, including without limitation any damages resulting from reliance by you on any information obtained from using the Service.'
					/>
				</div>

				{/* 
            <section className="w-full xs:w-[22rem] sm:w-[26rem] md:w-[48rem] lg:w-full max-w-7xl pt-12 bg-grey-lightest rounded-lg p-8">
            
                <hgroup className="text-gray-200 flex flex-col">
   
                    <div className='mb-8 sm:mb-12'>
                        {externalWallet ? (
                            <>
                                <h1 className="md:text-5xl lg:text-6xl text-4xl green-text-gradient">
                                    Portfolio
                                </h1>
                                <ExternalLink
                                    className="m-auto text-center sm:text-lg md:text-xl"
                                    text={ellipseAddress(
                                        externalWallet as string
                                    )}
                                    href={
                                        isRonin
                                            ? `https://marketplace.axieinfinity.com/profile/${externalWallet}/land/`
                                            : `https://opensea.io/${externalWallet}`
                                    }
                                />
                            </>
                        ) : (
                            <div className="border-t border-l border-white/10 rounded-xl p-5 w-full bg-opacity-30; flex flex-col lg:flex-row justify-between items-center mb-8 bg-grey-dark">
                                <h1 className='md:text-5xl lg:text-6xl text-4xl  text-grey-content'>
                                    Your Portfolio
                                </h1>
                            </div>
                        )}
                    </div>
                    {!externalWallet && !address ? (
                        <div className="w-full flex justify-center">
                            <WalletButton
                                onClick={() => setOpenModal(true)}
                                disconnectWallet={disconnectWallet}
                            />
                        </div>
                    ) : (
                        // Total Lands and Total Worth Container
                        <div className="flex flex-col md:flex-row gap-4 lg:gap-12 md:gap-6 mb-0 sm:mb-12">
                  
                            <div className="flex flex-col w-1/2 justify-between gap-4 text-center transition-all gray-box relative shadowNormal">
                                <h3 className="text-xl md:text-3xl xl:text-4xl  text-grey-content">
                                    Total LANDS Owned
                                </h3>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <p className="text-5xl animate-fade-in-slow text-grey-content mb-2 font-medium">
                                            {totalAssets}
                                        </p>
                                        {externalWallet && (
                                            <div
                                                onClick={seeOwnPortfolio}
                                                className="hover:scale-105 cursor-pointer max-w-max self-center font-medium text-white px-5 py-3 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-green-500/30 transition-all duration-300"
                                            >
                                                <span className="pt-1 text-xl">
                                                    My Portfolio
                                                </span>
                                            </div>
                                        )}
                             
                                        {!externalWallet && address && (
                                            <div className="flex gap-5 justify-end">
                                    
                                                <button
                                                    onClick={copyLink}
                                                    className="relative"
                                                >
                                                    <FiCopy className="w-9 h-9 text-gray-400 relative hover:text-grey-content" />
                                                    {copiedText && (
                                                        <Fade
                                                            direction="bottom-right"
                                                            duration={500}
                                                        >
                                                            <span className="font-medium min-w-max absolute w-fit p-3 pt-4 bg-black/50 backdrop-blur-xl rounded-xl -top-1/2">
                                                                Link Copied!
                                                            </span>
                                                        </Fade>
                                                    )}
                                                </button>
                                         
                                                <button
                                                    onClick={() =>
                                                        window.open(
                                                            socialMedia.twitter
                                                                .portfolioLink
                                                        )
                                                    }
                                                    className=""
                                                >
                                                    <BsTwitter className="text-gray-400 w-9 h-9 hover:text-blue-400" />
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                       
                            <div className="flex flex-col w-1/2  transition-all justify-between text-center mb-8 sm:mb-0 gray-box shadowNormal">
                                <h3 className="text-xl md:text-3xl xl:text-4xl mb-4 whitespace-nowrap  text-grey-content">
                                    Total Value Worth
                                </h3>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    totalWorth && (
                                        <PriceList predictions={totalWorth} />
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </hgroup>
            </section> */}
			</GeneralSection>
		</>
	)
}

export async function getServerSideProps() {
	let prices = await getCoingeckoPrices()

	return {
		props: {
			prices,
		},
	}
}

export default PortfolioPage