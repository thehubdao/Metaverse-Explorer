"use client"

import { useState } from "react";
import { Metaverses } from "../../enums/enums";
import { ICoinPrices, LandProps } from "../../types/valuationTypes";
import LandCardListUI from "../common/landCardList.ui";
import NolandsUI from "../common/noLands.ui";
import LandsMenuUI from "../common/landsMenu.ui";
import { useAppSelector } from "../../state/hooks";
import { ButtonForm } from "../../enums/common.enum";
import FooterUI from "../common/footer.ui";

const ilands: LandProps[] = [
  {
    metaverse: "The Sandbox",
    tokenId: '45',
    name: "LAND (0,-1)",
    images: {
      image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
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
    name: "LAND (0,-1)",
    images: {
      image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
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
    name: "Extra Large #974 (XL) parcel in somnium space",
    images: {
      image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
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
    name: "LAND (0,-1)",
    images: {
      image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
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


export default function PortfolioUI() {
  const landsOwned = ilands.length; //TODO: connect variable from redux portfolio state 
  const valueWorth = 1.52; //TODO: connect variable from redux portfolio state 
  const lands = ilands;
  const [metaverseSelected, setMetaverseSelected] = useState(Metaverses.ALL);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [filteredLands, setFilteredLands] = useState<LandProps[]>(ilands);
  const list = useAppSelector((state) => { state.portfolio.list })

  const filterLands = (metaverse: Metaverses) => {
    setMetaverseSelected(metaverse);
    if (metaverse !== Metaverses.ALL) {
      setFilteredLands(lands.filter((land) => land.metaverse === metaverse));
      filterLands.length > 0 ? setIsEmpty(false) : setIsEmpty(true);
    } else {
      setFilteredLands(lands);
      filterLands.length > 0 ? setIsEmpty(false) : setIsEmpty(true);
    }
  }

  return (
    <>
      <div className="flex justify-between mt-10">
        <div className="flex flex-col space-y-3 max-w-2xl text-lm-text">
          <p className="text-2xl font-semibold">Description</p>
          <p className="text-sm mt-5">The HUB LAND price estimator uses AI to calculate the fair value of LANDs and help you find undervalued ones.  Leverage our heatmap to quickly get an overview of the Sandbox Map and get insights about current price trends. The valuations are updated at a daily basis.</p>
        </div>
        <div className="flex space-x-4 w-full items-stretch justify-end">
          <div className="flex flex-col w-48 h-52 items-center justify-center rounded-xl bg-nm-fill">
            <p className=" font-extrabold text-3xl">{landsOwned}</p>
            <p className="text-sm font-bold pt-8">Total LANDs owned</p>
          </div>
          <div className="flex flex-col w-48 h-52 items-center justify-center rounded-xl bg-nm-fill">
            <p className=" font-extrabold text-3xl">{valueWorth} ETH</p>
            <p className="text-sm font-bold pt-8">Total Value worth</p>
          </div>
        </div>
      </div>

      <div className='mb-24'>
        <LandsMenuUI metaverse={metaverseSelected} setMetaverse={(metaverse: Metaverses) => filterLands(metaverse)} form={ButtonForm.Horizontal} isBorder={true} />
      </div>
      <>
        {
          isEmpty ?
            <NolandsUI />
            :
            <div>
              <div className=" mb-24 flex flex-wrap w-full justify-between">
                <LandCardListUI lands={filteredLands} prices={coinPrices} />
              </div>
            </div>
        }
      </>
      <FooterUI />
    </>
  )
}
