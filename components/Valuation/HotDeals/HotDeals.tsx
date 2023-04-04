import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Metaverse } from '../../../lib/metaverse'
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchChartData } from "../../Analytics/fetchChartData";
import  HotDealsCard  from "./HotDealsCard";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface Props {
    metaverse: Metaverse
}

const HotDeals = ({  metaverse }: Props) => {
  const [stateData, setStateData] = useState<'errorQuery' | 'loadingQuery' | 'successQuery'>('loadingQuery')
  const [topPicks, setTopPicks] = useState([]);

  async function waitingData(metaverse: Metaverse) {
		const data: any = await fetchChartData(metaverse, "topPicks");
		if (data) {
      const dataFilter = data.filter((land:any) => land.gap < 0).slice(0,20)
			setTopPicks(dataFilter);
			setStateData('successQuery')
		} else {
			setStateData('errorQuery')
		}
	}

	useEffect(() => {
		waitingData(metaverse);
	}, [metaverse]);

  useEffect(() => {
    console.log(topPicks, 'toppicks');
	}, [topPicks]);
  
  
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={6}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <ul>
        {metaverse &&
        topPicks.map((land: any) => {
            return (
                <li
                key={land.tokenId}
                className="w-full gray-box shadowNormal"
                >
                    <SwiperSlide>
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
                </li>
            )
          })}
      </ul>
    </Swiper>
  );
};
export default HotDeals