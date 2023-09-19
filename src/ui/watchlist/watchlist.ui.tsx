"use client"

import { useEffect, useState } from "react";
import { LandListAPIResponse } from "../../types/valuationTypes";
import LandCardListUI from "../common/landCardList.ui";
import LandsMenuUI from "../common/landsMenu.ui";
import { ButtonForm } from "../../enums/common.enum";
import SearchLandFormUI from "./searchLandForm.ui";
import { Metaverses } from "../../enums/metaverses.enum";
import { ObjectEntries } from "../../utils/common.util";
import { useAppSelector } from "../../state/hooks";

interface WatchlistUIProps {
  allLands: Record<Metaverses, LandListAPIResponse> | undefined;
  landsOwned?: number;
}

export default function WatchlistUI({allLands, landsOwned}: WatchlistUIProps) {
  const [filteredLands, setFilteredLands] = useState<[Metaverses, LandListAPIResponse][]>([]);
  const [metaverseSelected, setMetaverseSelected] = useState<Metaverses | undefined>(undefined);

  const coinPrices = useAppSelector(state => state.coinGecko.coins);
  const valueWorth = 1.52; //TODO: connect variable from redux watchlist state 

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
    }
  }

  useEffect(() => {
    filterLands(undefined);
  }, [])

  return (

    <>
      <LandsMenuUI metaverse={metaverseSelected} setMetaverse={(metaverse: Metaverses | undefined) => filterLands(metaverse)} form={ButtonForm.Horizontal} isBorder={false} />
      <div className='mb-24 mt-10 rounded-2xl'>
        <div className="flex flex-wrap w-full justify-center ">
          <div className="max-w-[1125px] pb-10">
            <SearchLandFormUI />
          </div>
          <div className="pl-10">
            <div className="flex space-x-4 w-full items-stretch justify-end">
              <div className="flex flex-col w-48 h-52 items-center justify-center rounded-xl bg-nm-gray dark:bg-nm-black dark:shadow-dm-relief-12">
                <p className=" font-extrabold text-3xl">{landsOwned ?? 0}</p>
                <p className="text-sm font-bold dark:text-lm-text-gray mt-6">Total LANDs owned</p>
              </div>
              <div className="flex flex-col w-48 h-52 items-center justify-center rounded-xl bg-nm-gray dark:bg-nm-black dark:shadow-dm-relief-12">
                <p className=" font-extrabold text-3xl">{valueWorth} ETH</p>
                <p className="text-sm font-bold dark:text-lm-text-gray mt-6">Total Value worth</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-nm-remark dark:border-nm-dm-fill h-[2px] my-10"></div>
        <div className="pb-20 flex flex-wrap w-full justify-between">
          <LandCardListUI lands={filteredLands} prices={coinPrices} />
        </div>
      </div>
    </>

  )
}