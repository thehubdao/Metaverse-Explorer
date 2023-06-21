import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from 'ethers/lib/utils'
import { Metaverse, metaverseObject } from '../lib/metaverse'
import { typedKeys } from "../lib/utilities";
import { getUserNFTs } from "../lib/nftUtils";
import { ethers } from "ethers";
import { Chains } from "../lib/chains";
import { convertETHPrediction, fetchLandList } from "../lib/valuation/valuationUtils";
import { getCoingeckoPrices } from "../backend/services/openSeaDataManager";
import { LandListAPIResponse } from "../lib/valuation/valuationTypes";

interface IState {
	list: Record<Metaverse, LandListAPIResponse>,
	isLoading: boolean,
	error: any,
	length: number,
	totalWorth: {
		ethPrediction: number
		usdPrediction: number
	}
	currentAddress: string
}

const initialState: IState = {
	list: { sandbox: {}, decentraland: {}, "somnium-space": {} },
	isLoading: false,
	length: 0,
	error: null,
	totalWorth: { ethPrediction: 0, usdPrediction: 0 },
	currentAddress: '0x0000000000000000000000000000000000000000'
}

const formatAddress = (address: string) => {
	// If Ronin Address
	if (address.startsWith('ronin:')) {
		return getAddress(address.substring(address.indexOf(':') + 1))
	}
	if (address.startsWith('0x')) return getAddress(address)
	return getAddress('0x0000000000000000000000000000000000000000')
}

export const fetchPortfolio = createAsyncThunk(
	'portfolio/fetchPortfolio',
	async ({ address }: { address: unknown }) => {
		const providerEthereum = new ethers.providers.InfuraProvider(
			Chains.ETHEREUM_MAINNET.chainId,
			'03bfd7b76f3749c8bb9f2c91bdba37f3'
		)

		const providerMatic = new ethers.providers.InfuraProvider(
			Chains.MATIC_MAINNET.chainId,
			'03bfd7b76f3749c8bb9f2c91bdba37f3'
		)

		if (!address) return "Error"

		let lands: any = {}
		let totalLandsCounter: number = 0
		let totalWorth = { ethPrediction: 0, usdPrediction: 0 }

		// Infura/ Axie Market API Call
		try {
			await Promise.all(
				typedKeys(metaverseObject).map(async (metaverse) => {
					let rawIdsEthereum: string[] | undefined
					let rawIdsMatic: string[] | undefined
					if (/* metaverse === 'axie-infinity' */ false) {
						/* rawIdsEthereum = await getAxieLands(
							formatAddress(
								(externalWallet as string) ?? address
							)
						) */
					} else {
						rawIdsEthereum = await getUserNFTs(
							providerEthereum,
							'Ethereum',
							formatAddress(`${address}`),
							metaverse
						)

						rawIdsMatic = await getUserNFTs(
							providerMatic,
							'Polygon',
							formatAddress(`${address}`),
							metaverse
						)
					}
					if ((!rawIdsEthereum || rawIdsEthereum.length <= 0) && (!rawIdsMatic || rawIdsMatic.length <= 0)) return

					// LandList Call
					let metaverseLandsObjectEthereum = {}
					let metaverseLandsObjectMatic = {}

					if (rawIdsEthereum && rawIdsEthereum.length > 0)
						metaverseLandsObjectEthereum = await fetchLandList(metaverse, rawIdsEthereum)

					if (rawIdsMatic && rawIdsMatic.length > 0)
						metaverseLandsObjectMatic = await fetchLandList(metaverse, rawIdsMatic)


					const metaverseLandsObject: any = { ...metaverseLandsObjectEthereum, ...metaverseLandsObjectMatic }

					let prices = await getCoingeckoPrices()

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
					lands[metaverse] = metaverseLandsObject

					// Setting Asset Number
					totalLandsCounter = totalLandsCounter + typedKeys(metaverseLandsObject).length

					// Adding the worth of each metaverse into the totalWorth
					totalWorth.ethPrediction = totalWorth.ethPrediction + totalMvWorth.eth
					totalWorth.usdPrediction = totalWorth.usdPrediction + totalMvWorth.usd
				})
			)
		} catch (err) {
			console.log(err)
		}
		const portfolio = { lands, totalLandsCounter, totalWorth, address };
		return portfolio;
	}
)

export const portfolio = createSlice({
	name: 'portfolio',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPortfolio.pending, (state) => {
			state.isLoading = true;
		})
		builder.addCase(fetchPortfolio.fulfilled, (state, action: any) => {
			state.isLoading = false;
			state.list = action.payload.lands;
			state.length = action.payload.totalLandsCounter
			state.totalWorth = action.payload.totalWorth
			state.currentAddress = action.payload.address
		})
		builder.addCase(fetchPortfolio.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message
		})
	}
})

export default portfolio.reducer