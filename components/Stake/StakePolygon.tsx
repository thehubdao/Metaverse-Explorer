import Image from "next/image"
import ConnectButton from "../ConnectButton"

const StakingSection = () => {
  return (
    <div className="flex flex-col row-span-3 nm-flat-medium rounded-xl p-10 gap-7 justify-center items-center">
      <div className="flex justify-center items-center gap-3">
        <Image
          src='/images/mgh_logo.svg'
          width={40}
          height={40}
        />
        <h2 className="text-blue-500 text-2xl">$MGH Staking</h2>
      </div>
      <input
        className="font-normal font-plus justify-center text-grey-content nm-inset-soft focus:outline-none placeholder-gray-300 p-4 rounded-full w-full"
      />
      <input
        className="font-normal font-plus justify-center text-grey-content nm-inset-soft focus:outline-none placeholder-gray-300 p-4 rounded-full w-full"
      />
      <ConnectButton />
      <p className="text-center">Staking Agreement</p>
    </div>
  )
}

const DataColumnRow = ({ title, data }: { title: string, data: string }) => {
  return (
    <div className="w-full flex justify-between">
      <p className="font-bold">{title}</p>
      <p>{data}</p>
    </div>
  )
}

const RewardButton = ({ label, isDark }: { label: string, isDark?: boolean }) => {
  return (
    <button className={`w-full py-3 nm-flat-medium rounded-xl ${isDark && 'bg-grey-content text-white'}`}>
      {label}
    </button>
  )
}

const RewardSection = () => {
  return (
    <div className="flex flex-col row-span-2 nm-flat-medium rounded-xl p-10 justify-center items-center gap-3">
      <h2 className="text-blue-500 text-2xl">Rewards</h2>
      <DataColumnRow title="Total MGH Locked" data="99999.92 $MGH" />
      <DataColumnRow title="Total Rewards/Second" data="0.02 $MGH" />
      <DataColumnRow title="Current APR" data="7.62%" />
      <p className="w-full border-b-2 border-grey-content pb-3 text-sm">APR is subject to continuous change</p>
      <DataColumnRow title="Your Stake" data="0.00 $MGH (0.00%" />
      <DataColumnRow title="Rewards claimable" data="0.00 $MGH" />
      <div className="w-full grid grid-cols-2 gap-5">
        <RewardButton label="Claim" isDark />
        <RewardButton label="Reinvest" />
      </div>
    </div>
  )
}

const BridgeSection = () => {
  return (
    <div className="flex flex-col row-span-1 nm-flat-medium rounded-xl p-10 gap-4">
      <p className="text-xs">$MGH staking is on Polygon for you to save network fees. To stake your $MGH, you first have to bridge them using the Polygon Bridge.</p>
      <div className="w-full bg-grey-content flex rounded-2xl nm-flat-medium justify-center items-center">
        <p className="text-center text-white w-full">Bridge $MGH</p>
        <div className='p-2 bg-white rounded-2xl'>
          <Image
            src='/images/icons/chains/polygon.svg'
            width={36}
            height={36}
          />
        </div>
      </div>
    </div>
  )
}

const StakePolygon = () => {
  return (
    <>
      <div className="pt-24" />
      <div className="grid grid-cols-2 grid-rows-3 mx-20 gap-10">
        <StakingSection />
        <RewardSection />
        <BridgeSection />
      </div>
    </>
  )
}

export default StakePolygon