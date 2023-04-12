import React, { useState, useEffect } from "react";
import { Alert, Snackbar } from '@mui/material'
import Image from 'next/image'
import { useSelector } from "react-redux";

interface Props {
  setOpenShopCartModal: Function
}

const ShoppingCart = ({ setOpenShopCartModal }: Props) => {
  const [numItems, setNumItems] = useState(0);
  
  const shopList = useSelector((state: any) => state.shopCartList)

  useEffect(() => {
    setNumItems(shopList.length)
  }, [shopList.length])

  function handleClick() {
    setOpenShopCartModal(true)
  }

  return (
    <>
<<<<<<< HEAD
      <button onClick={handleClick} className='relative flex flex-col mx-8 mt-6 items-center justify-center rounded-2xl cursor-pointer p-2 w-16 h-16 group focus:outline-none bg-[#F9FAFB] shadow-xl'>
        <Image src={'/images/shopping-cart.svg'} width={30} height={26} alt="shopping cart" className='' />
=======
      <button onClick={handleClick} className='flex flex-col  mx-10 mt-6 items-center justify-center rounded-xl cursor-pointer p-2 w-12 h-12 group focus:outline-none bg-[#F9FAFB] shadow-xl'>
        <Image src={ '/images/shopping-cart.svg'} width={30} height={26} alt="shopping cart" className=''/>
>>>>>>> dev
        {/* {numItems} */}
        <p className="absolute bg-[#1AB3F3] text-white text-sm font-bold px-2 rounded-md bottom-2 right-2">{numItems ? numItems : ''}</p>
      </button>
    </>
  );
}

export default ShoppingCart;