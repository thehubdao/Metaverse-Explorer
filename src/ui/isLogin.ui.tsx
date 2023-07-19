import Image from "next/image";
import ConnectButtonUI from "./connectButton.ui";

interface IsLoginUIPros{
    message?: string
}
export default function IsLoginUI({message}: IsLoginUIPros) {
    return(
        <div className="flex flex-col justify-center items-center mt-28">
            <Image
                src="/images/mgh_logo/mgh_logo.svg"
                width={136}
                height={131}
                alt="the hub dao logo"
            />
            <p className='text-nm-dm-remark font-light text-2xl pt-6'>{message}</p>
            <ConnectButtonUI />
        </div>
    )
}