import Image from 'next/image'

export default function CartButtonUI() {

  return (
    <button className="w-[105px] h-6 rounded-xl flex justify-center items-center shadow-relief-12 hover:shadow-relief-32">
      <Image src={'/images/shopping-cart.svg'} width={10} height={8} alt="shopping cart" className='mr-3' />
      <span className='text-lm-text text-xs'>
        Add to Cart
      </span>
    </button>
  )
}


