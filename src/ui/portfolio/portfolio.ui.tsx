"use client"

import { useEffect, useState } from "react";
import { LandListAPIResponse } from "../../types/valuationTypes";
import LandCardListUI from "../common/landCardList.ui";
import NolandsUI from "../common/noLands.ui";
import LandsMenuUI from "../common/landsMenu.ui";
import { ButtonForm } from "../../enums/common.enum";
import { TypedKeys, ObjectEntries } from "../../utils/common.util";
import { Metaverses } from "../../enums/metaverses.enum";
import { useAppSelector } from "../../state/hooks";

interface PortfolioUIProps {
  allLands: Record<Metaverses, LandListAPIResponse> | undefined;
  landsOwned: number;
}

export default function PortfolioUI({allLands , landsOwned }: PortfolioUIProps) {
  const [metaverseSelected, setMetaverseSelected] = useState<Metaverses | undefined>(undefined);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [filteredLands, setFilteredLands] = useState<[Metaverses, LandListAPIResponse][]>([]);

  const coinPrices = useAppSelector(state => state.coinGecko.coins);
  const valueWorth = 1.52; //TODO: connect variable from redux portfolio state 

  //Filter lands by metaverse selected
  const filterLands = (metaverse: Metaverses | undefined) => {
    setMetaverseSelected(metaverse);
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
    filterLands(undefined);
  }, [])

  return (
    <>
      <div className="flex justify-between mt-10">
        <div className="flex flex-col space-y-3 max-w-2xl text-lm-text dark:text-nm-fill">
          <p className="text-2xl font-semibold">Description</p>
          <p className="text-sm mt-5">The HUB LAND price estimator uses AI to calculate the fair value of LANDs and help you find undervalued ones.  Leverage our heatmap to quickly get an overview of the Sandbox Map and get insights about current price trends. The valuations are updated at a daily basis.</p>
        </div>
        <div className="flex space-x-4 w-full items-stretch justify-end">
          <div className="flex flex-col w-48 h-52 items-center justify-center rounded-xl bg-nm-fill dark:bg-nm-black dark:shadow-dm-relief-12">
            <p className=" font-extrabold text-3xl">{landsOwned}</p>
            <p className="text-sm font-bold dark:text-lm-text-gray mt-6">Total LANDs owned</p>
          </div>
          <div className="flex flex-col w-48 h-52 items-center justify-center rounded-xl bg-nm-fill dark:bg-nm-black dark:shadow-dm-relief-12">
            <p className=" font-extrabold text-3xl">{valueWorth} ETH</p>
            <p className="text-sm font-bold dark:text-lm-text-gray mt-6">Total Value worth</p>
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
              <div className=" mb-24 flex flex-wrap w-full justify-between">
                <LandCardListUI lands={filteredLands} prices={coinPrices} />
              </div>
            </div>
        }
      </>
    </>
  )
}
