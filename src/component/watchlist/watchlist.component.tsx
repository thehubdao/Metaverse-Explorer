"use client"

import { useAppSelector } from "../../state/hooks";
import IsLoginUI from "../../ui/common/isLogin.ui";
import LoaderUI from "../../ui/common/loader.ui";
import WatchlistUI from "../../ui/watchlist/watchlist.ui";

export default function WatchlistComponent() {
  const isConnected = useAppSelector(state => state.login.connected);
  const watchlist = useAppSelector(state => state.watchlist);
  return (
    <>
      {!isConnected ?
        <IsLoginUI message="Please log in to show your watchlist" />
        :
        <>
          {
            watchlist.list !== undefined ? <WatchlistUI allLands={watchlist.list} />
              :
              <LoaderUI size={100} text={"Loading lands..."}/>
          }
        </>
      }
    </>
  )
}