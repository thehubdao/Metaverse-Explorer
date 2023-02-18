import React from 'react'

const FreeValuation = () => {

  return (
    <>
      <div className='flex flex-col'>
        <p className={`text-lg xl:text-xl font-medium text-grey-content font-plus mb-4`}>
          Free Valuation:{' '}
        </p>
        <div className='flex flex-col items-start border-t border-l border-white/10 rounded-xl p-10 w-full h-auto bg-grey-panel'>

          <div className='flex flex-col'>
            <p className='text-grey-content font-plus text-xl font-light pb-2'>You can have</p>
            <p className='text-grey-content font-plus font-bold text-3xl tracking-wide'>5 free valuations</p>
            <p className='text-grey-content font-plus font-light text-xl pt-2'>after that pro version is needed</p>
          </div>
        </div>
      </div>

    </>
  )
}

export default FreeValuation
