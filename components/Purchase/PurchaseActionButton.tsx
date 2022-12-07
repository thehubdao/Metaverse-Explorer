import React from 'react'

const PurchaseActionButton = ({
  onClick,
  text,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  text: string
}) => {
  return (
    <button
      onClick={onClick}
      className='z-30 disabled:opacity-50 disabled:hover:shadow-dark disabled:cursor-default mt-4 relative flex justify-center items-center  transition ease-in-out duration-500 shadow-dark rounded-xl w-full max-w-md py-3 sm:py-4 group'
    >
      <div className='h-full w-full absolute bg-gradient-to-br transition-all ease-in-out duration-300 from-pink-600 to-blue-500 rounded-xl opacity-60 group-hover:opacity-80' />
      <span className='pt-1 z-10 text-gray-200 font-medium text-lg sm:text-xl'>
        {text}
      </span>
    </button>
  )
}

export default PurchaseActionButton
