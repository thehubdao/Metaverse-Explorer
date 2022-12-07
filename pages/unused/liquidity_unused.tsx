import type { NextPage } from 'next'
import Head from 'next/head'

import TokenInput from '../../components/TokenInput';
import { useAppSelector } from '../../state/hooks';
import { Tokens } from '../../lib/enums';


const Stake: NextPage = () => {
    const network = useAppSelector(state => state.network.value)

    return (
        <>
            <Head>
                <title>MGH - Liquidity</title>
                <meta name="description" content="Governance of metaverse related items, fair valuation and minting of NFT backed tokens and provision of metaverse market data." />
            </Head>

            <div className="h-full w-full flex flex-row items-center justify-evenly">
                <div className="flex flex-col items-center border-t border-l border-opacity-20 shadow-dark rounded-xl p-5 w-full bg-grey-dark bg-opacity-30 max-w-4xl">
                    <h3 className="pb-5 text-gray-300">MGH/ETH Pool</h3>

                    <TokenInput name={Tokens.MGH} logo="/images/mgh_logo.png" />
                    <div className="py-2 block sm:hidden"/>
                    <TokenInput name={Tokens.ETH} logo="/images/ethereum-eth-logo.png" />

                    <button className="relative flex justify-center items-center border border-opacity-0 hover:border-opacity-20 hover:shadow-button transition ease-in-out duration-500 shadow-dark rounded-xl w-full max-w-xs py-4 text-gray-200 font-medium text-lg mt-5 sm:mt-10 overflow-hidden">
                        <div className="h-full w-full absolute bg-gradient-to-br transition-all ease-in-out duration-300 from-pink-600 to-blue-500 rounded-xl blur-2xl group-hover:blur-xl" />
                        <span className="pt-1 z-10">Provide Liquidity</span>
                    </button>

                </div>

            </div>


        </>
    )
}


export default Stake
