"use client"

import { useEffect, useState } from "react";
import { ICoinPrices,  } from "../../types/valuationTypes";
import LandCardListUI from "../common/landCardList.ui";
import LandsMenuUI from "../common/landsMenu.ui";
import { ButtonForm } from "../../enums/common.enum";
import SearchLandFormUI from "./searchLandForm.ui";
import { MetaverseOptions, MetaverseOptionsKey } from "../../enums/metaverses.enum";
import { LandListAPIResponse } from "../../lib/valuation/valuationTypes";
import { WatchlistResponse } from "../../interfaces/watchlist.interface";

//TODO replace with redux state (coingecko)
const coinPrices: ICoinPrices = {
  decentraland: 0.0456,
  ethereum: 2897.65,
  'the-sandbox': 12.34,
  'axie-infinity': 67.89,
  'somnium-space-cubes': 0.9876
};

interface WatchlistUIProps {
  allLands: WatchlistResponse | undefined;
  landsOwned?: number;
}

export default function WatchlistUI({allLands, landsOwned}:WatchlistUIProps) {

  const valueWorth = 1.52; //TODO: connect variable from redux watchlist state 
  const [filteredLands, setFilteredLands] = useState<[MetaverseOptionsKey, LandListAPIResponse][]>([]);
  const [metaverseSelected, setMetaverseSelected] = useState(MetaverseOptions.all);

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
    }
  }

  useEffect(() => {
    filterLands("all");
  }, [])

  return (

    <>
      <LandsMenuUI metaverse={metaverseSelected} setMetaverse={(metaverse: MetaverseOptionsKey) => filterLands(metaverse)} form={ButtonForm.Horizontal} isBorder={false} />
      <div className='mb-24 mt-10 rounded-2xl'>
        <div className="flex flex-wrap w-full justify-center ">
          <div className="max-w-[1125px] pb-10">
            <SearchLandFormUI />
          </div>
          <div className="pl-10">
            <div className="flex space-x-4 w-full items-stretch justify-end">
              <div className="flex flex-col w-48 h-52 items-center justify-center rounded-xl bg-nm-gray">
                <p className=" font-extrabold text-3xl">{landsOwned ?? 0}</p>
                <p className="text-sm font-bold">Total LANDs owned</p>
              </div>
              <div className="flex flex-col w-48 h-52 items-center justify-center rounded-xl bg-nm-gray">
                <p className=" font-extrabold text-3xl">{valueWorth} ETH</p>
                <p className="text-sm font-bold">Total Value worth</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-nm-remark h-[2px] my-10"></div>
        <div className="pb-20 flex flex-wrap w-full justify-between">
          <LandCardListUI lands={filteredLands} prices={coinPrices} />
        </div>
      </div>
    </>

  )
}