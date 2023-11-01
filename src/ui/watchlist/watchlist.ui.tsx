"use client"

import { useEffect, useState } from "react";
import { LandListAPIResponse } from "../../types/valuation.type";
import LandCardListUI from "../common/landCardList.ui";
import LandsMenuUI from "../common/landsMenu.ui";
import { Metaverses } from "../../enums/metaverses.enum";
import { ObjectEntries } from "../../utils/common.util";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setWatchlistMetaverse } from "../../state/watchlistSlice";
import { ButtonForm, LandCardListForm } from "../../enums/ui.enum";

interface WatchlistUIProps {
  allLands: Record<Metaverses, LandListAPIResponse> | undefined;
}

export default function WatchlistUI({allLands}: WatchlistUIProps) {
  const [filteredLands, setFilteredLands] = useState<[Metaverses, LandListAPIResponse][]>([]);
  const metaverseSelected = useAppSelector(state => state.watchlist.metaverseSelected); 
  const dispatch = useAppDispatch();

  //Filter lands by metaverse selected
  const filterLands = (metaverse: Metaverses | undefined) => {
    dispatch(setWatchlistMetaverse(metaverse));
    if (allLands !== undefined) {
      let auxLands;
      if (metaverse != undefined)
        auxLands = ObjectEntries(allLands).filter((specificLands) => specificLands[0] === metaverse);
      else
        auxLands = ObjectEntries(allLands).filter((specificLands) => {
          for (const allowedMetaverse in Metaverses) if (specificLands[0] === Metaverses[allowedMetaverse as keyof typeof Metaverses]) return specificLands[0];
        })
      setFilteredLands(auxLands);
    }
  }

  useEffect(() => {
    filterLands(metaverseSelected);
  }, [allLands])

  return (

    <>
      <LandsMenuUI metaverse={metaverseSelected} setMetaverse={(metaverse: Metaverses | undefined) => filterLands(metaverse)} form={ButtonForm.Horizontal} isBorder={false} />
      <div className='mb-24 mt-10 rounded-2xl'>
        {/* TODO: to add lands with this component we need to get the land data */}
        {/* <div className="flex flex-wrap w-full justify-center gap-x-9 ">
          <div className="max-w-[1125px] pb-10 ">
            <AddLandToWatchListUI />
          </div>
        </div> */}
        <div className="border-b border-nm-remark dark:border-nm-dm-fill h-[2px] my-10"></div>
        <div className="pb-20 flex flex-wrap w-full justify-around 2xl:justify-between gap-6">
          {
            filteredLands.length > 0 &&
            <LandCardListUI lands={filteredLands} landCardForm={LandCardListForm.WatchList} />
          }
        </div>
      </div>
    </>

  )
}