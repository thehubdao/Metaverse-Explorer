import { PriceListForm } from "../../enums/common.enum";
import { ICoinPrices } from "../../types/valuationTypes";
import Image from "next/image";

interface PriceListUIProprs {
  prices: ICoinPrices;
  form: PriceListForm;
}
export default function PriceListUI({ prices, form }: PriceListUIProprs) {

  return (
    <div className={`gap-2 w-full flex flex-col ${form == PriceListForm.Bold ? "justify-start items-start" : "justify-center items-center" } `}>
      <div className="flex items-center">
        <Image src='/images/eth.svg' width={20} height={20} alt='eth' />
        <p className={`text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light ml-2"} pt-0.5 px-1`}>{prices.ethereum} <span className={`text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light"} pt-0.5`}>ETH</span></p>
      </div>
      <div className="flex items-center">
        <Image src='/images/usd-coin-usdc-logo.png' width={20} height={20} alt='eth' />
        <p className={`text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light ml-2"} pt-0.5 px-1`}>{prices['the-sandbox']} <span className={`text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light"} pt-0.5`}>USDC</span></p>
      </div>
      <div className="flex items-center">
        <Image src='/images/somnium-space-cube-logo.webp' width={20} height={20} alt='eth' />
        <p className={`text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light ml-2"} pt-0.5 px-1`}>{prices['somnium-space-cubes']} <span className={`text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light"} pt-0.5`}>CUBE</span></p>
      </div>
    </div>
  )
}