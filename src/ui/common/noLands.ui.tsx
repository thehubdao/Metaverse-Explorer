
import Image from "next/image";
import BuyButtonUI from "./buyButton.ui";

export default function NolandsUI() {
  return (
    <div className="flex flex-col justify-center items-center mt-28">
      <Image
        src="/images/mgh_logo/mgh_logo.svg"
        width={136}
        height={131}
        alt="the hub dao logo"
      />
      <p className='text-nm-dm-remark dark:text-lm-text-gray font-light text-2xl pt-6'>you have no LANDs on this metaverse</p>
      <BuyButtonUI />
    </div>
  )
}