import React from 'react'

const Progress_bar = ({ progress }: { progress: number }) => {
  return (
    <div className='h-2 rounded-lg w-[100%] overflow-hidden m-auto bg-gray-400'>
      <div
        style={{ width: progress + '%' }}
        className='h-full transition-all bg-grey-content'
      ></div>
    </div>
  )
}

export default Progress_bar
