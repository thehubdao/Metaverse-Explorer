import { ICoinPrices } from "../../types/valuationTypes"
import Image from "next/image";

interface SpecificPriceListUIProprs {
  prices: ICoinPrices
}
export default function SpecificPriceListUI({ prices }: SpecificPriceListUIProprs) {

  return (
    <div className='flex flex-col gap-2 w-full justify-start items-start'>
      <div>
        <p className="text-nm-dm-remark font-normal text-sm">Listing Price:</p>
        <div className="flex items-center">
          <Image src='/images/eth.svg' width={20} height={20} alt='eth' />
          <p className='text-md font-bold pt-0.5 px-1'>{prices.ethereum} <span className='text-md font-bold pt-0.5'>ETH</span></p>
        </div>
      </div>
      <div>
        <p className="text-nm-dm-remark font-normal text-sm">Last Sale Price:</p>
        <div className="flex items-center">
          <Image src='/images/eth.svg' width={20} height={20} alt='eth' />
          <p className='text-md font-bold pt-0.5 px-1'>{prices['the-sandbox']} <span className='text-md font-bold pt-0.5'>USDC</span></p>
        </div>
      </div>
      <div>
        <p className="text-nm-dm-remark font-normal text-sm">Last bought on:</p>
        <div className="flex items-center">
          <Image src='/images/eth.svg' width={20} height={20} alt='eth' />
          <p className='text-md font-bold pt-0.5 px-1'>{prices['somnium-space-cubes']} <span className='text-md font-bold pt-0.5'>CUBE</span></p>
        </div>
      </div>
    </div>
  )
}