import { PriceListForm } from "../../enums/common.enum";
import Image from "next/image";
import { CoinValuesType } from "../../utils/itrm/coin-gecko.util";
import { Metaverses } from "../../enums/metaverses.enum";

interface PriceListUIProprs {
  prices: CoinValuesType;
  form: PriceListForm;
  metaverse: Metaverses;
}
export default function PriceListUI({ prices, form, metaverse }: PriceListUIProprs) {

  return (
    <div className={`gap-2 w-full flex flex-col ${form == PriceListForm.Bold ? "justify-start items-start" : "justify-center items-center"} `}>
      <div className="flex items-center">
        <Image src='/images/eth.svg' width={20} height={20} alt='eth' />
        <p className={`text-sm xl:text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light ml-2"} pt-0.5 px-1 dark:text-lm-text-gray`}>{prices.ethereum.usd} <span className={`text-sm xl:text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light"} pt-0.5 dark:text-lm-text-gray`}>ETH</span></p>
      </div>
      <div className="flex items-center">
        <Image src='/images/usd-coin-usdc-logo.png' width={20} height={20} alt='eth' />
        <p className={`text-sm xl:text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light ml-2"} pt-0.5 px-1 dark:text-lm-text-gray`}>{prices["the-sandbox"].usd} <span className={`text-sm xl:text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light"} pt-0.5 dark:text-lm-text-gray`}>USDC</span></p>
      </div>
      <div className="flex items-center">
        {metaverse === Metaverses.SandBox && <Image src='/images/the-sandbox-sand-logo.png' width={20} height={20} alt='sandbox' />}
        {metaverse === Metaverses.Decentraland && <Image src='/images/decentraland-mana-logo.png' width={20} height={20} alt='decentraland' />}
        {metaverse === Metaverses.SomniumSpace && <Image src='/images/somnium-space-logo.png' width={20} height={20} alt='somniun-space' />}
        <p className={`text-sm xl:text-base  ${form == PriceListForm.Bold ? "font-bold" : "font-light ml-2 dark:text-lm-text-gray"} pt-0.5 px-1`}>
          {prices['somnium-space-cubes'].usd}<span className={`text-sm xl:text-base  ${form == PriceListForm.Bold ? "font-bold" : "font-light"} pt-0.5 pl-1`}>
            {metaverse === Metaverses.SandBox && 'SAND'}
            {metaverse === Metaverses.Decentraland && 'MANA'}
            {metaverse === Metaverses.SomniumSpace && 'CUBE'}
          </span>
        </p>
      </div>
    </div>
  )
}