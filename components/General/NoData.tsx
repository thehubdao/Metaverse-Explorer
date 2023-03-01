import Image from "next/image"

interface Props {
  label: string
}

const NoData = ({ label }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center mt-28">
      {/* Auth Button */}
      <Image
        src="/images//mgh_logo/mgh_logo.svg"
        width={136}
        height={131}
        loading='lazy'
        objectFit='cover'
      />
      <p className='text-grey-icon font-bold text-2xl pt-6'>{label}</p>
    </div>
  )
}

export default NoData