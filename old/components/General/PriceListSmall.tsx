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

const PriceListSmall = ({ predictions, className, metaverse }: Props) => {
  const keys = typedKeys(predictions)
  return (
    <ul className={'flex flex-col flex-grow min-w-max gap-0 ' + className}>
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
              className='flex gap-2 sitems-center w-full justify-start items-center h-full'
            >
              {/* Coin Image */}
              <img
                src={
                  key === 'metaversePrediction'
                    ? COINS[key][(metaverse + 'Prediction') as metaverseKey].src
                    : COINS[key].src
                }
                className='rounded-full  h-5 w-5 '
                loading='lazy'
              />
              {/* Coin Prediction Number */}
              <p className='text-lg 2xl:text-xl font-bold  text-grey-content pt-0.5'>
                {predictions[key]?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
                {/* Coin Name */}
                <span className='font-light text-sm'>
                  {' ' +
                    (key === 'metaversePrediction'
                      ? COINS[key][(metaverse + 'Prediction') as metaverseKey]
                          .name
                      : COINS[key].name)}
                </span>
              </p>
            </li>
          )
      )}
    </ul>
  )
}

export default PriceListSmall
