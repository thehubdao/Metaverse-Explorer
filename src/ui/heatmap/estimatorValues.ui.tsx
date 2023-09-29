import { Metaverses } from "../../enums/metaverses.enum";
import { MetaverseGlobalData } from "../../interfaces/itrm/land-valuation.interface";

interface EstimatorValuesUIProps {
  metaverseSelected: Metaverses;
  info: string;
  globalData: MetaverseGlobalData | null;
}

export default function EstimatorValuesUI({ metaverseSelected, info, globalData }: EstimatorValuesUIProps) {
  return (
    <div className="flex flex-wrap items-center justify-between py-8 mt-7">
      <div className="flex flex-col gap-y-3 w-full lg:w-1/2 lg:max-w-[789px] text-lm-text dark:text-nm-highlight">
        <div className='flex gap-x-2 items-end'>
          <p className="text-3xl font-semibold leading-none">{metaverseSelected}</p>
        </div>
        <p className="text-base font-normal">{info}</p>
      </div>
      <div className="flex gap-x-8 items-center justify-evenly max-w-2xl">
        <div className="flex flex-col gap-y-1 items-center">
          <p className="font-bold text-3xl whitespace-nowrap text-lm-text dark:text-nm-highlight">
            {globalData?.floor_price !== undefined ? globalData.floor_price.toLocaleString() : ''}
            {' ETH'}
          </p>
          <p className="text-sm font-bold text-lm-text-gray">FLOOR</p>
        </div>
        <div className="flex flex-col gap-y-1 items-center">
          <p className="font-bold text-3xl whitespace-nowrap text-lm-text dark:text-nm-highlight">
            {globalData?.total_volume !== undefined ? Math.round(globalData.total_volume).toLocaleString() : ''}
            {' ETH'}
          </p>
          <p className="text-sm font-bold text-lm-text-gray">TRADING VOLUME</p>
        </div>
        <div className="flex flex-col gap-y-1 items-center">
          <p className="font-bold text-3xl whitespace-nowrap text-lm-text dark:text-nm-highlight">
            {globalData?.market_cap !== undefined ? Math.round(globalData.market_cap).toLocaleString() : ''}
            {' ETH'}
          </p>
          <p className="text-sm font-bold text-lm-text-gray">MCAP</p>
        </div>
        <div className="flex flex-col gap-y-1 items-center">
          <p className="font-bold text-3xl whitespace-nowrap text-lm-text dark:text-nm-highlight">
            {globalData?.num_owners !== undefined ? globalData.num_owners.toLocaleString() : ''}
          </p>
          <p className="text-sm font-bold text-lm-text-gray">OWNERS</p>
        </div>
      </div>
    </div>
  )
}