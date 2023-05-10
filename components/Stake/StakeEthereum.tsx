import { useAccount, useNetwork, useSigner, useSwitchNetwork } from 'wagmi'
import ConnectButton from "../ConnectButton"
import Footer from '../General/Footer'
import { useEffect, useState } from 'react'
import { getStakeAmount, unstakeMGH } from '../../backend/ethereumStaking'

const pools = [0, 1, 2, 3]

const Card = ({ option, balance }: { option: any, balance: any }) => {
  const { title, apy, period } = option
  const { data: signer } = useSigner()
  const { address } = useAccount()

  return (
    <div className='w-1/4 p-4 nm-flat-hard rounded-xl'>
      <h2 className='text-blue-500 text-4xl pb-10'>{title}</h2>
      <div className='flex justify-between'>
        <p className='font-bold'>APY</p>
        <p>{apy}%</p>
      </div>
      <div className='flex justify-between'>
        <p className='font-bold'>Locking Period</p>
        <p>{period} Month</p>
      </div>

      {<div className=' p-4 nm-flat-hard rounded-xl'>Balance: {balance}
        <br />
        {balance > 0 && <button onClick={async () => {
          for (const pool of pools) {
            await unstakeMGH(signer as any, address, balance.toString(), pool, false)
          }
        }}
        className={`relative ${address ? 'w-[300px]' : 'w-fit mr-12'} h-full mr-4 mt-6 rounded-2xl duration-300 cursor-pointer bg-white flex flex-col items-center px-4 py-3 gap-2 select-none font-normal shadow-xl`}
        >Withdraw</button>}
      </div>}
    </div>
  )
}

const stakeOptions = [
  {
    title: 'Hodler',
    apy: 45,
    period: 3,
    poolId: 0
  },
  {
    title: 'Degen',
    apy: 75,
    period: 6,
    poolId: 1
  },
  {
    title: 'Ape',
    apy: 100,
    period: 12,
    poolId: 2
  },
  {
    title: 'Hong Long',
    apy: 175,
    period: 24,
    poolId: 3
  },

]

const StakeEthereum = () => {
  const { switchNetwork } = useSwitchNetwork({ throwForSwitchChainNotSupported: true })
  const { chain } = useNetwork()
  const { address } = useAccount()
  const [stakingBalances, setStakingBalances] = useState<any>({})
  const { data: signer } = useSigner()

  useEffect(() => {
    console.log(chain?.id)
    if (!signer || !address || chain?.id != 1) return
    const getStakingBalance = async () => {
      const balances: any = {}
      for (const pool of pools) {
        const balance = await getStakeAmount(signer as any, address, pool, false)
        balances[pool] = Number(balance)
      }
      console.log(balances)
      setStakingBalances(balances)
    }
    getStakingBalance()
  }, [chain && signer && address])


  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='pt-24' />
      {address && chain?.id == 1 ? (
        <div>
          <div className='w-full px-10 '>
            <div className='w-full flex gap-10'>
              {stakeOptions.map(option => <Card option={option} key={option.title} balance={stakingBalances[option.poolId]} />)}

            </div>

          </div>
        </div>
      ) : address ? <div className='w-fit'>
        <div
        className={`relative ${address ? 'w-[300px]' : 'w-fit mr-12'} h-full mr-4 mt-6 rounded-2xl duration-300 cursor-pointer bg-white flex flex-col items-center px-4 py-3 gap-2 select-none font-normal shadow-xl`}
        tabIndex={0}
      >
        <div onClick={() => {
          switchNetwork!(1)
      }} className='flex font-bold gap-1'>
        <p>Switch to Ethereum</p></div></div></div> : <div className='w-fit'><ConnectButton /></div>}

      {/* Footer */}
      <Footer
        label='In bonded staking, your tokens are locked for the duration of an epoch. The first 7 days of each era are the deposit / withdrawal window. During these 7 days you can deposit and withdraw tokens from the previous epoch and the newly started one. No rewards are accumulated during this time. After 7 days, all tokens committed to the pools are locked for the rest of the epoch and rewards are accumulated, which can either be withdrawn in the first 7 days of the following epoch or automatically roll over to the following epochs. Staking Agreement'
      />
    </div>
  )
}

export default StakeEthereum