import { formatName } from "../../../lib/utilities"
import Image from "next/image";

interface OptionProps {
  name: string
  creator: string
  nItems: number
  logo: string
  collection: string
}

interface CollectionsChoiseProps {
  options: OptionProps[],
  setCollection: Function
}

function cardList(options: OptionProps[], setCollection: Function) {

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    options.map(option => {
      return (
        <div
          key={option.name}
          onClick={() => { setCollection(option.collection) }}
          className={`grid grid-rows-3 rounded-xl cursor-pointer w-[240px] h-[360px] focus:outline-none nm-flat-hard  hover:nm-flat-soft transition duration-300 ease-in-out`}
        >
          <div className="w-full h-full relative row-span-2">
            <Image
              src={option.logo}
              loading='lazy'
              layout="fill"
              className="rounded-xl"
            />
          </div>
          <div className="w-full h-full flex flex-col items-center justify-around py-2">
            <div className="text-center">
              <p className='font-bold text-base leading-none'>{option.name}</p>
              <p className='font-light text-base'>by {option.creator}</p>
            </div>
            <p className='font-light text-sm text-grey-icon'>{formatter.format(option.nItems)} Items</p>
          </div>
        </div>
      )
    })
  )
}

export default function CollectionsChoise({ options, setCollection }: CollectionsChoiseProps) {
  return (
    <div className='flex justify-center gap-8 pt-10'>
      {cardList(options, setCollection)}
    </div>
  )
}
