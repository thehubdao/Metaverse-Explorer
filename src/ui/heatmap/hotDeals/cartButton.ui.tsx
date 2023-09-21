import Image from 'next/image'
import { useTheme } from "next-themes";

export default function CartButtonUI() {
  const { theme } = useTheme();
  return (
    <button className="w-[105px] h-6 rounded-xl flex justify-center items-center shadow-relief-12 dark:shadow-dm-relief-12 hover:shadow-relief-32 dark:hover:shadow-dm-relief-32">
      <Image src={`${theme !== 'dark' ? "/images/shopping-cart.svg" : "/images/dm-shopping-cart.svg"}`} width={10} height={8} alt="shopping cart" className='mr-3' />
      <span className='text-lm-text dark:text-nm-fill text-xs'>
        Add to Cart
      </span>
    </button>
  )
}


