"use client"

import { useState } from "react";
import FooterUI from "../ui/footer.ui";
import IsLoginUI from "../ui/isLogin.ui";
import LandsMenuUI from "../ui/landsMenu.ui";

export default function PortfolioComponent (){
    const isConnected = true
    const [landsOwned, setLandsOwned] = useState<number>(0)
    const [valueWorth, setValueWorth] = useState<number>(0)

    return (
        <>
            {!isConnected ?
            <IsLoginUI message="Please log in to show your portfolio"/>
            :
            <>
                <div className="flex justify-between p-8 space-x-20 mt-10">
                    <div className="flex flex-col space-y-3 max-w-2xl text-nm-dm-icons pl-8">
                        <p className="text-2xl font-semibold">Description</p>
                        <p className="text-sm mt-5">The MGH LAND price estimator uses AI to calculate the fair value of LANDs and help you find undervalued ones.  Leverage our heatmap to quickly get an overview of the Sandbox Map and get insights about current price trends. The valuations are updated at a daily basis.</p>
                    </div>
                    <div className="flex space-x-4 w-full items-stretch justify-end ">
                        <div className="flex flex-col w-52 h-40 items-center justify-center shadow-relief-12 rounded-3xl bg-nm-fill">
                            <p className=" font-extrabold text-3xl">{landsOwned}</p>
                            <p className="text-sm font-bold pt-5">Total LANDs owned</p>
                        </div>
                        <div className="flex flex-col w-52 h-40 items-center justify-center shadow-relief-12 rounded-3xl bg-nm-fill">
                            <p className=" font-extrabold text-3xl">{valueWorth} ETH</p>
                            <p className="text-sm font-bold pt-5">Total Value worth</p>
                        </div>
                    </div>
                </div>

                <div className='mx-16 mb-24'>
                    <LandsMenuUI/>
                </div>
            </>
            }
            <FooterUI/>
        </>
    )
}