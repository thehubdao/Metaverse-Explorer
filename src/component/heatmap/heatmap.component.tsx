"use client"

import { useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import IsLoginUI from "../../ui/common/isLogin.ui";
import HeatmapUI from "../../ui/heatmap/heatmap.ui";
import { GetMetaverseGlobalData } from "../../utils/itrm/land-valuation.util";
import { GetTopLands, GetTopSellingLands } from "../../utils/itrm/val-analytics.util";
import { MetaverseGlobalData } from "../../interfaces/itrm/land-valuation.interface";
import { TopPickLand, TopSellingLand } from "../../interfaces/itrm/val-analytics.interface";

export default function HeatmapComponent() {
  const isConnected = useAppSelector(state => state.login.connected);
  const [picks, setPicks] = useState<TopPickLand[]>([]);
  const [topSellings, setTopSellings] = useState<TopSellingLand | null>(null);
  const metaverseSelected = useAppSelector(state => state.heatmap.metaverseSelected);
  const [globalData, setglobalData] = useState<MetaverseGlobalData | null>(null);
  
  //TODO: add modal to show error
  const fetch = async () => {
    const globalData = await GetMetaverseGlobalData(metaverseSelected);
    if (globalData.success) {
      setglobalData(globalData.value);
    }
    const topLands = await GetTopLands(metaverseSelected);
    if (topLands.success) {
      setPicks(topLands.value);
    }
    const topSellings = await GetTopSellingLands(metaverseSelected);
    if (topSellings.success) {
      setTopSellings(topSellings.value)
    }
  }

  useEffect(() => {
    if (metaverseSelected != undefined){
      void fetch();
    }
  }, [metaverseSelected]);

  return (
    <>
      {!isConnected ?
        <IsLoginUI message="Please log in to use the valuation tool" />
        :
        <HeatmapUI globalData={globalData} topPicksLands={picks} topSellingsLands={topSellings} />
      }
    </>
  );
}
