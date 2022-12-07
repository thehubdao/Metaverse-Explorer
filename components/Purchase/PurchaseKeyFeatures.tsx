import React from 'react'

const PurchaseKeyFeatures = () => {
  const features = [
    'Portfolio Valuation',
    'Valuation of Estates',
    'Metaverse Heatmap',
    'Metaverse Analytics',
    'And more...',
  ]
  return (
    <>
      <div className='flex flex-col lg:flex-row justify-between items-center mb-16 gap-4'>
        {/* Features wrapper */}
        <div className='w-fit m-auto'>
          <h3 className='text-3xl mb-8'>Key Features</h3>
          {/* Features */}
          <ul className='list-disc pl-8 flex flex-col gap-2 font-medium'>
            {features.map((feature) => (
              <li className='text-2xl text-left' key={feature}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        {/* Looping Video */}
        <video className='w-2/4' autoPlay loop muted controls>
          <source src='/videos/heatmap-video.mp4' type='video/mp4' />
        </video>
      </div>
    </>
  )
}

export default PurchaseKeyFeatures
