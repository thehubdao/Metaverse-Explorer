import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";


interface ButtonProps {
url:string,
label: string,
icon: string,
isExternal: boolean,
active: boolean
}

export default function NavButton({ url, label, icon, isExternal, active }: ButtonProps) {
    return (
      <Link href={url} target={isExternal? '_blank': ''}>
          <Tooltip title={label} placement="right">
            <div className={`${active ? 'shadow-inset' : 'shadow-relief-16 hover:shadow-relief-12'} flex items-center justify-center w-12 h-12 rounded-xl bg-nm-fill bg-opacity-60 cursor-pointer transition duration-300 ease-in-out`}>
              <div className={`font-icons text-3xl  ${active ? 'text-nm-dm-icons' : 'text-nm-dm-remark'}`}>{icon}</div>
            </div>
          </Tooltip>
      </Link>
    )
  }