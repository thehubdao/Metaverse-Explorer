"use client"

import { useEffect, useState } from "react";
import { ICoinPrices } from "../../types/valuationTypes";
import LandCardListUI from "../common/landCardList.ui";
import NolandsUI from "../common/noLands.ui";
import LandsMenuUI from "../common/landsMenu.ui";
import { ButtonForm } from "../../enums/common.enum";
import { LandListAPIResponse } from "../../lib/valuation/valuationTypes";
import { Metaverse } from "../../lib/metaverse";
import { typedKeys } from "../../utils/common.util";
import { MetaverseOptions, MetaverseOptionsKey } from "../../enums/metaverses.enum";

//TODO replace with redux state (coingecko)
const coinPrices: ICoinPrices = {
  decentraland: 0.0456,
  ethereum: 2897.65,
  'the-sandbox': 12.34,
  'axie-infinity': 67.89,
  'somnium-space-cubes': 0.9876
};

interface PortfolioUIProps {
  allLands: Record<Metaverse, LandListAPIResponse> | undefined;
  landsOwned: number;
}

export default function PortfolioUI({allLands , landsOwned }: PortfolioUIProps) {

  const valueWorth = 1.52; //TODO: connect variable from redux portfolio state 
  const [metaverseSelected, setMetaverseSelected] = useState(MetaverseOptions.all);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [filteredLands, setFilteredLands] = useState<[MetaverseOptionsKey, LandListAPIResponse][]>([]);

  //Filter lands by metaverse selected
  const filterLands = (metaverse: MetaverseOptionsKey) => {
    setMetaverseSelected(MetaverseOptions[metaverse]);
    if (allLands !== undefined) {
      let auxLands;
      if (metaverse !== "all") {
        auxLands = Object.entries(allLands).filter((specificLands) => specificLands[0] === metaverse) as [MetaverseOptionsKey, LandListAPIResponse][];
        setFilteredLands(auxLands);
      }
      else {
        auxLands = Object.entries(allLands) as [MetaverseOptionsKey, LandListAPIResponse][];
        setFilteredLands(auxLands);
      }
      validateEmpty(auxLands);
    }
  }

  //Valide if metaverse lands is empty
  const validateEmpty = (metaverses: [MetaverseOptionsKey, LandListAPIResponse][]) => {
    let landsLength = 0;
    for (const [, specificLands] of Object.entries(metaverses)) {
      landsLength += typedKeys(specificLands[1]).length;
    }
    setIsEmpty(landsLength == 0);
  }

  useEffect(() => {
    filterLands("all");
  }, [])

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
            <p className="text-sm font-bold">Total LANDs owned</p>
          </div>
          <div className="flex flex-col w-48 h-52 items-center justify-center rounded-xl bg-nm-fill">
            <p className=" font-extrabold text-3xl">{valueWorth} ETH</p>
            <p className="text-sm font-bold">Total Value worth</p>
          </div>
        </div>
      </div>

      <div className='mb-24'>
        <LandsMenuUI metaverse={metaverseSelected} setMetaverse={(metaverse: MetaverseOptionsKey) => filterLands(metaverse)} form={ButtonForm.Horizontal} isBorder={true} />
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
