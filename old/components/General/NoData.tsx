import Image from "next/image"

interface Props {
  label: string
  imageSize?: number
  noMarginTop?: boolean
}

const NoData = ({ label, imageSize = 136, noMarginTop }: Props) => {
  return (
    <div className={`flex flex-col justify-center items-center ${!noMarginTop && 'mt-28'}`}>
      {/* Auth Button */}
      <Image
        src="/images/icons/error_icon.svg"
        width={imageSize}
        height={imageSize}
        loading='lazy'
        objectFit='cover'
      />
      <p className='text-grey-icon font-bold text-2xl pt-6'>{label}</p>
    </div>
  )
}

export default NoData