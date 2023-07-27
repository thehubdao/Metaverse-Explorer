import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { getAddress } from 'ethers/lib/utils'
import { Metaverse, metaverseObject } from '../lib/metaverse'
import { typedKeys } from "../lib/utilities";
import { getUserNFTs } from "../lib/nftUtils";
import { Chains } from "../lib/chains";
import { convertETHPrediction, fetchLandList } from "../lib/valuation/valuationUtils";
import { LandListAPIResponse } from "../lib/valuation/valuationTypes";
import { getCoingeckoPrices } from "../backend/services/ITRMService";

interface TotalWorth {
	ethPrediction: number
	usdPrediction: number
}
interface IState {
	list: Record<Metaverse, LandListAPIResponse> | undefined,
	isLoading: boolean,
	error: string | undefined,
	length: number | undefined,
	totalWorth: TotalWorth | undefined
	currentAddress: string | undefined
}

const initialState: IState = {
	list: undefined,
	isLoading: false,
	length: 0,
	error: undefined,
	totalWorth: undefined,
	currentAddress: undefined
}

const formatAddress = (address: string) => {
	if (address.startsWith('ronin:')) {
		return getAddress(address.substring(address.indexOf(':') + 1))
	}
	if (address.startsWith('0x')) return getAddress(address)
	return;
}

export const fetchPortfolio = createAsyncThunk(
	'portfolio/fetchPortfolio',
	async ({ address }: { address: string }) => {

		const providerEthereum = new ethers.providers.InfuraProvider(
			Chains.ETHEREUM_MAINNET.chainId,
			'03bfd7b76f3749c8bb9f2c91bdba37f3'
		);

		const providerMatic = new ethers.providers.InfuraProvider(
			Chains.MATIC_MAINNET.chainId,
			'03bfd7b76f3749c8bb9f2c91bdba37f3'
		);

		if (!address) return null;

		let lands: Record<Metaverse, LandListAPIResponse> | undefined;
		let totalLandsCounter = 0;
		let totalWorth: TotalWorth | undefined;

		try {
			await Promise.all(
				typedKeys(metaverseObject).map(async (metaverse) => {
					const rawIdsEthereum: string[] | undefined = await getUserNFTs(
						providerEthereum,
						'Ethereum',
						formatAddress(address),
						metaverse
					)

					const rawIdsMatic: string[] | undefined = await getUserNFTs(
						providerMatic,
						'Polygon',
						formatAddress(address),
						metaverse
					)

					if ((!rawIdsEthereum || rawIdsEthereum.length <= 0) && (!rawIdsMatic || rawIdsMatic.length <= 0)) return;

					// LandList Call
					let metaverseLandsObjectEthereum: LandListAPIResponse = {};
					let metaverseLandsObjectMatic: LandListAPIResponse = {};

					if (rawIdsEthereum && rawIdsEthereum.length > 0)
						metaverseLandsObjectEthereum = await fetchLandList(metaverse, rawIdsEthereum);

					if (rawIdsMatic && rawIdsMatic.length > 0)
						metaverseLandsObjectMatic = await fetchLandList(metaverse, rawIdsMatic);


					const metaverseLandsObject = { ...metaverseLandsObjectEthereum, ...metaverseLandsObjectMatic }

					const prices = await getCoingeckoPrices();

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

					if (lands != undefined) {
						// Setting Lands
						lands[metaverse] = metaverseLandsObject;
					}
					// Setting Asset Number
					totalLandsCounter = totalLandsCounter + typedKeys(metaverseLandsObject).length;

					// Adding the worth of each metaverse into the totalWorth
					if (totalWorth != undefined) {
						totalWorth.ethPrediction = totalWorth.ethPrediction + totalMvWorth.eth;
						totalWorth.usdPrediction = totalWorth.usdPrediction + totalMvWorth.usd;
					}
				})
			)
		} catch (err) {
			console.error(err);
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
		builder.addCase(fetchPortfolio.fulfilled, (state, action) => {
			state.isLoading = false;
			state.list = action.payload?.lands;
			state.length = action.payload?.totalLandsCounter;
			state.totalWorth = action.payload?.totalWorth;
			state.currentAddress = action.payload?.address;
		})
		builder.addCase(fetchPortfolio.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		})
	}
})

export default portfolio.reducer