import { METAVERSE_LABEL, Metaverses } from "../../enums/metaverses.enum";
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
          <p className="text-3xl font-semibold leading-none">{METAVERSE_LABEL[metaverseSelected]}</p>
        </div>
        <p className="text-base font-normal">{info}</p>
      </div>
      <div className="flex flex-wrap gap-x-8 items-center justify-evenly w-full lg:w-1/2 lg:max-w-2xl">
        <div className="flex flex-col gap-y-1 items-center my-2">
          <p className="font-bold text-xl lg:text-3xl whitespace-nowrap text-lm-text dark:text-nm-highlight">
            {globalData?.floor_price !== undefined ? globalData.floor_price.toLocaleString() : ''}
            {' ETH'}
          </p>
          <p className="text-xs lg:text-sm font-bold text-lm-text-gray">FLOOR</p>
        </div>
        <div className="flex flex-col gap-y-1 items-center my-2">
          <p className="font-bold text-xl lg:text-3xl whitespace-nowrap text-lm-text dark:text-nm-highlight">
            {globalData?.total_volume !== undefined ? Math.round(globalData.total_volume).toLocaleString() : ''}
            {' ETH'}
          </p>
          <p className="text-xs lg:text-sm font-bold text-lm-text-gray">TRADING VOLUME</p>
        </div>
        <div className="flex flex-col gap-y-1 items-center my-2">
          <p className="font-bold text-xl lg:text-3xl whitespace-nowrap text-lm-text dark:text-nm-highlight">
            {globalData?.market_cap !== undefined ? Math.round(globalData.market_cap).toLocaleString() : ''}
            {' ETH'}
          </p>
          <p className="text-xs lg:text-sm font-bold text-lm-text-gray">MCAP</p>
        </div>
        <div className="flex flex-col gap-y-1 items-center my-2">
          <p className="font-bold text-xl lg:text-3xl whitespace-nowrap text-lm-text dark:text-nm-highlight">
            {globalData?.num_owners !== undefined ? globalData.num_owners.toLocaleString() : ''}
          </p>
          <p className="text-xs lg:text-sm font-bold text-lm-text-gray">OWNERS</p>
        </div>
      </div>
    </div>
  )
}