"use client"

import { useState } from "react";
import FooterUI from "../../ui/common/footer.ui";
import IsLoginUI from "../../ui/common/isLogin.ui";
import { Metaverses } from "../../enums/enums";
import { BsExclamationCircleFill } from "react-icons/bs";
import Image from "next/image";
import LandsMenuUI from "../common/landsMenu.ui";
import { ButtonForm } from "../../enums/common.enum";
import EstimatorValuesUI from "./estimatorValues";


export default function HeatmapUI() {
  const isConnected = true; //TODO: connect variable from redux login state 
  const [metaverseSelected, setMetaverseSelected] = useState(Metaverses.ALL);

  const filterLands = (metaverse: Metaverses) => {
    setMetaverseSelected(metaverse);
  }

  const globalData = {
    floor: 0.084,
    tradingVolume: 20.475,
    mcap: 8.834,
    owners: 4446
  };

  return (
    <>
      {!isConnected ?
        <IsLoginUI message="Please log in to use the valuation tool" />
        :
        <div className={`mr-16 ml-8 mb-24 mt-10 rounded-2xl ${metaverseSelected === Metaverses.ALL ? 'bg-lm-fill' : ''}`}>
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
              <div className="px-6">
                {metaverseSelected &&
                  <>
                    <EstimatorValuesUI metaverseSelected={metaverseSelected} info={`THE HUB LAND price estimator uses AI to calculate the fair value of LANDs and help you find undervalued ones.  Leverage our heatmap to quickly get an overview of ${metaverseSelected} Map and get insights about current price trends. The valuations are updated at a daily basis.`} floor={globalData.floor} tradingVolume={globalData.tradingVolume} mcap={globalData.mcap} owners={globalData.owners} />
                    <div className="w-full h-[678px] bg-lm-fill rounded-3xl flex justify-center items-center">
                      <h1 className="text-3xl font-bold">heatmap</h1>
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