"use client"

import { useEffect, useState } from "react";
import { LandListAPIResponse } from "../../types/valuation.type";
import LandCardListUI from "../common/landCardList.ui";
import NolandsUI from "../common/noLands.ui";
import LandsMenuUI from "../common/landsMenu.ui";
import { TypedKeys, ObjectEntries } from "../../utils/common.util";
import { Metaverses } from "../../enums/metaverses.enum";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setPortfolioMetaverse } from "../../state/portfolioSlice";
import { ButtonForm, LandCardListForm } from "../../enums/ui.enum";
import { TotalWorthData } from "../../interfaces/land.interface";

interface PortfolioUIProps {
  allLands: Record<Metaverses, LandListAPIResponse> | undefined;
  landsOwned: number;
  totalWorth: TotalWorthData;
}

export default function PortfolioUI({allLands , landsOwned, totalWorth }: PortfolioUIProps) {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [filteredLands, setFilteredLands] = useState<[Metaverses, LandListAPIResponse][]>([]);
  const metaverseSelected = useAppSelector(state => state.portfolio.metaverseSelected); 
  const dispatch = useAppDispatch();
  
  //Filter lands by metaverse selected
  const filterLands = (metaverse: Metaverses | undefined) => {
    dispatch(setPortfolioMetaverse(metaverse));
    if (allLands !== undefined) {
      let auxLands;
      if (metaverse != undefined)
        auxLands = ObjectEntries(allLands).filter((specificLands) => specificLands[0] === metaverse);
      else
        auxLands = ObjectEntries(allLands);
      setFilteredLands(auxLands);      
      validateEmpty(auxLands);
    }
  }

  //Valide if metaverse lands is empty
  const validateEmpty = (metaverses: [Metaverses, LandListAPIResponse][]) => {
    let landsLength = 0;
    for (const [, specificLands] of metaverses) {
      landsLength += TypedKeys(specificLands).length;
    }
    setIsEmpty(landsLength == 0);
  }

  useEffect(() => {
    filterLands(metaverseSelected);
  }, [])

  return (
    <>
      <div className="w-full flex flex-wrap justify-between mt-10">
        <div className="flex flex-col space-y-3 w-full xl:max-w-[60%] text-lm-text dark:text-nm-fill mb-3">
          <p className="text-2xl font-semibold">Description</p>
          <p className="text-sm mt-5">The HUB LAND price estimator uses AI to calculate the fair value of LANDs and help you find undervalued ones.  Leverage our heatmap to quickly get an overview of the Sandbox Map and get insights about current price trends. The valuations are updated at a daily basis.</p>
        </div>
        <div className="flex gap-4 w-full xl:max-w-[40%] items-stretch justify-center xl:justify-end">
          <div className="flex flex-col w-48 h-24 lg:h-52 items-center justify-center rounded-xl bg-nm-fill dark:bg-nm-black dark:shadow-dm-relief-12">
            <p className=" font-extrabold text-xl lg:text-3xl">{landsOwned}</p>
            <p className="text-sm font-bold dark:text-lm-text-gray mt-2 lg:mt-6">Total LANDs owned</p>
          </div>
          <div className="flex flex-col w-48 h-24 lg:h-52 items-center justify-center rounded-xl bg-nm-fill dark:bg-nm-black dark:shadow-dm-relief-12">
            <p className=" font-extrabold text-xl lg:text-3xl">{totalWorth.ethPrediction.toFixed(3)} ETH</p>
            <p className="text-sm font-bold dark:text-lm-text-gray mt-2 lg:mt-6">Total Value worth</p>
          </div>
        </div>
      </div>

      <div className='mb-24'>
        <LandsMenuUI metaverse={metaverseSelected} setMetaverse={(metaverse: Metaverses | undefined) => filterLands(metaverse)} form={ButtonForm.Horizontal} isBorder={true} />
      </div>
      <>
        {
          isEmpty ?
            <NolandsUI />
            :
            <div>
              <div className=" mb-24 flex flex-wrap w-full justify-around 2xl:justify-between">
                <LandCardListUI lands={filteredLands} landCardForm={LandCardListForm.Portfolio}/>
              </div>
            </div>
        }
      </>
    </>
  )
}
