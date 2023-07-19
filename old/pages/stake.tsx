import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

import OptionCard from '../components/Stake/OptionCard'
import StakeEthereum from '../components/Stake/StakeEthereum'
import StakePolygon from '../components/Stake/StakePolygon'

const stakeOptions = [
	{
		title: 'Ethereum Staking',
		description: 'bonded staking, fixed APY, 4 different Pools',
		imageUrl: '/images/ethereum-eth-logo.png',
		option: 'Ethereum'
	},
	{
		title: 'Polygon Staking',
		description: 'unbonded staking, variable APY',
		imageUrl: '/images/polygon-matic-logo.png',
		option: 'Polygon'
	}
]

const Stake: NextPage = () => {
	const [stakeSelected, setStakeSelected] = useState<'Ethereum' | 'Polygon' | undefined>()

	return (
		<>
			<Head>
				<title>MGH - Staking</title>
				<meta name="description" content="Governance of metaverse related items, fair valuation and minting of NFT backed tokens and provision of metaverse market data." />
			</Head>

			{!stakeSelected && <div className="flex w-full bg-grey-lightest h-screen py-[10%] justify-center items-center">
				<div className='flex w-full h-fit justify-center gap-10'>
					{stakeOptions.map((item) => <OptionCard
						item={item}
						key={item.option}
						setStakeSelected={setStakeSelected}
					/>)}
				</div>
			</div>}

			{stakeSelected === 'Ethereum' && <StakeEthereum />}
			{stakeSelected === 'Polygon' && <StakePolygon />}
		</>
	)
}

export default Stake
