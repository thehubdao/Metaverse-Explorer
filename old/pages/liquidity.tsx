import type { NextPage } from 'next'
import Head from 'next/head'
import { Chains } from '../lib/chains'
import { Contracts } from '../lib/contracts'
import { useAppSelector } from '../state/hooks'


const Liquidity: NextPage = () => {
    const { chainId } = useAppSelector(state => state.account)

    const link = (chainId === Chains.MATIC_MAINNET.chainId) ? `https://quickswap.exchange/#/add/${Contracts.MGH_TOKEN.MATIC_MAINNET.address}/ETH?theme=light` : `https://app.uniswap.org/#/add/${Contracts.MGH_TOKEN.ETHEREUM_MAINNET.address}/ETH?theme=light`


    return (
        <>
            <Head>
                <title>THE HUB DAO - Liquidity</title>
                <meta name="description" content="Governance of metaverse related items, fair valuation and minting of NFT backed tokens and provision of metaverse market data." />
            </Head>

            <div className='w-full h-24 bg-gradient-to-r from-[#FFEFF8] via-[#FFEDF7] to-[#FFEFF8]'></div>

            <div className="w-full -mb-4 h-full flex flex-col items-center justify-center">

                <iframe
                    src={link}
                    height="1000px"
                    width="100%"
                    className="rounded-none w-full"
                />


            </div>

        </>
    )
}

export default Liquidity
