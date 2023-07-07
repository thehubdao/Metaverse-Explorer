import type { NextPage } from 'next'
import Head from 'next/head'
import { Chains } from '../lib/chains'
import { Contracts } from '../lib/contracts'
import { useNetwork } from 'wagmi'

const Swap: NextPage = () => {
    const { chain } = useNetwork()

    const link = (chain?.id === Chains.MATIC_MAINNET.chainId) ? `https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=${Contracts.MGH_TOKEN.MATIC_MAINNET.address}&theme=light` : `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${Contracts.MGH_TOKEN.ETHEREUM_MAINNET.address}&theme=light`

    return (
        <>
            <Head>
                <title>THE HUB DAO - Swap</title>
                <meta name="description" content="Governance of metaverse related items, fair valuation and minting of NFT backed tokens and provision of metaverse market data." />
            </Head>

            <div className='w-full h-24 bg-gradient-to-r from-[#FFEFF8] via-[#FFEDF7] to-[#FFEFF8]'></div>

            <div className="w-full h-[600px] flex flex-col items-center justify-center">
                <iframe
                    src={link}
                    height="600px"
                    width="100%"
                    className="rounded-none w-full h-full bg-transparent"
                />
            </div>
        </>
    )
}

export default Swap
