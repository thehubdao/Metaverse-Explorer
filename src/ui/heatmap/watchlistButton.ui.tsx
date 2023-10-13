import { MapCardData } from "../../interfaces/heatmap.interface";

interface WatchlistButtonUIProps{
  landData: MapCardData;
}

export default function WatchlistButtonUI({landData}:WatchlistButtonUIProps) {
  return (
    <button className={`w-full rounded-2xl py-3 transition duration-300 ease-in-out text-sm font-bold shadow-relief-16 dark:shadow-dm-relief-16 hover:shadow-relief-12 dark:hover:shadow-dm-relief-12`}>
      ADD TO WATCHLIST
    </button>
  )
}