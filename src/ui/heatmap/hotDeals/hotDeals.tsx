import { Metaverses } from "../../../enums/enums";
import { ICoinPrices } from "../../../types/valuationTypes";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y } from 'swiper';
import NextButton from "./nextButton";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface HotDealsUIProps {
  metaverseSelected: Metaverses;
  prices: ICoinPrices;
}


export default function HotDealsUI({ metaverseSelected, prices }: HotDealsUIProps) {
  return (
    <div className='relative w-full'>
      <Swiper
        modules={[Scrollbar, A11y]}
        spaceBetween={25}
        slidesPerView='auto'
        scrollbar={{ draggable: true }}
        style={{ padding: '0px 10px' }}
      >

        <NextButton isLeft />
        <NextButton />
      </Swiper>
    </div>
  )
}