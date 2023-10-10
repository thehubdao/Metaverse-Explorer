import { PriceListForm } from "../../enums/common.enum";
import Image from "next/image";
import { CoinValuesType } from "../../utils/itrm/coin-gecko.util";

interface PriceListUIProprs {
  prices: CoinValuesType;
  form: PriceListForm;
}
export default function PriceListUI({ prices, form }: PriceListUIProprs) {

  return (
    <div className={`gap-2 w-full flex flex-col ${form == PriceListForm.Bold ? "justify-start items-start" : "justify-center items-center" } `}>
      <div className="flex items-center">
        <Image src='/images/eth.svg' width={20} height={20} alt='eth' />
        <p className={`text-sm xl:text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light ml-2"} pt-0.5 px-1 dark:text-lm-text-gray`}>{prices.ethereum.usd} <span className={`text-sm xl:text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light"} pt-0.5 dark:text-lm-text-gray`}>ETH</span></p>
      </div>
      <div className="flex items-center">
        <Image src='/images/usd-coin-usdc-logo.png' width={20} height={20} alt='eth' />
        <p className={`text-sm xl:text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light ml-2"} pt-0.5 px-1 dark:text-lm-text-gray`}>{prices["the-sandbox"].usd} <span className={`text-sm xl:text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light"} pt-0.5 dark:text-lm-text-gray`}>USDC</span></p>
      </div>
      <div className="flex items-center">
        <Image src='/images/somnium-space-cube-logo.webp' width={20} height={20} alt='eth' />
        <p className={`text-sm xl:text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light ml-2"} pt-0.5 px-1 dark:text-lm-text-gray`}>{prices['somnium-space-cubes'].usd} <span className={`text-sm xl:text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light"} pt-0.5 dark:text-lm-text-gray`}>CUBE</span></p>
      </div>
    </div>
  )
}