import { Contracts } from '../../lib/contracts'
import { IPriceCard } from '../../lib/valuation/valuationTypes'
import { HorizontalPriceCard } from '../General'

const MostUnderValuedLand = ({
  apiData,
  showCard,
  predictions,
  processing,
}: IPriceCard) => {
  const mockApiData = {
    external_link:
      'https://www.sandbox.game/en/lands/919eda05-50f0-497b-bb0f-0c600b82dbf8/',
    images: {
      image_url:
        'https://api.sandbox.game/lands/919eda05-50f0-497b-bb0f-0c600b82dbf8/preview-500px-x-500px.jpg',
    },
    metaverse: 'sandbox',
    name: 'LAND (136, 4)',
    opensea_link:
      `https://opensea.io/assets/${Contracts.LAND.ETHEREUM_MAINNET.oldAddress}/85204`,
    tokenId: '85204',
  }

  const mockPredictions = {
    ethPrediction: 100.213,
    usdPrediction: 10.421,
    sandPrediction: 10.213,
    // manaPrediction: 10,
  }

  return (
    <article>
      {/* Title */}
      <h3 className='text-2xl green-text-gradient'>
        Most Undervalued LAND of the day:
      </h3>
      {/* Land Card */}
      <div className='flex flex-col items-center m-auto gray-box p-4 sm:px-8 sm:w-max text-left'>
        {/* <HorizontalPriceCard
          apiData={mockApiData}
          showCard={showCard}
          predictions={mockPredictions}
          processing={processing}
        /> */}
      </div>
    </article>
  )
}

export default MostUnderValuedLand
