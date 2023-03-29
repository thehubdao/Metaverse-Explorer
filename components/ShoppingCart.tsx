import React, { useState, useEffect } from "react";
import { Alert, Snackbar } from '@mui/material'
import Image from 'next/image'

function ShoppingCart() {
  const [numItems, setNumItems] = useState(0);
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    // Fetch the number of items in the shopping cart from your API
    fetch("/api/shopping-cart")
      .then((response) => response.json())
      .then((data) => setNumItems(data.numItems))
      .catch((error) => console.error(error));
  }, []);

  function handleClick() {
    setOpenNotification(true)
  }

  const handleClose = (event?: React.SyntheticEvent | Event,) => {
    setOpenNotification(false);
  };

  return (
    <>
      <button onClick={handleClick} className='flex flex-col  mx-8 mt-6 items-center justify-center rounded-2xl cursor-pointer p-2 w-16 h-16 group focus:outline-none bg-[#F9FAFB] shadow-xl'>
        <Image src={ '/images/shopping-cart.svg'} width={30} height={26} alt="shopping cart" className=''/>
        {/* {numItems} */}
      </button>
      <Snackbar
      open={openNotification}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
        This function is currently on development
      </Alert>
    </Snackbar>
    </>
  );
}

export default ShoppingCart;