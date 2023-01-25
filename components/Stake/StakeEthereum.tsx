import { useAccount } from 'wagmi'

import ConnectButton from "../ConnectButton"

const Card = ({ option }: { option: { title: string, apy: number, period: number } }) => {
  const { title, apy, period } = option

  return (
    <div className='w-1/4 p-4 nm-flat-hard rounded-xl'>
      <h2 className='text-blue-500 text-4xl pb-10'>{title}</h2>
      <div className='flex justify-between'>
        <p className='font-bold'>APY</p>
        <p>{apy}%</p>
      </div>
      <div className='flex justify-between'>
        <p className='font-bold'>Locking Period</p>
        <p>{period}</p>
      </div>
    </div>
  )
}

const stakeOptions = [
  {
    title: 'Hodler',
    apy: 45,
    period: 3
  },
  {
    title: 'Degen',
    apy: 75,
    period: 6
  },
  {
    title: 'Ape',
    apy: 100,
    period: 12
  },
  {
    title: 'Hong Long',
    apy: 175,
    period: 24
  },

]

const StakeEthereum = () => {
  const { address } = useAccount()

  return (
    <div className='flex flex-col'>
      <div className='pt-24' />
      {address ? (
        <div className='flex mx-10 gap-10'>
          {stakeOptions.map(option => <Card option={option} key={option.title} />)}
        </div>
      ) : <ConnectButton />}

      {/* Footer */}
      <p className="text-grey-icon text-center text-xs py-20 px-48">
        In bonded staking, your tokens are locked for the duration of an epoch. The first 7 days of each era are the deposit / withdrawal window. During these 7 days you can deposit and withdraw tokens from the previous epoch and the newly started one. No rewards are accumulated during this time. After 7 days, all tokens committed to the pools are locked for the rest of the epoch and rewards are accumulated, which can either be withdrawn in the first 7 days of the following epoch or automatically roll over to the following epochs. Staking Agreement
      </p>
    </div>
  )
}

export default StakeEthereum