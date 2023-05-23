import React, { useEffect, useState } from 'react'
import { getEstimateAccuracy } from '../../backend/services/openSeaDataManager'
import { Metaverse } from '../../lib/metaverse'
import { ICoinPrices } from '../../lib/valuation/valuationTypes'
import { Tooltip } from '@mui/material'
import { AiFillQuestionCircle } from 'react-icons/ai'


interface Props {
  metaverse: Metaverse
  coinPrices: ICoinPrices
}

const EstimateAccuracy = ({ metaverse }: Props) => {
  const [values, setValues] = useState<any>()
  const [loading, setLoading] = useState(true)
  const styleContent = 'text-base font-medium  text-grey-content pt-0.5'

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
      <div className='flex flex-col items-start border-t border-l border-white/10 rounded-xl p-5 mt-10 w-full bg-grey-panel h-full'>
        <p className={`text-lg font-medium text-grey-content`}>
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
      <div className='flex flex-col h-full'>
        <div className='flex items-center gap-x-2 mb-4'>
          <p className={`text-lg font-semibold text-grey-content `}>
            Estimate Accuracy:{' '}
          </p>
        </div>
        <div
          className='flex border-t border-l border-white/10 shadow-blck rounded-xl justify-between items-center p-5 min-w-max h-full bg-grey-panel'
        >
          <div className="flex flex-col space-y-1">
            <div className='flex items-center gap-x-2'>
              <Tooltip title={'The Mean Absolute Percentage Error is the average forecast absolute error scaled to percentage units, where absolute errors allow to avoid the positive and negative errors cancelling.'} placement="bottom-start" arrow>
                <div>
                  <AiFillQuestionCircle className='text-grey-icon hover:text-grey-content cursor-pointer transition-all duration-300' />
                </div>
              </Tooltip>
              <p className={styleContent}>
                MAPE :
              </p>
            </div>
            <div className='flex items-center gap-x-2'>
              <Tooltip title={'The R-Squared also known as coefficient of determination is the proportion of the variation between the forecasted valuations and actual selling prices. It ranges from 0 to 1 where 1 indicates the forcasted values match perfectly with actual values.'} placement="bottom-start" arrow>
                <div>
                  <AiFillQuestionCircle className='text-grey-icon hover:text-grey-content cursor-pointer transition-all duration-300' />
                </div>
              </Tooltip>
              <p className={styleContent}>
                R-Squared :
              </p>
            </div>
            <div className='flex items-center gap-x-2'>
              <Tooltip title={'Maximum forecasted value that the trained model returns'} placement="bottom-start" arrow>
                <div>
                  <AiFillQuestionCircle className='text-grey-icon hover:text-grey-content cursor-pointer transition-all duration-300' />
                </div>
              </Tooltip>
              <p className={styleContent}>
                MAXIMUM :
              </p>
            </div>
            <div className='flex items-center gap-x-2'>
              <Tooltip title={'Minimum forecasted value that the trained model returns'} placement="bottom-start" arrow>
                <div>
                  <AiFillQuestionCircle className='text-grey-icon hover:text-grey-content cursor-pointer transition-all duration-300' />
                </div>
              </Tooltip>
              <p className={styleContent}>
                MINIMUM :
              </p>
            </div>
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
