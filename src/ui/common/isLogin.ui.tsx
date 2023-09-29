import Image from "next/image";
import ConnectButtonUI from "./connectButton.ui";

interface IsLoginUIPros {
  message?: string;
}
export default function IsLoginUI({ message }: IsLoginUIPros) {
  return (
    <div className="flex flex-col justify-center items-center mt-28 rounded-2xl bg-lm-fill dark:bg-nm-dm-fill py-40">
    <Image
      src="/images/mgh_logo/mgh_logo.svg"
      width={136}
      height={131}
      alt="the hub dao logo"
    />
    <p className='text-nm-dm-remark dark:text-nm-highlight font-semibold text-xl lg:text-2xl pt-6 px-5'>{message}</p>
    <ConnectButtonUI />
  </div>
  )
}