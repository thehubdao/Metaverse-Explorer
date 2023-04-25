import Image from 'next/image'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from '../../state/shopCartList';
import { useAccount } from 'wagmi';

interface CartButtonProps {
  apiLand: any
}

const CartButton = ({ apiLand }: CartButtonProps) => {
  const dispatch = useDispatch();
  const { address } = useAccount();

  // Shop Cart List controller
  const shopList = useSelector((state: any) => state.shopCartList)
  const [isOnShopCartList, setIsOnListSection] = useState<boolean>();

  const handleShopCart = (action: 'add' | 'remove') => {
    if (action === 'add')
      dispatch(addToCart({ land: apiLand, address: address }))
    if (action === 'remove')
      dispatch(removeFromCart({ land: { apiLand }, address: address }))
  }

  useEffect(() => {
    const isOnShopCartListAux: boolean = shopList.list.find((land: any) => (land.tokenId === apiLand?.tokenId && land.metaverse === apiLand?.metaverse))
    setIsOnListSection(isOnShopCartListAux)
  }, [shopList.length, apiLand])

  return (
    <>
      <button
        className={`${isOnShopCartList ? 'nm-inset-medium' : 'nm-flat-medium hover:nm-flat-soft'} w-[160px] rounded-2xl py-3 mt-2 transition duration-300 ease-in-out text-xs font-semibold`}
        onClick={() => { handleShopCart(isOnShopCartList ? 'remove' : 'add') }}
      >
        <Image src={'/images/shopping-cart.svg'} width={15} height={12} alt="shopping cart" className='mr-3' />
        <span className='ml-3'>
          {isOnShopCartList ? 'REMOVE FROM CART' : 'ADD TO CART'}
        </span>
      </button>
    </>
  )
}

export default CartButton
