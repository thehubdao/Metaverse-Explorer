"use client"

import { useAppSelector } from "../../state/hooks";
import IsLoginUI from "../../ui/common/isLogin.ui";
import HeatmapUI from "../../ui/heatmap/heatmap.ui";

export default function HeatmapComponent() {
  const isConnected = useAppSelector(state => state.login.connected);
  return (
    <>
      {!isConnected ?
        <IsLoginUI message="Please log in to use the valuation tool" />
        :
        <HeatmapUI />
      }
    </>
  )
}