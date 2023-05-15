import Image from 'next/image'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from '../../state/shopCartList';
import { useAccount } from 'wagmi';

interface CartButtonProps {
  landData: any
  textSize?: string | 'xs' | 'sm' | 'lg' | 'xl' | '2xl'
  classname?: string
  addIcon?: boolean
}

const CartButton = ({ landData, addIcon, textSize, classname }: CartButtonProps) => {
  const dispatch = useDispatch();
  const { address } = useAccount();

  // Shop Cart List controller
  const shopList = useSelector((state: any) => state.shopCartList)
  const [isOnShopCartList, setIsOnListSection] = useState<boolean>(false);

  const handleShopCart = (action: 'add' | 'remove') => {
    if (action === 'add')
      dispatch(addToCart({ land: landData, address: address }))
    if (action === 'remove')
      dispatch(removeFromCart({ land: landData, address: address }))
  }

  useEffect(() => {
    const isOnShopCartListAux: boolean = shopList.list.find((land: any) => (land.tokenId === landData?.tokenId && land.metaverse === landData?.metaverse))
    setIsOnListSection(isOnShopCartListAux)
  }, [shopList.length, landData])

  return (
    <button
      className={`${isOnShopCartList ? 'nm-inset-medium text-grey-content' : 'nm-flat-medium hover:nm-flat-soft text-black'} w-full m-auto rounded-2xl flex justify-center items-center transition duration-300 ease-in-out text-${textSize} ${classname}`}
      onClick={() => { handleShopCart(isOnShopCartList ? 'remove' : 'add') }}
    >
      {addIcon && <Image src={'/images/shopping-cart.svg'} width={15} height={12} alt="shopping cart" className='mr-3' />}
      <span className='ml-3'>
        {isOnShopCartList ? 'REMOVE FROM CART' : 'ADD TO CART'}
      </span>
    </button>
  )
}

export default CartButton
