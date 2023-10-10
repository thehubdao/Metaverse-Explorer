import Image from "next/image";
import ConnectButtonUI from "./connectButton.ui";

interface IsLoginUIPros {
  message?: string;
}
export default function IsLoginUI({ message }: IsLoginUIPros) {
  return (
    <div className="flex flex-col justify-center items-center mt-14 lg:mt-28 rounded-2xl bg-lm-fill dark:bg-nm-dm-fill py-20 lg:py-40">
    <Image
      src="/images/mgh_logo/mgh_logo.svg"
      width={136}
      height={131}
      alt="the hub dao logo"
    />
    <p className='text-nm-dm-remark dark:text-nm-highlight font-semibold text-xl lg:text-2xl py-6 px-5 text-center'>{message}</p>
    <ConnectButtonUI />
  </div>
  )
}