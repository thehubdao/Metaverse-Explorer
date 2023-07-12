"use client"

import { useEffect, useState } from "react";
import FooterUI from "../../ui/common/footer.ui";
import IsLoginUI from "../../ui/common/isLogin.ui";
import LandsMenuUI from "../../ui/portfolio/landsMenu.ui";
import { Metaverses } from "../../enums/enums";
import { ICoinPrices, LandProps } from "../../types/valuationTypes";
import PortfolioCardUI from "../../ui/portfolio/portfolioCard.ui";
import NolandsUI from "../../ui/common/noLands.ui";

const ilands: LandProps[] =[
    {
        metaverse: "The Sandbox",
        tokenId: '45',
        name:"LAND (0,-1)",
        images:{
            image_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=1024&w=1024&auto=format",
            image_thumbnail_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=250&w=250&auto=format",
            image_original_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=128&w=128&auto=format",
            image_preview_url: "https://api.sandbox.game/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/v2/preview-500px-x-500px.jpg"
        },
        opensea_link: "https://opensea.io/assets/ethereum/0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38/45",
        external_link: "https://www.sandbox.game/en/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/",
        token_metadata: "https://api.sandbox.game/lands/45/metadata.json",
        predicted_price: 2.1985602407860347,
        eth_predicted_price: 2.363476837696573,
        floor_adjusted_predicted_price: 2.363476837696573,
        coords: {
        x: -159,
        y: -204
        },
        land_type: "Premium",
        history: [
        {
            timestamp: 1641616142000,
            time: "2022-01-08 04:29:02",
            hash: "5.25671023620356e+76",
            action: "Bought",
            price: 0.25,
            eth_price: 0.25,
            symbol: "ETH",
            owner: "1.966961568107039e+47",
            market: "OpenSea",
            chain: "ethereum"
        }
        ],
        variation_last_week: 0,
        variation_last_four_weeks: 0,
        variation_last_six_months: 0
    },
    {
        metaverse: "Decentraland",
        tokenId: '46',
        name:"LAND (0,-1)",
        images:{
            image_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=1024&w=1024&auto=format",
            image_thumbnail_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=250&w=250&auto=format",
            image_original_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=128&w=128&auto=format",
            image_preview_url: "https://api.sandbox.game/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/v2/preview-500px-x-500px.jpg"
        },
        opensea_link: "https://opensea.io/assets/ethereum/0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38/45",
        external_link: "https://www.sandbox.game/en/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/",
        token_metadata: "https://api.sandbox.game/lands/45/metadata.json",
        predicted_price: 2.1985602407860347,
        eth_predicted_price: 2.363476837696573,
        floor_adjusted_predicted_price: 2.363476837696573,
        coords: {
        x: -159,
        y: -204
        },
        land_type: "Premium",
        history: [
        {
            timestamp: 1641616142000,
            time: "2022-01-08 04:29:02",
            hash: "5.25671023620356e+76",
            action: "Bought",
            price: 0.25,
            eth_price: 0.25,
            symbol: "ETH",
            owner: "1.966961568107039e+47",
            market: "OpenSea",
            chain: "ethereum"
        }
        ],
        variation_last_week: 0,
        variation_last_four_weeks: 0,
        variation_last_six_months: 0
    },
    {
        metaverse: "Somnium Space",
        tokenId: '47',
        name:"Extra Large #974 (XL) parcel in somnium space",
        images:{
            image_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=1024&w=1024&auto=format",
            image_thumbnail_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=250&w=250&auto=format",
            image_original_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=128&w=128&auto=format",
            image_preview_url: "https://api.sandbox.game/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/v2/preview-500px-x-500px.jpg"
        },
        opensea_link: "https://opensea.io/assets/ethereum/0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38/45",
        external_link: "https://www.sandbox.game/en/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/",
        token_metadata: "https://api.sandbox.game/lands/45/metadata.json",
        predicted_price: 2.1985602407860347,
        eth_predicted_price: 2.363476837696573,
        floor_adjusted_predicted_price: 2.363476837696573,
        coords: {
        x: -159,
        y: -204
        },
        land_type: "Premium",
        history: [
        {
            timestamp: 1641616142000,
            time: "2022-01-08 04:29:02",
            hash: "5.25671023620356e+76",
            action: "Bought",
            price: 0.25,
            eth_price: 0.25,
            symbol: "ETH",
            owner: "1.966961568107039e+47",
            market: "OpenSea",
            chain: "ethereum"
        }
        ],
        variation_last_week: 0,
        variation_last_four_weeks: 0,
        variation_last_six_months: 0
    },
    {
        metaverse: "Somnium Space",
        tokenId: '48',
        name:"LAND (0,-1)",
        images:{
            image_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=1024&w=1024&auto=format",
            image_thumbnail_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=250&w=250&auto=format",
            image_original_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=128&w=128&auto=format",
            image_preview_url: "https://api.sandbox.game/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/v2/preview-500px-x-500px.jpg"
        },
        opensea_link: "https://opensea.io/assets/ethereum/0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38/45",
        external_link: "https://www.sandbox.game/en/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/",
        token_metadata: "https://api.sandbox.game/lands/45/metadata.json",
        predicted_price: 2.1985602407860347,
        eth_predicted_price: 2.363476837696573,
        floor_adjusted_predicted_price: 2.363476837696573,
        coords: {
        x: -159,
        y: -204
        },
        land_type: "Premium",
        history: [
        {
            timestamp: 1641616142000,
            time: "2022-01-08 04:29:02",
            hash: "5.25671023620356e+76",
            action: "Bought",
            price: 0.25,
            eth_price: 0.25,
            symbol: "ETH",
            owner: "1.966961568107039e+47",
            market: "OpenSea",
            chain: "ethereum"
        }
        ],
        variation_last_week: 0,
        variation_last_four_weeks: 0,
        variation_last_six_months: 0
    }

]

const coinPrices: ICoinPrices = {
    decentraland: 0.0456,
    ethereum: 2897.65,
    'the-sandbox': 12.34,
    'axie-infinity': 67.89,
    'somnium-space-cubes': 0.9876
  };
const ivalue = 1.52

export default function PortfolioComponent (){
    const isConnected = true
    const [landsOwned, setLandsOwned] = useState<number>(0)
    const [valueWorth, setValueWorth] = useState<number>(0)
    const [metaverse, setMetaverse] = useState(Metaverses.ALL)
    const [isEmpty, setIsEmpty] = useState<boolean>(false)
    let filteredLands = ilands;

    useEffect(()=>{
        setValueWorth(ivalue)
        setLandsOwned(ilands.length)
    },[])

    useEffect(()=>{
        if (metaverse !== Metaverses.ALL) {
        filteredLands = ilands.filter((iland) => iland.metaverse === metaverse);  
        if(filteredLands.length === 0){
            setIsEmpty(true);
        }
        else{
            setIsEmpty(false)
        }
        } else if(metaverse === Metaverses.ALL){
            if(filteredLands.length !== 0){
                setIsEmpty(false)
            }
            else{
                setIsEmpty(true)
            }
        }
    },[metaverse])

    return (
        <>
            {!isConnected ?
            <IsLoginUI message="Please log in to show your portfolio"/>
            :
            <>
                <div className="flex justify-between p-8 space-x-20 mt-10">
                    <div className="flex flex-col space-y-3 max-w-2xl text-nm-dm-icons pl-8">
                        <p className="text-2xl font-semibold">Description</p>
                        <p className="text-sm mt-5">The MGH LAND price estimator uses AI to calculate the fair value of LANDs and help you find undervalued ones.  Leverage our heatmap to quickly get an overview of the Sandbox Map and get insights about current price trends. The valuations are updated at a daily basis.</p>
                    </div>
                    <div className="flex space-x-4 w-full items-stretch justify-end ">
                        <div className="flex flex-col w-52 h-40 items-center justify-center shadow-relief-12 rounded-3xl bg-nm-fill">
                            <p className=" font-extrabold text-3xl">{landsOwned}</p>
                            <p className="text-sm font-bold pt-5">Total LANDs owned</p>
                        </div>
                        <div className="flex flex-col w-52 h-40 items-center justify-center shadow-relief-12 rounded-3xl bg-nm-fill">
                            <p className=" font-extrabold text-3xl">{valueWorth} ETH</p>
                            <p className="text-sm font-bold pt-5">Total Value worth</p>
                        </div>
                    </div>
                </div>

                <div className='mx-16 mb-24'>
                    <LandsMenuUI metaverse={metaverse} setMetaverse={setMetaverse}/>
                </div>
                <>
                {
                    isEmpty?
                    <NolandsUI />
                    :
                    <div className="mx-16">
                        <div className=" mb-24 flex flex-wrap w-full justify-between">
                            <PortfolioCardUI lands={ilands} metaverse={metaverse} prices={coinPrices}/>
                        </div>
                    </div>
                }
                </>
            </>
            }
            <FooterUI/>
        </>
    )
}