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
      <button onClick={handleClick} className='relative flex flex-col mr-11 mt-6 items-center justify-center rounded-xl cursor-pointer p-2 w-12 h-12 group focus:outline-none bg-[#F9FAFB] shadow-xl'>
        <Image src={'/images/shopping-cart.svg'} width={30} height={26} alt="shopping cart" className='' />
        {/* {numItems} */}
        <p className="absolute bg-[#1AB3F3] text-white text-xs font-bold px-[6px] rounded-md bottom-[6px] right-[6px]">{numItems ? numItems : ''}</p>
      </button>
    </>
  );
}

export default ShoppingCart;