import { Metaverses } from "../../enums/enums";

interface EstimatorValuesUIProps {
  metaverseSelected: Metaverses;
  info: string;
  floor: number;
  tradingVolume: number;
  mcap: number;
  owners: number;
}

export default function EstimatorValuesUI({ metaverseSelected, info, floor, tradingVolume, mcap, owners }: EstimatorValuesUIProps) {
  return (
    <div className="flex items-center justify-between py-8 mt-7">
      <div className="flex flex-col gap-y-3 max-w-[789px] text-lm-text">
        <div className='flex gap-x-2 items-end'>
          <p className="text-3xl font-semibold leading-none">{metaverseSelected}</p>
        </div>
        <p className="text-base font-normal">{info}</p>
      </div>
      <div className="flex gap-x-8 items-center justify-evenly max-w-2xl">
        <div className="flex flex-col gap-y-1 items-center">
          <p className="font-bold text-3xl whitespace-nowrap text-lm-text">{floor} ETH</p>
          <p className="text-sm font-bold text-lm-text-gray">FLOOR</p>
        </div>
        <div className="flex flex-col gap-y-1 items-center">
          <p className="font-bold text-3xl whitespace-nowrap text-lm-text">{tradingVolume} ETH</p>
          <p className="text-sm font-bold text-lm-text-gray">TRADING VOLUME</p>
        </div>
        <div className="flex flex-col gap-y-1 items-center">
          <p className="font-bold text-3xl whitespace-nowrap text-lm-text">{mcap} ETH</p>
          <p className="text-sm font-bold text-lm-text-gray">MCAP</p>
        </div>
        <div className="flex flex-col gap-y-1 items-center">
          <p className=" font-bold text-3xl whitespace-nowrap text-lm-text">{owners}</p>
          <p className="text-sm font-bold text-lm-text-gray">OWNERS</p>
        </div>
      </div>
    </div>
  )
}