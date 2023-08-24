"use client"

import { useAppSelector } from "../../state/hooks";
import IsLoginUI from "../../ui/common/isLogin.ui";
import WatchlistUI from "../../ui/watchlist/watchlist.ui";

export default function WatchlistComponent() {
  const isConnected = useAppSelector(state => state.login.connected);
  //TODO replace portfolio state with watchlist state
  const portfolio = useAppSelector(state=> state.portfolio);
  return (
    <>
      {!isConnected ?
        <IsLoginUI message="Please log in to show your watchlist" />
        :
        <>
        {
          portfolio.list !== undefined ? <WatchlistUI allLands={portfolio.list} landsOwned={portfolio.length ?? 0}/> 
          :
          <p>Loading...</p>
        }
        </>
      }
    </>
  )
}