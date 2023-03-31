import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Metaverse } from '../lib/metaverse'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Land from './Watchlist/Land';

interface Props {
    // land: any
    // landId: string
    metaverse: Metaverse
}
const HotDealsCards = ({  metaverse }: Props) => {

  console.log(metaverse, 'metaverse');
  
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={7}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
    {/* <ul className="grid gap-4 lg:gap-12 md:gap-6 md:grid-cols-3 p-8">
            {metaverse &&
            Object.values(metaverse)
                .map((land: any) => {
                return (
                    <li
                    key={land.tokenId}
                    className="w-full gray-box shadowNormal"
                    >
                        <SwiperSlide>
                            <Land
                                land={land}
                                landId={land.tokenId}
                                metaverse={metaverse}
                                // onTrashClick={
                                // removeLand
                                // }
                            />
                        </SwiperSlide>
                    </li>
                )
                })}
        </ul> */}
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
    </Swiper>
  );
};
export default HotDealsCards