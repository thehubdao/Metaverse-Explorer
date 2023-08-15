import { useSwiper } from 'swiper/react';
import Image from 'next/image';

interface NextButtonUI {
  isLeft?: boolean
}

export default function NextButtonUI({ isLeft }: NextButtonUI) {
  const swiper = useSwiper();
  return (
    <div onClick={() => {
      if (isLeft) {
        swiper.slidePrev();
      } else {
        swiper.slideNext();
      }
    }} className={`absolute top-2/4 ${isLeft ? 'rotate-180 left-0' : 'right-0'} -translate-y-2/4 z-10 cursor-pointer bg-nm-highlight p-2 rounded-l-lg select-none`}>
      <Image src={'/images/icons/next.svg'} alt={'Next slide'} width={8} height={16} />
    </div>
  )
}