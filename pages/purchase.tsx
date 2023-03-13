import React, { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { AiFillCheckCircle } from 'react-icons/ai'
import Chatbot from 'react-chatbot-kit'
import Image from 'next/image'

import { Plans } from '../lib/enums'

import Footer from '../components/General/Footer'
import { PurchaseCoinValues } from '../types/Purchase/purchaseTypes'

// Chatbot initials
import { configB2c } from '../lib/chatbot/config-chatbot'
import { ActionProviderB2c } from '../lib/chatbot/ActionProvider'
import MessageParser from '../lib/chatbot/MessageParser'

const features = [
  "Unlimited Valuations",
  "All Heatmaps Filters",
  "Advanced Portfolio Features"
]

const Purchase: NextPage<{ coinValues: PurchaseCoinValues }> = ({
  coinValues,
}) => {

  const [endDate, setEndDate] = useState("12.12.2022")
  const [activePlan, setActivePlan] = useState(Plans.PREMIUM)
  const [selection, setSelection] = useState<Plans | undefined>(undefined)


  return (
    <>
      <Head>
        <title>MGH | Purchase</title>
        <meta name='description' content='Purchase VIP Status' />
      </Head>

      {
        selection
          ? (<div className="h-screen w-full flex justify-center items-center pt-24">
            <div className="grid grid-cols-2 max-w-7xl min-h-[650px]">
              <div className="relative w-full h-full">
                <Image
                  src="/images/cyberspace-3.svg"
                  loading="lazy"
                  layout="fill"
                />
              </div>
              <div className="h-full w-full flex flex-col justify-center items-center text-black">
                <h2 className="text-4xl text-center font-bold">
                  Metaverse Analytics API powered by the MGH DAO AI
                </h2>
                {
                  <div className="py-3 px-14 my-3 nm-flat-soft rounded-2xl mb-10">
                    <p>
                      Suscription Status:
                      <span className="font-bold">
                        {' '}
                        Active until xx.xx.xxxx
                      </span>
                    </p>
                  </div>
                }
                <Chatbot
                  actionProvider={ActionProviderB2c}
                  messageParser={MessageParser}
                  config={configB2c as any}
                />
              </div>
            </div>
          </div>)
          : (<>
            {/* Top Padding or Image */}
            <div className={`relative p-0 mb-8 w-full h-[400px]`}>
              <Image
                src="/images/land_header.png"
                objectFit={'cover'}
                alt='land header'
                layout="fill"
              />
            </div>

            <div className='flex flex-col space-y-10'>
              <h1 className='text-center md:text-4xl lg:text-5xl text-3xl green-text-gradient mb-8 mt-20'>
                Unlock premium Metaverse Tools!
              </h1>

              <div className='w-full flex space-x-10 items-center justify-center'>
                <div className='flex items-center space-x-3'>
                  <p>Active Plan</p>
                  <p className='bg-gray-200 rounded-full px-2 py-1 font-bold'>{activePlan}</p>
                </div>

                <div className='flex items-center space-x-3'>
                  <p>Active Until</p>
                  <p className='bg-red-200 rounded-full px-2 py-1 font-bold'>{endDate}</p>
                </div>
              </div>

              <div className='flex items-center justify-center space-x-10 xl:space-x-20 py-20'>
                <div className={`flex flex-col items-center p-10 bg-gray-50 rounded-xl h-96 shadow-2xl max-w-xs w-1/3 hover:scale-105 transition ease-in-out duration-300 ${selection === Plans.BASIC && "border border-black"}`}>
                  <p className='text-xl font-bold'>{Plans.BASIC}</p>
                  <div className='h-full'></div>
                  <div className='flex space-x-1'>
                    <p className='text-xl pt-1'>$</p>
                    <p className='text-7xl font-bold'>10</p>
                  </div>
                  <p className='text-2xl font-light'>USD per month</p>
                  <div className='h-full'></div>
                  <div onClick={() => setSelection(Plans.BASIC)} className="rounded-full hover:cursor-pointer hover:bg-gray-600 hover:text-white px-4 py-2 border border-black text-center w-full">Subscribe</div>
                </div>

                <div className={`flex flex-col items-center p-10 bg-gray-50 rounded-xl h-96 shadow-2xl max-w-xs w-1/3 hover:scale-105 transition ease-in-out duration-300 ${selection === Plans.PREMIUM && "border border-black"}`}>
                  <p className='text-xl font-bold'>{Plans.PREMIUM}</p>
                  <div className='h-full'></div>
                  <div className='flex space-x-1'>
                    <p className='text-xl pt-1'>$</p>
                    <p className='text-7xl font-bold'>21</p>
                  </div>
                  <p className='text-2xl font-light'>USD per 3 month</p>
                  <div className='h-full'></div>
                  <p className='rounded-xl bg-red-500 px-5 py-1 text-white mb-3'>Save 30%</p>
                  <div onClick={() => setSelection(Plans.PREMIUM)} className="rounded-full hover:cursor-pointer hover:bg-gray-600 hover:text-white px-4 py-2 border border-black text-center w-full">Subscribe</div>
                </div>

                <div className={`flex flex-col items-center p-10 bg-gray-50 rounded-xl h-96 shadow-2xl max-w-xs w-1/3 hover:scale-105 transition ease-in-out duration-300 ${selection === Plans.PRO && "border border-black"}`}>
                  <p className='text-xl font-bold'>{Plans.PRO}</p>
                  <div className='h-full'></div>
                  <div className='flex space-x-1'>
                    <p className='text-xl pt-1'>$</p>
                    <p className='text-7xl font-bold'>60</p>
                  </div>
                  <p className='text-2xl font-light'>USD per year</p>
                  <div className='h-full'></div>
                  <p className='rounded-xl bg-yellow-400 px-5 py-1 text-white mb-3'>Save 50%</p>
                  <div onClick={() => setSelection(Plans.PRO)} className="rounded-full hover:cursor-pointer hover:bg-gray-600 hover:text-white px-4 py-2 border border-black text-center w-full">Subscribe</div>
                </div>
              </div>

              <div className='flex items-center justify-center mt-10'>
                <div className='bg-gray-50 rounded flex flex-col p-14 pr-20'>
                  <p className='text-2xl font-bold mb-4'>Key Features</p>
                  {features.map((feature: string) => (
                    <div className='flex items-center space-x-2 mt-2'>
                      <AiFillCheckCircle className='text-sm' />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>

                <div className='bg-gray-50 rounded-xl flex flex-col p-5 shadow-lg'>
                  <img src="images/heatmap.png" className='h-96' />
                </div>
              </div>

              <Footer
                label='The MGH DAO does not provide, personalized investment
        recommendations or advisory services. Any information provided
        through the land evaluation tool and others is not, and should not
        be, considered as advice of any kind and is for information
        purposes only. That land is “valuated” does not mean, that it is
        in any way approved, checked audited, and/or has a real or correct
        value. In no event shall the MGH DAO be liable for any special,
        indirect, or consequential damages, or any other damages of any
        kind, including but not limited to loss of use, loss of profits,
        or loss of data, arising out of or in any way connected with the
        use of or inability to use the Service, including without
        limitation any damages resulting from reliance by you on any
        information obtained from using the Service.'
              />

            </div>
          </>)
      }
    </>
  )
}
export async function getServerSideProps() {
  // Using wmatic instead of matic cause coingecko isn't working for matic..
  const coinRes = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cthe-sandbox%2Cdecentraland%2Cocean-protocol%2Cmetagamehub-dao%2Cwmatic%2Cusd-coin%2Ctether%2Csomnium-space-cubes&vs_currencies=usd`
  )
  const coinValues = (await coinRes.json()) as PurchaseCoinValues
  return {
    props: {
      coinValues,
    },
  }
}

export default Purchase
