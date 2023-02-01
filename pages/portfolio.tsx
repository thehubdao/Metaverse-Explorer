import Head from 'next/head'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import {
	convertETHPrediction,
	fetchLandList,
} from '../lib/valuation/valuationUtils'
import {
	ICoinPrices,
	LandListAPIResponse,
	SingleLandAPIResponse,
} from '../lib/valuation/valuationTypes'
import { ExternalLink, PriceList } from '../components/General'
import { IPredictions } from '../lib/types'
import { useAppSelector } from '../state/hooks'
import { useRouter } from 'next/router'
import { ellipseAddress, formatName, typedKeys } from '../lib/utilities'
import { Loader, WalletModal } from '../components'
import PortfolioList from '../components/Portfolio/PortfolioList'
import { BsTwitter } from 'react-icons/bs'
import { FiCopy } from 'react-icons/fi'
import { SocialMediaOptions } from '../lib/socialMediaOptions'
import { ethers } from 'ethers'
import { Chains } from '../lib/chains'
import { Metaverses } from "../lib/enums"
import { getAxieLands, getUserNFTs } from '../lib/nftUtils'
import { getAddress } from 'ethers/lib/utils'
import { Metaverse, metaverseObject } from '../lib/metaverse'
import GeneralSection from '../components/GeneralSection'
import SpecificAssetModal from '../components/General/SpecificAssetModal'

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

const PortfolioPage: NextPage<{ prices: ICoinPrices }> = ({ prices }) => {
	const { query, push } = useRouter()

	const initialWorth = {
		ethPrediction: 0,
		usdPrediction: 0,
	}
	const { address } = useAccount()
	/* const { address, chainId } = useAppSelector((state) => state.account) */
	const [copiedText, setCopiedText] = useState(false)
	const [metaverse, setMetaverse] = useState(Metaverses.ALL)

	const [totalWorth, setTotalWorth] = useState<IPredictions>(initialWorth)
	const [totalAssets, setTotalAssets] = useState(0)
	const [alreadyFetched, setAlreadyFetched] = useState(false)
	const [lands, setLands] = useState<Record<Metaverse, LandListAPIResponse>>()
	const [loading, setLoading] = useState(true)

	// Specific Land modal controller
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [specificLandSelected, setSpecificLandSelected] = useState<SingleLandAPIResponse>();

	const socialMedia = SocialMediaOptions(
		undefined,
		undefined,
		undefined,
		address
	)
	const externalWallet = query.wallet
	const isRonin = query.wallet?.toString().startsWith('ronin')

	const copyLink = () => {
		navigator.clipboard.writeText(
			'https://app.metagamehub.io/portfolio?wallet=' + address
		)
		// Display Feedback Text

		setCopiedText(true)
		setTimeout(() => {
			setCopiedText(false)
		}, 1100)
	}

	// Resetting state when Wallet Changes
	const resetState = () => {
		setCopiedText(false)
		setLoading(true)
		setTotalWorth(initialWorth)
		setTotalAssets(0)
		setLands(undefined)
	}

	const formatAddress = (address: string) => {
		// If Ronin Address
		if (address.startsWith('ronin:')) {
			return getAddress(address.substring(address.indexOf(':') + 1))
		}
		if (address.startsWith('0x')) return getAddress(address)
		return getAddress('0x0000000000000000000000000000000000000000')
	}

	const handleSpecificLandData = (
		openModal: boolean,
		landData?: any,
		landId?: string,
		functionMetaverse?: Metaverse) => {
		if (landId && functionMetaverse && lands) {
			let results = lands[functionMetaverse]
			if (results)
				setSpecificLandSelected(results[landId])
		}
		landData && setSpecificLandSelected(landData)
		setIsModalOpen(openModal)
	}

	useEffect(() => {
		if (externalWallet && alreadyFetched) return
		setAlreadyFetched(true)

		const provider = new ethers.providers.InfuraProvider(
			Chains.ETHEREUM_MAINNET.chainId,
			'03bfd7b76f3749c8bb9f2c91bdba37f3'
		)

		// Requesting and Formatting Assets
		const setPortfolioAssets = async () => {
			resetState()
			if (!address && !externalWallet) return setLoading(false)

			// Infura/ Axie Market API Call
			try {
				await Promise.all(
					typedKeys(metaverseObject).map(async (metaverse) => {
						let rawIds: string[] | undefined
						if (/* metaverse === 'axie-infinity' */ false) {
							rawIds = await getAxieLands(
								formatAddress(
									(externalWallet as string) ?? address
								)
							)
						} else {
							rawIds = await getUserNFTs(
								provider,
								formatAddress(
									(externalWallet as string) ?? address
								),
								metaverse
							)
						}
						if (!rawIds || rawIds.length <= 0) return

						// LandList Call
						const metaverseLandsObject = await fetchLandList(
							metaverse,
							rawIds
						)

						// Adding Total Worth
						const totalMvWorth = { usd: 0, eth: 0 }
						typedKeys(metaverseLandsObject).forEach((land) => {
							totalMvWorth.usd += convertETHPrediction(
								prices,
								metaverseLandsObject[land].eth_predicted_price,
								metaverse
							).usdPrediction
							totalMvWorth.eth +=
								metaverseLandsObject[land].eth_predicted_price
						})

						// Setting Lands
						setLands((previous) => {
							return {
								...previous!,
								[metaverse]: metaverseLandsObject,
							}
						})
						// Setting Asset Number
						setTotalAssets(
							(previous) =>
								previous +
								typedKeys(metaverseLandsObject).length
						)
						// Adding the worth of each metaverse into the totalWorth
						setTotalWorth((previousWorth) => ({
							ethPrediction:
								previousWorth.ethPrediction + totalMvWorth.eth,
							usdPrediction:
								previousWorth.usdPrediction + totalMvWorth.usd,
						}))
					})
				)
				setLoading(false)
			} catch (err) {
				console.log(err)
			}
		}

		setPortfolioAssets()
	}, [externalWallet, address])

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
			<div className={`relative ${!isModalOpen ? "p-0 mb-8 w-full" : "pt-24"}`}>
				<img
					src="/images/purchase_header.png"
					alt="purchase_header"
					className={`${!isModalOpen ? "object-fill flex w-full" : "hidden"}`}
				/>
			</div>

			{/* General Section Layout */}
			{
				isModalOpen ? (
					<SpecificAssetModal
						collectionName={metaverse}
						specificAssetSelected={specificLandSelected}
						handleSpecificAssetData={handleSpecificLandData}
						hiddenSearchBar={true}
					/>
				) : (
					<GeneralSection
						sectionTitle="Portfolio"
						optionList={headerList}
						backgroundClass={``}
					>

						<div className="flex items-center justify-between p-8 space-x-20">
							<div className="flex flex-col space-y-3 max-w-lg">
								<p className="text-2xl">Description</p>
								<p className="text-sm">The MGH LAND price estimator uses AI to calculate the fair value of LANDs and help you find undervalued ones.  Leverage our heatmap to quickly get an overview of the Sandbox Map and get insights about current price trends. The valuations are updated at a daily basis.</p>
							</div>
							<div className="flex space-x-8 w-full items-stretch justify-end max-w-2xl min-w-max">
								<div className="flex flex-col space-y-5 items-center justify-end nm-flat-medium p-3 rounded-lg">
									<p className=" font-black text-3xl">{totalAssets}</p>
									<p className="text-sm">Total LANDs owned</p>
								</div>

								<div className="flex flex-col space-y-2 items-center nm-flat-medium p-3 rounded-lg">
									<p className=" font-black text-2xl"><PriceList predictions={totalWorth} /></p>
									<p className="text-sm">Total Value worth</p>
								</div>

							</div>
						</div>

						<div className='w-full flex items-center justify-center space-x-5 py-5'>
							{(Object.keys(Metaverses) as Array<keyof typeof Metaverses>).map((key) => (
								<button
									type="button"
									className={`flex items-center py-2.5 px-5 text-sm font-bold focus:outline-none rounded-2xl text-grey-content font-plus shadowNormal nm-flat-soft hover:nm-inset-soft ${metaverse === Metaverses[key] ? "nm-inset-soft" : "nm-flat-soft"}`}
									onClick={() => setMetaverse(Metaverses[key])}
								>
									{Metaverses[key] === Metaverses.SANDBOX && <img src="/images/the-sandbox-sand-logo.png" className='h-6 w-6 mr-4' />}
									{Metaverses[key] === Metaverses.DECENTRALAND && <img src="/images/decentraland-mana-logo.png" className='h-6 w-6 mr-4' />}
									{/* {Metaverses[key] === Metaverses.AXIE && <img src="/images/axie-infinity-axs-logo.png" className='h-6 w-6 mr-4' />} */}
									{Metaverses[key] === Metaverses.SOMNIUM && <img src="/images/somnium-space-cube-logo.webp" className='h-6 w-6 mr-4' />}

									{Metaverses[key]}
								</button>
							))}
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

						{lands && metaverse === Metaverses.SANDBOX && lands["sandbox"] && typedKeys(lands["sandbox"]).length > 0 && (
							<div key={metaverse} className="mb-8 sm:mb-12">
								<PortfolioList
									metaverse={"sandbox"}
									lands={lands["sandbox"]}
									prices={prices}
									handleSpecificLandData={handleSpecificLandData}
								/>
							</div>
						)}

						{lands && metaverse === Metaverses.DECENTRALAND && lands["decentraland"] && typedKeys(lands["decentraland"]).length > 0 && (
							<div key={metaverse} className="mb-8 sm:mb-12">
								<PortfolioList
									metaverse={"decentraland"}
									lands={lands["decentraland"]}
									prices={prices}
									handleSpecificLandData={handleSpecificLandData}
								/>
							</div>
						)}

						{lands && metaverse === Metaverses.SOMNIUM && lands["somnium-space"] && typedKeys(lands["somnium-space"]).length > 0 && (
							<div key={metaverse} className="mb-8 sm:mb-12">
								<PortfolioList
									metaverse={"somnium-space"}
									lands={lands["somnium-space"]}
									prices={prices}
									handleSpecificLandData={handleSpecificLandData}
								/>
							</div>
						)}

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
                                <h1 className='md:text-5xl lg:text-6xl text-4xl font-plus text-grey-content'>
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
                                <h3 className="text-xl md:text-3xl xl:text-4xl font-plus text-grey-content">
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
                                <h3 className="text-xl md:text-3xl xl:text-4xl mb-4 whitespace-nowrap font-plus text-grey-content">
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
				)
			}
		</>
	)
}

export async function getServerSideProps() {
	const coin = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cthe-sandbox%2Cdecentraland%2Caxie-infinity%2Csomnium-space-cubes&vs_currencies=usd'
	)
	const prices: ICoinPrices = await coin.json()

	return {
		props: {
			prices,
		},
	}
}

export default PortfolioPage
