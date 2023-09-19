import { ICoinPrices } from "../../types/valuationTypes";
import Image from "next/image";

interface SpecificPriceListUIProprs {
  prices: ICoinPrices;
}
export default function SpecificPriceListUI({ prices }: SpecificPriceListUIProprs) {

  return (
    <div className='flex flex-col gap-2 w-full justify-start items-start'>
      <div>
        <p className="text-nm-dm-remark dark:text-nm-fill font-normal text-sm">Listing Price:</p>
        <div className="flex items-center">
          <Image src='/images/eth.svg' width={20} height={20} alt='eth' />
          <p className='text-md font-bold pt-0.5 px-1 dark:text-lm-text-gray'>{prices.ethereum} <span className='text-md font-bold pt-0.5 dark:text-lm-text-graydark:text-lm-text-gray'>ETH</span></p>
        </div>
      </div>
      <div>
        <p className="text-nm-dm-remark dark:text-nm-fill font-normal text-sm">Last Sale Price:</p>
        <div className="flex items-center">
          <Image src='/images/eth.svg' width={20} height={20} alt='eth' />
          <p className='text-md font-bold pt-0.5 px-1 dark:text-lm-text-gray'>{prices['the-sandbox']} <span className='text-md font-bold pt-0.5 dark:text-lm-text-graydark:text-lm-text-gray'>USDC</span></p>
        </div>
      </div>
      <div>
        <p className="text-nm-dm-remark dark:text-nm-fill font-normal text-sm">Last bought on:</p>
        <div className="flex items-center">
          <Image src='/images/eth.svg' width={20} height={20} alt='eth' />
          <p className='text-md font-bold pt-0.5 px-1 dark:text-lm-text-gray'>{prices['somnium-space-cubes']} <span className='text-md font-bold pt-0.5 dark:text-lm-text-graydark:text-lm-text-gray'>CUBE</span></p>
        </div>
      </div>
    </div>
  )
}