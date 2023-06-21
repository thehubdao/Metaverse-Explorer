import React, { useState, useEffect } from "react";
import Image from 'next/image'
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";

import ShopCartModal from "../components/General/ShopCartModal";
import { localStorageCharge } from "../state/shopCartList";

const ShoppingCart = () => {
  const [numItems, setNumItems] = useState(0);

	const [openShopCartModal, setOpenShopCartModal] = useState<boolean>(false)
  
  const shopList = useSelector((state: any) => state.shopCartList)
  const dispatch = useDispatch();
  const { address } = useAccount();

  useEffect(() => {
    try {
      const savedShoplist = JSON.parse(localStorage.getItem(`shoplist_${address}`) || '');
      if (savedShoplist) {
        dispatch(localStorageCharge(savedShoplist))
      }
    } catch (error) {
      console.warn(error)
    }
  }, [address])

  useEffect(() => {
    setNumItems(shopList.length)
  }, [shopList.length])

  function handleClick() {
    setOpenShopCartModal(true)
  }

  return (
    <>
      <button onClick={handleClick} className='relative flex flex-col mr-11 mt-6 items-center justify-center rounded-xl cursor-pointer p-2 w-12 h-12 group focus:outline-none bg-[#F9FAFB] shadow-xl'>
        <Image src={'/images/shopping-cart.svg'} width={30} height={26} alt="shopping cart"/>
        {/* {numItems} */}
        <p className="absolute bg-[#1AB3F3] text-white text-xs font-bold px-[6px] rounded-md bottom-[6px] right-[6px]">{numItems ? numItems : ''}</p>
      </button>

      {openShopCartModal && <ShopCartModal setOpenSpecificModal={setOpenShopCartModal} />}
    </>
  );
}

export default ShoppingCart;