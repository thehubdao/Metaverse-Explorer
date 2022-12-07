import React, { useContext } from 'react'
import { purchaseCoinOptions } from '.'
import { typedKeys } from '../../lib/utilities'
import { OptimizedImage } from '../General'
import { purchaseContext } from './purchaseContext'
import { PurchaseCoin } from './purchaseTypes'

const PurchaseCoinList = () => {
  const {
    coinsBalance,
    setCoin,
    coin: selectedCoin,
  } = useContext(purchaseContext)

  return (
    <ul className='grid grid-cols-4 md:grid-cols-4  justify-items-center lg:flex flex-wrap lg:gap-4 lg:justify-around mb-16'>
      {typedKeys(purchaseCoinOptions).map((coin) => (
        <li>
          <button onClick={() => setCoin(coin)}>
            <img
              src={purchaseCoinOptions[coin].img}
              className={
                'block lg:hidden rounded-full  h-16 xl:h-20 w-16 xl:w-20 p-1' +
                ((!selectedCoin && coinsBalance && coinsBalance[coin] > 0) ||
                selectedCoin === coin
                  ? ''
                  : ' grayscale')
              }
              loading='lazy'
            />
            <OptimizedImage
              width={90}
              height={90}
              src={purchaseCoinOptions[coin].img}
              rounded='full'
              className={
                'hover:grayscale-0 transition-all hidden lg:block' +
                ((!selectedCoin && coinsBalance && coinsBalance[coin] > 0) ||
                selectedCoin === coin
                  ? ''
                  : ' grayscale')
              }
            />
          </button>
        </li>
      ))}
    </ul>
  )
}

export default PurchaseCoinList
