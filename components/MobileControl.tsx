import Image from "next/image";
import Link from "next/link";
import { AiOutlineMedium } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { RiInstagramFill, RiLinkedinBoxFill, RiTwitterFill } from "react-icons/ri";

function Button({ url, icon, label}: any) {
    return (
      <Link href={url}>
        <div className={`flex rounded-lg items-center justify-center nm-flat-hard bg-gradient-to-b from-grey-dark cursor-pointer p-4`}>
          {!label ? (<div className="text-4xl">{icon}</div>) : (<div className="text-lg font-bold">{label}</div>)}
        </div>
      </Link>
    )
  }

export default function MobileControl() {


    return (
        <div className="flex flex-col items-center justify-around font-plus text-grey-content w-screen h-screen">
            <div className="">
                <Image
                    src="/images//mgh_logo/mgh_logo.svg"
                    width={105}
                    height={101}
                    loading='lazy'
                    objectFit='cover'
                />
            </div>
            <div className="text-center px-3">
                <h2 className="font-semibold text-xl">Come back from desktop</h2>
                <h2 className="font-normal text-lg">This tool is only available on desktop, Please visit us from your dekstop browser to gain access.</h2>
            </div>
            <div className="grid grid-cols-4 gap-y-4 gap-x-2  text-center px-3">
                <div className="col-span-4"><Button label="Back to MGH Website" url="https://www.metagamehub.io/"/></div>
                <Button url="https://www.instagram.com/metagamehub_dao/" icon={<RiInstagramFill/>}/>
                <Button url="https://twitter.com/MGH_DAO?s=09" icon={<RiTwitterFill/>}/>
                <Button url="https://www.linkedin.com/company/metagamehub-dao" icon={<RiLinkedinBoxFill/>}/>
                <Button url="https://metagamehub.medium.com/" icon={<AiOutlineMedium/>}/>
            </div>
        </div>
    )
}