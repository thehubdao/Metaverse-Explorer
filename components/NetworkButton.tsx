import { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri"

import changeChain from "../backend/changeChain";
import { Chains } from "../lib/chains";



const NetworkButton = ({ provider, chainId }: any) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="relative">
                <div onClick={() => setOpen(!open)} className={`${open ? "text-gray-200" : "text-gray-600 hover:text-gray-200"} relative w-12 xs:w-14 h-full flex items-center justify-center cursor-pointer transition ease-in-out duration-300 font-medium text-xl rounded-xl p-1.5 sm:p-2 md:p-3 bg-grey-dark bg-opacity-30 group shadow-dark`}>
                    {chainId !== Chains.ETHEREUM_MAINNET.chainId && chainId !== Chains.MATIC_MAINNET.chainId ? (
                        <RiErrorWarningLine className="text-red-500 text-3xl" />
                    ) : (
                        <img src={`${chainId === Chains.ETHEREUM_MAINNET.chainId ? "/images/ethereum-eth-logo.png" : "/images/polygon-matic-logo.png"}`} className="h-8 w-8 z-10" />
                    )}
                </div>
                {open &&
                    <div className="absolute -bottom-28 top-auto h-28 left-0 sm:left-auto right-auto sm:right-0 w-44 rounded-xl p-5 space-y-5 font-medium bg-white bg-opacity-100 xl:bg-opacity-20 backdrop-filter backdrop-blur-3xl z-50 flex flex-col justify-center items-start shadow-dark">
                        <div onClick={() => { changeChain(provider, Chains.ETHEREUM_MAINNET.chainId); setOpen(false) }} className={`flex items-center cursor-pointer ${chainId === Chains.ETHEREUM_MAINNET.chainId ? "opacity-100" : "opacity-70 hover:opacity-100"}`}>
                            <img src="/images/ethereum-eth-logo.png" className="h-8 w-8 z-10" />
                            <span className="pt-1 z-10 text-grey-content font-plus font-normal px-4 ">Ethereum</span>
                        </div>

                        <div onClick={() => { changeChain(provider, Chains.MATIC_MAINNET.chainId); setOpen(false) }} className={`flex items-center cursor-pointer ${chainId === Chains.MATIC_MAINNET.chainId ? "opacity-100" : "opacity-70 hover:opacity-100"}`}>
                            <img src="/images/polygon-matic-logo.png" className="h-8 w-8 z-10" />
                            <span className="pt-1 z-10 text-grey-content font-plus font-normalpx-4 ">Polygon</span>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}


export default NetworkButton
