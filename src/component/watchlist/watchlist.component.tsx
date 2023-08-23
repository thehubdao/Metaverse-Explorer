"use client"

import { useAppSelector } from "../../state/hooks";
import IsLoginUI from "../../ui/common/isLogin.ui";
import WatchlistUI from "../../ui/watchlist/watchlist.ui";

export default function WatchlistComponent() {
  const isConnected = useAppSelector(state => state.login.connected);
  return (
    <>
      {!isConnected ?
        <IsLoginUI message="Please log in to show your watchlist" />
        :
        <WatchlistUI />
      }
    </>
  )
}