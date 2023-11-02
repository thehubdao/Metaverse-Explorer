import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { getAddress } from 'ethers/lib/utils'
import { getUserNFTs } from "../lib/nftUtils";
import { Chains } from "../lib/chains";
import { fetchLandList } from "../lib/valuation/valuationUtils";
import { getCoingeckoPrices } from "../backend/services/ITRMService";
import { LogError } from "../utils/logging.util";
import { Module } from "../enums/logging.enum";
import { convertETHPrediction, TypedKeys } from "../utils/common.util";
import { LandListAPIResponse } from "../types/valuation.type";
import { Metaverses } from "../enums/metaverses.enum";
import { DEFAULT_TOTAL_WORTH } from "../constants/common.constant";
import { TotalWorthData } from "../interfaces/land.interface";

interface IState {
    list: Record<Metaverses, LandListAPIResponse> | undefined,
    isLoading: boolean;
    error: string | undefined;
    length: number | undefined;
    totalWorth: TotalWorthData;
    currentAddress: string | undefined;
    metaverseSelected: Metaverses | undefined;
}

const initialState: IState = {
    list: undefined,
    isLoading: false,
    length: 0,
    error: undefined,
    totalWorth: DEFAULT_TOTAL_WORTH,
    currentAddress: undefined,
    metaverseSelected: undefined
}

const formatAddress = (address: string) => {
    if (address.startsWith('ronin:')) {
        return getAddress(address.substring(address.indexOf(':') + 1));
    }
    if (address.startsWith('0x')) return getAddress(address);
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

        if (!address) {
            const msg = "Address undefined";
            LogError(Module.PortfolioSlice, msg);
            return { error: msg }
        }


        const lands: Record<Metaverses, LandListAPIResponse> = { sandbox: {}, decentraland: {}, "somnium-space": {} };
        let totalLandsCounter = 0;
        const totalWorth: TotalWorthData = { ethPrediction: 0, usdcPrediction: 0};

        try {
            await Promise.all(
                Object.values(Metaverses).map(async (metaverse) => {
                    const rawIdsEthereum: string[] | undefined = await getUserNFTs(
                        providerEthereum,
                        'Ethereum',
                        formatAddress(address),
                        metaverse
                    );

                    const rawIdsMatic: string[] | undefined = await getUserNFTs(
                        providerMatic,
                        'Polygon',
                        formatAddress(address),
                        metaverse
                    );

                    if ((!rawIdsEthereum || rawIdsEthereum.length <= 0) && (!rawIdsMatic || rawIdsMatic.length <= 0)) {
                        const msg = "rawIds is undefined or their length is <= 0";
                        LogError(Module.PortfolioSlice, msg);
                        return { error: msg }
                    }

                    // LandList Call
                    let metaverseLandsObjectEthereum: LandListAPIResponse = {};
                    let metaverseLandsObjectMatic: LandListAPIResponse = {};

                    if (rawIdsEthereum && rawIdsEthereum.length > 0) {
                        metaverseLandsObjectEthereum = await fetchLandList(metaverse, rawIdsEthereum);
                    }

                    if (rawIdsMatic && rawIdsMatic.length > 0) {
                        metaverseLandsObjectMatic = await fetchLandList(metaverse, rawIdsMatic);
                    }

                    const metaverseLandsObject = { ...metaverseLandsObjectEthereum, ...metaverseLandsObjectMatic };

                    //TODO: replace for coinGecko redux state
                    const prices = await getCoingeckoPrices();

                    // Adding Total Worth
                    const totalMvWorth = { usd: 0, eth: 0 };
                    TypedKeys(metaverseLandsObject).forEach((land) => {
                        const usdcPrediction = convertETHPrediction(
                            prices,
                            metaverseLandsObject[land].eth_predicted_price,
                            metaverse
                        ).usdcPrediction
                        //TODO: check totalMvWorth use 
                        if(usdcPrediction) totalMvWorth.usd += usdcPrediction;
                        totalMvWorth.eth +=
                            metaverseLandsObject[land].eth_predicted_price
                    })

                    if (lands != undefined) {
                        // Setting Lands
                        lands[metaverse] = metaverseLandsObject;
                    }
                    // Setting Asset Number
                    totalLandsCounter = totalLandsCounter + TypedKeys(metaverseLandsObject).length;

                    // Adding the worth of each metaverse into the totalWorth
                    if (totalWorth != undefined) {
                        totalWorth.ethPrediction = totalWorth.ethPrediction + totalMvWorth.eth;
                        totalWorth.usdcPrediction = totalWorth.usdcPrediction + totalMvWorth.usd;
                    }
                })
            )
        } catch (err) {
            const msg = "A promise has failed";
            LogError(Module.PortfolioSlice, msg, err);
            return {error: msg}
        }
        return { lands, totalLandsCounter, totalWorth, address };
    }
)

export const portfolio = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setPortfolioMetaverse(state, action:PayloadAction<Metaverses | undefined>) {
            state.metaverseSelected = action.payload;
        },
        cleanPortfolioMetaverse: (state) => state.metaverseSelected = undefined
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPortfolio.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPortfolio.fulfilled, (state, action) => {
            state.isLoading = false;
            state.list = action.payload?.lands;
            state.length = action.payload?.totalLandsCounter;
            state.totalWorth = action.payload?.totalWorth ?? DEFAULT_TOTAL_WORTH;
            state.currentAddress = action.payload?.address;
            state.error = action.payload.error ?? undefined;
        });
        builder.addCase(fetchPortfolio.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
})

export const { setPortfolioMetaverse, cleanPortfolioMetaverse } = portfolio.actions

export default portfolio.reducer;