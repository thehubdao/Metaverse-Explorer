import Image from "next/image";
import { Metaverses } from "../../enums/metaverses.enum";
import { IPredictions } from "../../interfaces/heatmap.interface";
import { PriceListForm } from "../../enums/ui.enum";

interface PriceListUIProps {
  predictions: IPredictions | undefined;
  form: PriceListForm;
  metaverse: Metaverses;
}
export default function PriceListUI({ predictions, form, metaverse }: PriceListUIProps) {

  return (
    <div className={`gap-2 w-full flex flex-col ${form == PriceListForm.Bold ? "justify-start items-start" : "justify-center items-center"} `}>
      <div className="flex items-center">
        <Image src='/images/eth.svg' width={20} height={20} alt='eth' />
        <p className={`text-sm xl:text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light ml-2"} pt-0.5 px-1 dark:text-lm-text-gray`}>{predictions?.ethPrediction !== undefined ? predictions.ethPrediction.toFixed(2) : "No data"} <span className={`text-sm xl:text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light"} pt-0.5 dark:text-lm-text-gray`}>ETH</span></p>
      </div>
      <div className="flex items-center">
        <Image src='/images/usd-coin-usdc-logo.png' width={20} height={20} alt='eth' />
        <p className={`text-sm xl:text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light ml-2"} pt-0.5 px-1 dark:text-lm-text-gray`}>{predictions?.usdPrediction !== undefined ? predictions.usdPrediction.toFixed(2) : "No data"} <span className={`text-sm xl:text-base ${form == PriceListForm.Bold ? "font-bold" : "font-light"} pt-0.5 dark:text-lm-text-gray`}>USDC</span></p>
      </div>
      <div className="flex items-center">
        {metaverse === Metaverses.SandBox && <Image src='/images/the-sandbox-sand-logo.png' width={20} height={20} alt='Sandbox' />}
        {metaverse === Metaverses.Decentraland && <Image src='/images/decentraland-mana-logo.png' width={20} height={20} alt='Decentraland' />}
        {metaverse === Metaverses.SomniumSpace && <Image src='/images/somnium-space-logo.png' width={20} height={20} alt='Somniun space' />}
        <p className={`text-sm xl:text-base dark:text-lm-text-gray ${form == PriceListForm.Bold ? "font-bold" : "font-light ml-2"} pt-0.5 px-1`}>
          {predictions?.metaversePrediction !== undefined ? predictions.metaversePrediction.toFixed(2): "No data"}<span className={`text-sm xl:text-base  ${form == PriceListForm.Bold ? "font-bold" : "font-light"} pt-0.5 pl-1`}>
            {metaverse === Metaverses.SandBox && 'SAND'}
            {metaverse === Metaverses.Decentraland && 'MANA'}
            {metaverse === Metaverses.SomniumSpace && 'CUBE'}
          </span>
        </p>
      </div>
    </div>
  )
}