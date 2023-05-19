import Image from "next/image"

const NoLands = () => {
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
      <p className='text-grey-title font-normal text-3xl pt-6'>you have no LANDs on this metaverse</p>
    </div>
  )
}

export default NoLands