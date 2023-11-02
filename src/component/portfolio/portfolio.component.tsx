"use client"

import { BiMessageSquareError } from "react-icons/bi";
import { useAppSelector } from "../../state/hooks";
import IsLoginUI from "../../ui/common/isLogin.ui";
import LoaderUI from "../../ui/common/loader.ui";
import PortfolioUI from "../../ui/portfolio/portfolio.ui";

export default function PortfolioComponent() {
  const isConnected = useAppSelector(state => state.login.connected);
  const portfolio = useAppSelector(state => state.portfolio);
  const token = useAppSelector(state => state.login.accessToken?.token);
  const address = useAppSelector(state => state.login.address);

  return (
    <>
      {!isConnected ?
        <IsLoginUI message="Please log in to show your portfolio" />
        :
        <>
          {
            address && token ?
              <>
                {
                  !portfolio.isLoading ? 
                  <>
                  {
                    portfolio.error ?
                    <div className="pt-20 flex justify-center items-center gap-x-3">
                      <BiMessageSquareError  className="text-3xl text-danger"/>
                      <p>Upss, something is wrong, try later.</p>
                    </div>
                    :
                    <PortfolioUI allLands={portfolio.list} landsOwned={portfolio.length ?? 0} totalWorth={portfolio.totalWorth} />
                  }
                  </>
                    :
                    <LoaderUI size={100} text={"Loading lands..."}/>
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