import React from 'react'
import { Loader } from '..'

const ChartLoader = () => {
  return (
    <>
      <div className='absolute z-[60] top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
        <Loader color='' size={100}/>
      </div>
      <div className='absolute w-full h-full z-50 bg-white bg-opacity-90' />
    </>
  )
}

export default ChartLoader
