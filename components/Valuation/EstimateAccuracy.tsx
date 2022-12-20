import React, { useEffect, useState } from 'react'
import { getEstimateAccuracy } from '../../backend/services/openSeaDataManager'
import { Metaverse } from '../../lib/metaverse'
import { ICoinPrices } from '../../lib/valuation/valuationTypes'


interface Props {
  metaverse: Metaverse
  coinPrices: ICoinPrices
}

const EstimateAccuracy = ({ metaverse }: Props) => {
  const [values, setValues] = useState<any>()
  const [loading, setLoading] = useState(true)
  const styleContent = 'text-base font-medium font-plus text-grey-content pt-0.5'

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  });

  useEffect(() => {
    const setData = async () => {
      setLoading(true)
      // Fetch Data from ITRM
      const stats = await getEstimateAccuracy(metaverse)
      
      setValues(stats)
      setLoading(false)
    }
    setData()
  }, [metaverse])
  return !values /* || metaverse =="axie-infinity" */ ? (
    <>
      <div className='flex flex-col items-start border-t border-l border-white/10 rounded-xl p-5 mt-10 w-full bg-grey-panel'>
        <p className={`text-lg xl:text-xl font-medium text-grey-content`}>
          We couldn't obtain Estimate Accuracy
          Check{' '}
          <a
            href='https://opensea.io/collection'
            target='_blank'
            className='hover:underline text-grey-content'
          >
            Open Sea Market
          </a>{' '}
          for more information.
        </p>
      </div>
    </>
  ) : (
    <>
    <div className='flex flex-col'>
        <p className={`text-lg xl:text-xl font-medium text-grey-content font-plus mb-4`}>
          Estimate Accuracy:{' '}
        </p>
        <div
          className='flex border-t border-l border-white/10 shadow-blck rounded-xl justify-between p-9 bg-grey-panel'
        >
          <div className="flex flex-col space-y-1">
            <p className={styleContent}>
            MAPE :
            </p>
            <p className={styleContent}>
            R-Squared :
            </p>
            <p className={styleContent}>
              MAXIMUM :
            </p>
            <p className={styleContent}>
              MINIMUN :
            </p>
          </div>
          <div className="items-end space-y-1 text-right">
            <p className={styleContent}>
              {formatter.format(values.MAPE)}
            </p>
            <p className={styleContent}>
              {formatter.format(values.R2)}
            </p>
            <p className={styleContent}>
              {formatter.format(values.maximum)}
            </p> 
            <p className={styleContent}>
              {formatter.format(values.minimum)}
            </p> 
          </div>			
        </div>
    </div>
    </>
  )
}

export default EstimateAccuracy
