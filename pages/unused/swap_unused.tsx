import { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { IoSwapVertical } from "react-icons/io5"

import TokenInput from '../../components/TokenInput';
import { useAppSelector } from '../../state/hooks';
import { Network, Tokens } from '../../lib/enums';


const Swap: NextPage = () => {
    const [ethToMGH, setEthtoMGH] = useState(true);
    const network = useAppSelector(state => state.network.value)

    return (
        <>
            <Head>
                <title>MGH - Swap</title>
                <meta name="description" content="Governance of metaverse related items, fair valuation and minting of NFT backed tokens and provision of metaverse market data." />
            </Head>

            <div className=" w-full flex flex-col lg:flex-row space-y-10 lg:space-y-0 space-x-0 lg:space-x-5 xl:space-x-10 items-stretch justify-center">
                <div className="flex flex-col items-center border-t border-l border-opacity-20 shadow-dark rounded-xl p-5 w-full bg-grey-dark bg-opacity-30 max-w-full lg:max-w-4xl">
                    <h3 className="pb-5 text-gray-300">Swap</h3>

                    {ethToMGH ? (
                        <>
                            <TokenInput name={network === Network.ETHEREUM ? Tokens.ETH : Tokens.MMGH} logo={network === Network.ETHEREUM ? "/images/ethereum-eth-logo.png" : "/images/mgh_logo.png"} direction="From" />
                            <div className="my-5 flex w-full max-w-sm sm:max-w-lg items-center justify-between">
                                <hr className="w-1/12 border-gray-500" />
                                <IoSwapVertical onClick={() => setEthtoMGH(!ethToMGH)} className=" text-5xl sm:text-6xl text-gray-300 hover:text-pink-600 cursor-pointer transform hover:rotate-180 transition ease-in-out duration-300 bg-grey-dark bg-opacity-70 rounded-full p-2" />
                                <hr className="w-8/12 xs:w-9/12 border-gray-500" />
                            </div>
                            <TokenInput name={network === Network.ETHEREUM ? Tokens.MGH : Tokens.MGH_DATA} logo="/images/mgh_logo.png" direction="To" />
                        </>
                    ) : (
                        <>
                            <TokenInput name={network === Network.ETHEREUM ? Tokens.MGH : Tokens.MGH_DATA} logo="/images/mgh_logo.png" direction="From" />
                            <div className="my-5 flex w-full max-w-sm sm:max-w-lg items-center justify-between">
                                <hr className="w-1/12 border-gray-500" />
                                <IoSwapVertical onClick={() => setEthtoMGH(!ethToMGH)} className=" text-5xl sm:text-6xl text-gray-300 hover:text-pink-600 cursor-pointer transform hover:rotate-180 transition ease-in-out duration-300 bg-grey-dark bg-opacity-70 rounded-full p-2" />
                                <hr className="w-8/12 xs:w-9/12 border-gray-500" />
                            </div>
                            <TokenInput name={network === Network.ETHEREUM ? Tokens.ETH : Tokens.MMGH} logo={network === Network.ETHEREUM ? "/images/ethereum-eth-logo.png" : "/images/mgh_logo.png"} direction="To" />
                        </>
                    )}

                    <button className="relative flex justify-center items-center border border-opacity-0 hover:border-opacity-20 hover:shadow-button transition ease-in-out duration-500 shadow-dark rounded-xl w-full max-w-sm py-4 text-gray-200 font-medium text-lg mt-5 sm:mt-10 overflow-hidden">
                        <div className="h-full w-full absolute bg-gradient-to-br transition-all ease-in-out duration-300 from-pink-600 to-blue-500 rounded-xl blur-2xl group-hover:blur-xl" />
                        <span className="pt-1 z-10">Execute Swap</span>
                    </button>

                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col w-full lg:w-max space-x-0 sm:space-x-5 lg:space-x-0 space-y-5 sm:space-y-0 lg:space-y-5 xl:space-y-10 justify-between lg:justify-center">
                    <div className="flex flex-col items-center text-center text-gray-200 p-3 border-t border-l border-opacity-0 rounded-xl w-full lg:w-72 bg-grey-dark bg-opacity-30 max-w-4xl">
                        <h3 className="mb-0 lg:mb-5">Acquire Data Tokens</h3>
                        <p className="max-w-md">Switch to the Polygon network, swap $mMGH against our Data Token and access key metaverse related data through the Ocean marketplace.</p>
                    </div>
                    <div className="flex flex-col text-center items-center text-gray-200 p-3 border-t border-l border-opacity-0 rounded-xl w-full lg:w-72 bg-grey-dark bg-opacity-30 max-w-4xl">
                        <h3 className="mb-0 lg:mb-5">Get $mMGH</h3>
                        <p className="max-w-md">Simply change your $MGH Tokens to $mMGH Tokens using the Polygon Bridge.</p>
                        <a href="https://wallet.polygon.technology/bridge" target="_blank" className="mt-3 text-gray-400 font-medium max-w-max text-lg hover:text-blue-400 transition ease-in-out duration-300">Learn more</a>
                    </div>
                </div>

            </div>

        </>
    )
}


export default Swap
