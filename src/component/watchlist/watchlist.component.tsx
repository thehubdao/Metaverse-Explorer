"use client"

import { BiMessageSquareError } from "react-icons/bi";
import { useAppSelector } from "../../state/hooks";
import IsLoginUI from "../../ui/common/isLogin.ui";
import LoaderUI from "../../ui/common/loader.ui";
import WatchlistUI from "../../ui/watchlist/watchlist.ui";

export default function WatchlistComponent() {
  const isConnected = useAppSelector(state => state.login.connected);
  const watchlist = useAppSelector(state => state.watchlist);
  const token = useAppSelector(state => state.login.accessToken?.token);
  const address = useAppSelector(state => state.login.address);
  return (
    <>
      {!isConnected ?
        <IsLoginUI message="Please log in to show your watchlist" />
        :
        <>
          {
            address && token ?
              <>
                {
                  !watchlist.isLoading ?
                    <>
                      {
                        watchlist.error ?
                          <div className="pt-20 flex justify-center items-center gap-x-3">
                            <BiMessageSquareError className="text-3xl text-danger" />
                            <p>Upss, something is wrong, try later.</p>
                          </div>
                          :
                          <WatchlistUI allLands={watchlist.list} />
                      }
                    </>
                    :
                    <LoaderUI size={100} text={"waiting for user signature..."} />

                }
              </>
              :
              <LoaderUI size={100} text={"waiting for user signature..."} />
          }
        </>
      }
    </>
  )
}