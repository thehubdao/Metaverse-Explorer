import { Alert, Snackbar } from '@mui/material'
import React, { useState, useEffect } from "react";
import Image from 'next/image'

const CartButton = () => {
    const [openNotification, setOpenNotification] = useState(false);

    function handleClick() {
        setOpenNotification(true)
    }
    const handleClose = (event?: React.SyntheticEvent | Event,) => {
        setOpenNotification(false);
    };

  return (
    <>
      <button
        onClick={handleClick}
        className="w-3/4 text-black rounded-3xl  text-sm font-normal nm-flat-medium hover:nm-flat-soft"
      >
        <Image src={ '/images/shopping-cart.svg'} width={10} height={8} alt="shopping cart" className=''/>
        {'Add To Cart'}
      </button>
      <div className='w-full flex justify-center'>
        <Snackbar
          open={openNotification}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          This function is currently on development
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}

export default CartButton
