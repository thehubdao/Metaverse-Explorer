import Image from 'next/image'

interface OptionCardProps {
  item: {
    title: string
    description: string
    imageUrl: string
    option: string
  }
  setStakeSelected: Function
}

const OptionCard = ({ item, setStakeSelected }: OptionCardProps) => {
  const { title, description, imageUrl, option } = item

  return (
    <button
      onClick={() => { setStakeSelected(option) }}
      className='max-w-xs flex flex-col items-center h-full nm-flat-medium p-5 rounded-2xl'
    >
      <Image
        src={imageUrl}
        width={240}
        height={240}
      />
      <h3 className="text-grey-content  font-bold text-xl sm:text-3xl pt-5">{title}</h3>
      <p className="text-grey-content  font-light text-sm leading-5 sm:text-xl pt-3">{description}</p>
    </button >

  )
}

export default OptionCard