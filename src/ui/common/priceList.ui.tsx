import { ICoinPrices } from "../../types/valuationTypes"
import Image from "next/image";

interface PriceListUIProprs{
    prices: ICoinPrices
}
export default function PriceListUI({prices}: PriceListUIProprs){
    
    return(
        <div className='flex flex-col gap-2 w-full justify-start items-start'>
            <div className="flex items-center">
                <Image src='/images/eth.svg' width={20} height={20} alt='eth' />
                <p className='text-md font-bold pt-0.5 px-1'>{prices.ethereum} <span className='text-md font-bold pt-0.5'>ETH</span></p>
            </div>
            <div className="flex items-center">
                <Image src='/images/usd-coin-usdc-logo.png' width={20} height={20} alt='eth' />
                <p className='text-md font-bold pt-0.5 px-1'>{prices['the-sandbox']} <span className='text-md font-bold pt-0.5'>USDC</span></p>
            </div>
            <div className="flex items-center">
                <Image src='/images/somnium-space-cube-logo.webp' width={20} height={20} alt='eth' />
                <p className='text-md font-bold pt-0.5 px-1'>{prices['somnium-space-cubes']} <span className='text-md font-bold pt-0.5'>CUBE</span></p>
            </div>
        </div>
    )
}