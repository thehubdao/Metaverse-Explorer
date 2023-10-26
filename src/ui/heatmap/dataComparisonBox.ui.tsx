import { IPredictions } from "../../interfaces/heatmap.interface";
import Image from 'next/image';

interface DataComparisonBoxUIProps {
  currentPriceEth: number | undefined;
  predictions: IPredictions | undefined;
}
export default function DataComparisonBoxUI({ currentPriceEth, predictions }: DataComparisonBoxUIProps) {
  const ethPredictionPrice = predictions?.ethPrediction;
  const comparedValue =
    !ethPredictionPrice || !currentPriceEth
      ? undefined
      : ((currentPriceEth - ethPredictionPrice) / ethPredictionPrice) * 100;
  const isUnderValued = comparedValue && comparedValue < 0;
  return (
    <div className='relative flex text-base text-left font-bold items-center gap-5'>
      {currentPriceEth
        ?
        <>
          <div className='flex'>
            <Image src="/images/eth.svg" width={20} height={20} className='rounded-full' alt="Eth icon" />
            <p className={`text-lg`}>
              {`${currentPriceEth?.toFixed(2)} ETH`}
            </p>
          </div>
          {/* Comparison Percentage  */}
          <div className={`${isUnderValued ? 'bg-[#47E298]' : 'bg-[#FF4949]'} text-white flex flex-col items-center px-2 py-1 rounded-lg`}>
            <p className='text-base leading-3'>
              {comparedValue ? `${Math.abs(comparedValue).toFixed()}%` : "No data"}
            </p>
            <p className='text-xs leading-3'>
              {isUnderValued ? 'Undervalued' : 'Overvalued'}
            </p>
          </div>
        </>
        : <p className={`text-lg dark:text-lm-text-gray`}>Not Listed</p>
      }
    </div >
  )
}