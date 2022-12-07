import type { NextPage } from 'next'
import Link from 'next/link';
import Head from 'next/head'


const Stake: NextPage = () => {


    return (
        <>
            <Head>
                <title>MGH - Staking</title>
                <meta name="description" content="Governance of metaverse related items, fair valuation and minting of NFT backed tokens and provision of metaverse market data." />
            </Head>

            <div className="flex w-full bg-grey-lightest rounded-xl h-full place-content-center py-[10%] space-x-9">
                <Link href="/stake-ethereum">
                    <a className="stake flex flex-col w-1/4 items-center px-3 py-6 xs:p-5 text-center justify-center rounded-xl">
                        <img src="/images/ethereum-eth-logo.png" className="mb-8 h-60" />
                        <p className="text-grey-content font-plus font-bold text-xl sm:text-3xl">Ethereum Staking</p>
                        <p className="text-grey-content font-plus font-light text-sm leading-5 sm:text-xl pt-3">bonded staking, fixed APY, 4 different Pools</p>
                    </a>
                </Link>

                <Link href="/stake-polygon">
                    <a className="stake flex flex-col w-1/4 items-center px-3 py-6 xs:p-5 text-center justify-center rounded-xl">
                        <img src="/images/polygon-matic-logo.png" className="mb-8 h-60" />
                        <p className="text-grey-content font-plus font-bold text-xl sm:text-3xl">Polygon Staking</p>
                        <p className="text-grey-content font-plus font-light text-sm leading-5 sm:text-xl pt-3">unbonded staking, variable APY</p>
                    </a>
                </Link>
            </div>

        </>
    )
}

export default Stake
