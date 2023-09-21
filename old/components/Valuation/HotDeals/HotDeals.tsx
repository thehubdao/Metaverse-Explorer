import { Scrollbar, A11y } from 'swiper';
import { Metaverse } from '../../../lib/metaverse'
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { fetchChartData } from "../../Analytics/fetchChartData";
import Image from 'next/image';
import HotDealsCard from "./HotDealsCard";
import { ICoinPrices } from '../../../lib/valuation/valuationTypes'
import { IPredictions } from '../../../lib/types';
import { getCollectionData } from '../../../backend/services/openSeaDataManager';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface Props {
  metaverse: Metaverse
  coinPrices: ICoinPrices
}

interface InextButton {
  isLeft?: boolean
}

function NextButton({ isLeft }: InextButton) {
  const swiper = useSwiper();
  return (
    <div onClick={() => {
      if (isLeft) {
        swiper.slidePrev();
      } else {
        swiper.slideNext();
      }
    }} className={`absolute top-2/4 ${isLeft ? 'rotate-180 left-0' : 'right-0'} -translate-y-2/4 z-10 cursor-pointer bg-white p-2 rounded-l-lg select-none`}>
      <Image src={'/images/icons/next.svg'} alt={'Next slide'} width={8} height={16} />
    </div>
  )
}

const HotDeals = ({ metaverse, coinPrices }: Props) => {
  const [stateData, setStateData] = useState<'errorQuery' | 'loadingQuery' | 'successQuery'>('loadingQuery')
  const [topPicks, setTopPicks] = useState([]);
  const [predictions, setPredictions] = useState<IPredictions>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const setData = async () => {
      setLoading(true)
      // Fetch Data from OpenSea
      const stats = await getCollectionData(metaverse)
      const formattedMetaverse =
        metaverse === 'sandbox'
          ? 'the-sandbox'
          : metaverse === 'somnium-space'
            ? 'somnium-space-cubes'
            : metaverse

          const metaversePrediction =
          (stats.floor_price * coinPrices.ethereum?.usd) /
          coinPrices[formattedMetaverse].usd
  
        const predictions = {
          ethPrediction: stats.floor_price,
          usdPrediction: stats.floor_price * coinPrices.ethereum?.usd,
          metaversePrediction: metaversePrediction,
        }
      setPredictions(predictions)
      setLoading(false)
    }
    setData()
  }, [metaverse])

  async function waitingData(metaverse: Metaverse) {
    const data: any = await fetchChartData(metaverse, "topPicks");
    if (data) {
      if(predictions !== undefined){
        const dataFilter = data.filter((land: any) => ((land.gap < 0) && (land.current_price_eth < (predictions.ethPrediction + (predictions.ethPrediction * 0.1))))).slice(0, 20)
        setTopPicks(dataFilter);
        setStateData('successQuery')
      }
    } else {
      setStateData('errorQuery')
    }
  }

  useEffect(() => {
    waitingData(metaverse);
  }, [metaverse, predictions]);
  

  return (
    <div className='relative w-full'>
      <Swiper
        modules={[Scrollbar, A11y]}
        spaceBetween={25}
        slidesPerView='auto'
        scrollbar={{ draggable: true }}
        style={{ padding: '0px 10px' }}
      >
        {metaverse &&
          topPicks.map((land: any, index: number) => {
            return (
              <SwiperSlide
                key={index}
                style={{ width: '180px' }}
              >
                <HotDealsCard
                  metaverse={metaverse}
                  apiData={land}
                  landCoords={{
                    x: land.coords ? land?.coords.x : land?.center.x,
                    y: land?.coords ? land?.coords.y : land?.center.y,
                  }}
                  name={land.name}
                />
              </SwiperSlide>
            )
          })}
        <NextButton isLeft />
        <NextButton />
      </Swiper>
    </div>

  );
};
export default HotDeals