import React from 'react'
import { IPredictions } from '../../../lib/types'

interface Props {
  currentPriceEth?: number
  predictions?: IPredictions
}

/**
 * Box that shows comparison of current and predicted price of a land
 */
const DataComparisonBox = ({ currentPriceEth, predictions }: Props) => {
  const ethPredictionPrice = predictions?.ethPrediction
  const comparedValue =
    !ethPredictionPrice || !currentPriceEth
      ? NaN
      : ((currentPriceEth - ethPredictionPrice) / ethPredictionPrice) * 100
  const isUnderValued = comparedValue < 0

  return (
    //Current Listing Price || Not Listed Message
    <div className='relative flex text-base text-left font-medium items-center gap-5'>
      <p className={`${currentPriceEth ? 'text-green-500' : 'text-gray-400'} text-lg`}>
        {currentPriceEth
          ? `${currentPriceEth?.toFixed(2)} ETH`
          : 'Not Listed'}
      </p>
      {/* Comparison Percentage  */}
      {currentPriceEth && (
        <div className={`${isUnderValued ? 'text-blue-400' : 'text-red-400'} flex flex-col items-center`}>
          <p>
            {`(${Math.abs(comparedValue).toFixed()}%)`}
          </p>
          <p>
            {isUnderValued ? 'Undervalued' : 'Overvalued'}
          </p>
        </div>
      )}
    </div>
  )
}

export default DataComparisonBox
