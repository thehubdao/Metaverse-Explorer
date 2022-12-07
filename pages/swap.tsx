import type { NextPage } from 'next'
import Head from 'next/head'
import { Chains } from '../lib/chains'
import { Contracts } from '../lib/contracts'
import { useAppSelector } from '../state/hooks'


const Swap: NextPage = () => {
    const { chainId } = useAppSelector(state => state.account)

    const link = (chainId === Chains.MATIC_MAINNET.chainId) ? `https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=${Contracts.MGH_TOKEN.MATIC_MAINNET.address}&theme=light` : `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${Contracts.MGH_TOKEN.ETHEREUM_MAINNET.address}&theme=light`



    return (
        <>
            <Head>
                <title>MGH - Swap</title>
                <meta name="description" content="Governance of metaverse related items, fair valuation and minting of NFT backed tokens and provision of metaverse market data." />
            </Head>

            <div className="w-full -mb-4 xs:-mb-6 sm:-mb-10 xl:-mb-0 h-full flex flex-col items-center justify-center animate__animated animate__fadeIn animate__slow">

                <iframe
                    src={link}
                    height="600px"
                    width="100%"
                    className="rounded-none xl:rounded-xl shadow-dark opacity-80 w-screen h-screen xl:w-full xl:h-full bg-transparent"
                />

            </div>

        </>
    )
}

export default Swap
