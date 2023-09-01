import Image from "next/image";
import Link from "next/link";

export default function MobileUI() {
  return (
    <div className="flex flex-col items-center justify-around  text-lm-text w-screen h-screen">
      <div>
        <Image src="/images//mgh_logo/mgh_logo.svg" width={105} height={101} alt="the hub logo" />
      </div>
      <div className="text-center px-3">
        <h2 className="font-semibold text-xl">Come back from desktop</h2>
        <h2 className="font-normal text-lg">This tool is only available on desktop, Please visit us from your dekstop browser to gain access.</h2>
      </div>
      <div className="flex">
        <Link href='https://thehubdao.xyz'>
          <div className="flex rounded-lg items-center justify-center shadow-relief-12 hover:shadow-relief-32 cursor-pointer p-4">
            <p className="text-2xl font-semibold">Back to THE HUB Website</p>
          </div>
        </Link>
      </div>
    </div>
  )
}