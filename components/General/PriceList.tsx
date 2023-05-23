import Image from 'next/image'
import { Metaverse } from '../../lib/metaverse'
import { IPredictions } from '../../lib/types'
import { typedKeys } from '../../lib/utilities'

const COINS = {
  ethPrediction: {
    src: '/images/eth.svg',
    name: 'ETH',
  },
  usdPrediction: {
    src: '/images/usd-coin-usdc-logo.png',
    name: 'USDC',
  },
  metaversePrediction: {
    sandboxPrediction: {
      src: '/images/the-sandbox-sand-logo.png',
      name: 'SAND',
    },
    decentralandPrediction: {
      src: '/images/decentraland-mana-logo.png',
      name: 'MANA',
    },
    'axie-infinityPrediction': {
      src: '/images/axie-infinity-axs-logo.png',
      name: 'AXS',
    },
    'somnium-spacePrediction': {
      src: '/images/somnium-space-cube-logo.webp',
      name: 'CUBE'
    }
  },
}

type metaverseKey =
  | 'sandboxPrediction'
  | 'decentralandPrediction'
  | 'axie-infinityPrediction'
  | 'somnium-spacePrediction'

interface Props {
  predictions: Partial<IPredictions>
  className?: string
  metaverse?: Metaverse
}

const PriceList = ({ predictions, className, metaverse }: Props) => {
  const keys = typedKeys(predictions)
  return (
    <ul className={'flex flex-col flex-grow min-w-max gap-1 ' + className}>
      {/* Iterating through each Coin.  */}
      {keys.map(
        (key) =>
          (key !== 'metaversePrediction' ||
            (key === 'metaversePrediction' && metaverse)) && (
            <li
              key={
                key === 'metaversePrediction'
                  ? COINS[key][(metaverse + 'Prediction') as metaverseKey].name
                  : COINS[key].name
              }
              className='animate-fade-in-slow flex gap-4 items-center w-full justify-start h-full'
            >
              {/* Coin Image */}
              <Image 
                src={
                  key === 'metaversePrediction'
                    ? COINS[key][(metaverse + 'Prediction') as metaverseKey].src
                    : COINS[key].src
                }
                className='rounded-full h-10 w-10 p-2 justify-end'
                width={25}
                height={25}
                loading='lazy'
              />
              {/* Coin Prediction Number */}
              <div className='w-full flex gap-2 content-center items-center text-xl  font-light text-grey-content'>
                <p className='pt-0.5'>
                  {predictions[key]?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
                {/* Coin Name */}
                <p className=''>
                  {' ' +
                    (key === 'metaversePrediction'
                      ? COINS[key][(metaverse + 'Prediction') as metaverseKey]
                        .name
                      : COINS[key].name)}
                </p>
              </div>
            </li>
          )
      )}
    </ul >
  )
}

export default PriceList
