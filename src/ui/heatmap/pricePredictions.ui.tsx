import { Metaverses } from "../../enums/metaverses.enum";
import { MapCardData } from "../../interfaces/heatmap.interface";
import Image from "next/image";

interface PricePredictionsUIProps {
  landData: MapCardData;
  metaverse: Metaverses;
}

export default function PricePredictionsUI({ landData, metaverse }: PricePredictionsUIProps) {


  return (
    <div className="gap-2 w-full flex flex-col justify-start items-start">
      <div className="flex items-center">
        <Image src='/images/eth.svg' width={20} height={20} alt='eth' />
        <p className={`text-sm xl:text-base font-bold ml-2 pt-0.5 px-1`}>{landData.predictions.ethPrediction !== null ? landData.predictions.ethPrediction.toFixed(2) : "No data"} <span className={`text-sm xl:text-base font-bold pt-0.5`}>ETH</span></p>
      </div>
      <div className="flex items-center">
        <Image src='/images/usd-coin-usdc-logo.png' width={20} height={20} alt='eth' />
        <p className={`text-sm xl:text-base font-bold ml-2 pt-0.5 px-1`}>{landData.predictions.usdPrediction !== null ? landData.predictions.usdPrediction : "No data"} <span className={`text-sm xl:text-base font-bold pt-0.5`}>USDC</span></p>
      </div>
      <div className="flex items-center">
        {metaverse === Metaverses.SandBox && <Image src='/images/the-sandbox-sand-logo.png' width={20} height={20} alt='sandbox' />}
        {metaverse === Metaverses.Decentraland && <Image src='/images/decentraland-mana-logo.png' width={20} height={20} alt='decentraland' />}
        {metaverse === Metaverses.SomniumSpace && <Image src='/images/somnium-space-logo.png' width={20} height={20} alt='somniun-space' />}
        <p className={`text-sm xl:text-base font-bold ml-2 pt-0.5 px-1`}>
          {landData.predictions.metaversePrediction !== null ? landData.predictions.metaversePrediction : "No data"}<span className={`text-sm xl:text-base font-bold pt-0.5 pl-1`}>
            {metaverse === Metaverses.SandBox && 'SAND'}
            {metaverse === Metaverses.Decentraland && 'MANA'}
            {metaverse === Metaverses.SomniumSpace && 'CUBE'}
          </span></p>
      </div>
    </div>
  );
}
