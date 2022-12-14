import { formatName } from "../../../lib/utilities"
import Image from "next/image";

interface OptionProps {
  name: string,
  logo: string
}

interface CardChoiseProps {
  options: OptionProps[]
}

function cardList(options: OptionProps[]) {
  return (
    options.map(option => {
      return (
        <div
          key={option.name}
          onClick={() => { }}
          className={`flex flex-col items-center justify-center space-y-2 rounded-xl cursor-pointer pb-2 px-3 pt-4 w-[200px] h-[250px] focus:outline-none nm-flat-hard grayscale hover:grayscale-0 hover:nm-flat-soft transition duration-300 ease-in-out`}
        >
          <Image
            src={option.logo}
            width={100}
            height={100}
            loading='lazy'
            objectFit='cover'
          />
          <p className='text-grey-content font-plus font-normal text-lg md:text-lg pt-7'>
            {formatName(option.name)}
          </p>
        </div>
      )
    })
  )
}

export default function CardsChoise({ options }: CardChoiseProps) {
  return (
    <div className='flex justify-center gap-8 pt-10'>
      {cardList(options)}
    </div>
  )
}