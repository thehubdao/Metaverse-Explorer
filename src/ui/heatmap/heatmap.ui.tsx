"use client"

import { useState } from "react";
import FooterUI from "../../ui/common/footer.ui";
import IsLoginUI from "../../ui/common/isLogin.ui";
import { Metaverses } from "../../enums/enums";
import { BsExclamationCircleFill } from "react-icons/bs";
import Image from "next/image";
import LandsMenuUI from "../common/landsMenu.ui";
import { ButtonForm, TopLandForm } from "../../enums/common.enum";
import EstimatorValuesUI from "./estimatorValues.ui";
import BoxInformationUI from "./boxInformation.ui";
import { ICoinPrices } from "../../types/valuationTypes";
import TopLandsUI from "./topLands.ui";
import HotDealsUI from "./hotDeals/hotDeals.ui";
import { TopLandsData } from "../../interfaces/heatmap.interface";

const coinPrices: ICoinPrices = {
  decentraland: 0.0456,
  ethereum: 2897.65,
  'the-sandbox': 12.34,
  'axie-infinity': 67.89,
  'somnium-space-cubes': 0.9876
};

const tableDataPicks: TopLandsData[] = [
  {
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    coords: "(x:-74, y:20)",
    current_price_eth: 0.38,
    eth_predicted_price: 2.30,
    gap: 80,
  },
  {
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    coords: "(x:-74, y:20)",
    current_price_eth: 0.38,
    eth_predicted_price: 2.30,
    gap: 80,
  },
  {
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    coords: "(x:-74, y:20)",
    current_price_eth: 0.38,
    eth_predicted_price: 2.30,
    gap: 80,
  },
  {
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    coords: "(x:-74, y:20)",
    current_price_eth: 0.38,
    eth_predicted_price: 2.30,
    gap: 80,
  },
  {
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    coords: "(x:-74, y:20)",
    current_price_eth: 0.38,
    eth_predicted_price: 2.30,
    gap: 80,
  },
  {
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    coords: "(x:-74, y:20)",
    current_price_eth: 0.38,
    eth_predicted_price: 2.30,
    gap: 80,
  },
  {
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    coords: "(x:-74, y:20)",
    current_price_eth: 0.38,
    eth_predicted_price: 2.30,
    gap: 80,
  },
  {
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    coords: "(x:-74, y:20)",
    current_price_eth: 0.38,
    eth_predicted_price: 2.30,
    gap: 80,
  },
  {
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    coords: "(x:-74, y:20)",
    current_price_eth: 0.38,
    eth_predicted_price: 2.30,
    gap: 80,
  },
  {
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    coords: "(x:-74, y:20)",
    current_price_eth: 0.38,
    eth_predicted_price: 2.30,
    gap: 80,
  },
  {
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    coords: "(x:-74, y:20)",
    current_price_eth: 0.38,
    eth_predicted_price: 2.30,
    gap: 80,
  },
];

const tableDataSells: TopLandsData[] = [
  {
    position: 1,
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    asset: "(x:-74, y:20)",
    current_price_eth: 0.38,
    date: "Thu Jan 27 2022",
  },
  {
    position: 2,
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    asset: "(x:-74, y:20)",
    current_price_eth: 0.38,
    buyer: '0x6b9695bab373b5753d018f336a1b89ee27e89c9b',
    date: "Thu Jan 27 2022",
  },
  {
    position: 3,
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    asset: "(x:-74, y:20)",
    current_price_eth: 0.38,
    buyer: '0x6b9695bab373b5753d018f336a1b89ee27e89c9b',
    date: "Thu Jan 27 2022",
  },
  {
    position: 4,
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    asset: "(x:-74, y:20)",
    current_price_eth: 0.38,
    buyer: '0x6b9695bab373b5753d018f336a1b89ee27e89c9b',
    date: "Thu Jan 27 2022",
  },
  {
    position: 5,
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    asset: "(x:-74, y:20)",
    current_price_eth: 0.38,
    buyer: '0x6b9695bab373b5753d018f336a1b89ee27e89c9b',
    date: "Thu Jan 27 2022",
  },
  {
    position: 6,
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    asset: "(x:-74, y:20)",
    current_price_eth: 0.38,
    buyer: '0x6b9695bab373b5753d018f336a1b89ee27e89c9b',
    date: "Thu Jan 27 2022",
  },
  {
    position: 7,
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    asset: "(x:-74, y:20)",
    current_price_eth: 0.38,
    buyer: '0x6b9695bab373b5753d018f336a1b89ee27e89c9b',
    date: "Thu Jan 27 2022",
  },
  {
    position: 8,
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    asset: "(x:-74, y:20)",
    current_price_eth: 0.38,
    buyer: '0x6b9695bab373b5753d018f336a1b89ee27e89c9b',
    date: "Thu Jan 27 2022",
  },
  {
    position: 9,
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    asset: "(x:-74, y:20)",
    current_price_eth: 0.38,
    buyer: '0x6b9695bab373b5753d018f336a1b89ee27e89c9b',
    date: "Thu Jan 27 2022",
  },
  {
    position: 10,
    image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    asset: "(x:-74, y:20)",
    current_price_eth: 0.38,
    buyer: '0x6b9695bab373b5753d018f336a1b89ee27e89c9b',
    date: "Thu Jan 27 2022",
  },
  // {
  //   position: 11,
  //   image: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
  //   external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
  //   asset: "(x:-74, y:20)",
  //   current_price_eth: 0.38,
  //   buyer: '0x6b9695bab373b5753d018f336a1b89ee27e89c9b',
  //   date: "Thu Jan 27 2022",
  // },
];

const headersPicks = [
  "Land", "Coords", "Current price", "Predicted price", "Gap"
];

const headersSells = [
  "Rank", "Asset", "Price", "Buyer", "Purchased"
];

const globalData = {
  floor: 0.084,
  tradingVolume: 20.475,
  mcap: 8.834,
  owners: 4446
};

export default function HeatmapUI() {
  const isConnected = true; //TODO: connect variable from redux login state 
  const [metaverseSelected, setMetaverseSelected] = useState(Metaverses.ALL);
  const filterLands = (metaverse: Metaverses) => {
    setMetaverseSelected(metaverse);
  }


  return (
    <>
      {!isConnected ?
        <IsLoginUI message="Please log in to use the valuation tool" />
        :
        <div className={`px-20 mb-24 mt-10 rounded-2xl ${metaverseSelected === Metaverses.ALL ? 'bg-lm-fill' : ''}`}>
          {
            metaverseSelected === Metaverses.ALL ?
              <div >
                <h2 className='text-lm-text font-bold text-2xl lg:text-3xl text-center py-8'>
                  Choose a Metaverse
                </h2>

                <div className='flex gap-x-2 items-center justify-center bg-nm-gray rounded-[32px] w-fit m-auto py-2 px-24'>
                  <BsExclamationCircleFill className={`text-2xl text-[#6196FF]`} />
                  <p className='flex text-base font-semibold  text-lm-text'>You can have 5 free valuations, after that pro version is needed</p>
                </div>

                <LandsMenuUI metaverse={metaverseSelected} setMetaverse={(metaverse: Metaverses) => filterLands(metaverse)} form={ButtonForm.Vertical} isBorder={false} />
                <div className="flex justify-center items-center pb-6">
                  <Image src='/images/icons/magic-store.png' width={196} height={44} alt="magic store" />
                </div>
              </div>
              :
              <div>
                {metaverseSelected &&
                  <>
                    <EstimatorValuesUI metaverseSelected={metaverseSelected} info={`THE HUB LAND price estimator uses AI to calculate the fair value of LANDs and help you find undervalued ones.  Leverage our heatmap to quickly get an overview of ${metaverseSelected} Map and get insights about current price trends. The valuations are updated at a daily basis.`} floor={globalData.floor} tradingVolume={globalData.tradingVolume} mcap={globalData.mcap} owners={globalData.owners} />
                    <div className="w-full h-[678px] bg-lm-fill rounded-3xl flex justify-center items-center">
                      <h1 className="text-3xl font-bold">heatmap</h1>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mt-7">
                        <div className="flex flex-col justify-center text-center">
                          <p className="text-lm-text font-bold lg:text-3xl text-2xl text-center">{metaverseSelected} Hot Deals</p>
                          <p className="font-medium text-center">Underpriced listings  on offer</p>
                        </div>
                      </div>
                      <div className="mt-7">
                        {/* <HotDealsUI metaverseSelected={metaverseSelected} prices={coinPrices} /> */}
                      </div>
                    </div>
                    <div className="mt-10 flex justify-between w-full items-end">
                      <div className="flex gap-x-4">
                        <BoxInformationUI title={"Daily Volume:"} prices={coinPrices} />
                        <BoxInformationUI title={"Floor Price:"} prices={coinPrices} />
                        <BoxInformationUI title={"Estimate Accuracy:"} prices={coinPrices} />
                      </div>
                      <div className="w-[580px] h-[205px] bg-lm-fill rounded-3xl flex flex-col items-center justify-center">
                        <h1>Graph</h1>
                        <p>coming soon</p>
                      </div>
                    </div>
                    <div className="bg-lm-fill rounded-3xl w-full mt-10 py-10 px-12">
                      <TopLandsUI tableData={tableDataPicks} title="Our Top Picks" headers={headersPicks} form={TopLandForm.Picks} />
                    </div>
                    <div className="bg-lm-fill rounded-3xl w-full mt-10 py-10 px-12">

                      <TopLandsUI tableData={tableDataSells} title="Our Top Sells" headers={headersSells} form={TopLandForm.Sells} />
                    </div>
                  </>
                }
              </div>
          }
        </div>
      }
      <FooterUI />
    </>
  )
}