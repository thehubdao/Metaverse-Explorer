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
  
  useEffect(() => {
    async function fetchMetaverseGlobalData() {
      const result = await GetMetaverseGlobalData(metaverseSelected);
      if (result.success) {
        setglobalData(result.value);
      }
    }
    async function fetchTopLands() {
      const result = await GetTopLands(metaverseSelected);
      if (result.success){
        setPicks(result.value);
      }
    }
    async function fetchChartDataLands() {
      const result = await GetTopSellingLands(metaverseSelected);
      if (result.success){
        setTopSellings(result.value)
      }
      
    }
    fetchMetaverseGlobalData().catch(err => console.error(err));
    fetchTopLands().catch(err => console.error(err));
    fetchChartDataLands().catch(err => console.error(err));
  }, [metaverseSelected]);
  return (
    <>
      {!isConnected ?
        <IsLoginUI message="Please log in to use the valuation tool" />
        :
        <HeatmapUI globalData={globalData} topPicksLands={picks} topSellingsLands={topSellings}/>
      }
    </>
  )
}