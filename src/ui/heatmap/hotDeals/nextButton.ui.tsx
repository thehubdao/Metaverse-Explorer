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
    }} className={`absolute flex items-center justify-end top-2/4 ${isLeft ? 'rotate-180 left-0' : 'right-0'} -translate-y-2/4 z-10 cursor-pointer rounded-l-lg select-none w-14 h-[101%] bg-gradient-to-l from-white via-white to-transparent dark:from-nm-black dark:via-nm-black`}>
      <Image src={'/images/icons/next.svg'} alt={'Next slide'} width={18} height={31}/>
    </div>
  )
}