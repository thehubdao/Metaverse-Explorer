import Image from "next/image";

const CommingSoon = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen gap-6">
      <Image src='/images//mgh_logo/mgh_logo.svg' width={100} height={100} />
      <h2 className="font-bold text-xl">Coming soon!</h2>
    </div>
  )
}

export default CommingSoon