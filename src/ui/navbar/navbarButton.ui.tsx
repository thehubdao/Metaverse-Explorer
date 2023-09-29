import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";

interface ButtonProps {
  url: string;
  label: string;
  icon: string;
  isExternal: boolean;
  active?: boolean;
}

export default function NavButton({ url, label, icon, isExternal, active }: ButtonProps) {
  return (
    <Link href={url} target={isExternal ? '_blank' : ''}>
      <div className="flex flex-col items-center justify-center">
        <Tooltip title={label} placement="right">
          <div className={`${active ? 'shadow-hollow-8 dark:shadow-dm-hollow-8' : 'shadow-relief-16 hover:shadow-relief-12 dark:shadow-dm-relief-16 hover:dark:shadow-dm-relief-12'} flex items-center justify-center w-12 h-12 rounded-xl bg-lm-fill dark:bg-nm-dm-fill bg-opacity-60 cursor-pointer transition duration-300 ease-in-out`}>
            <div className={`font-icons text-3xl  ${active ? 'text-lm-text dark:text-nm-remark' : 'text-nm-dm-remark'}`}>{icon}</div>
          </div>
        </Tooltip>
        <p className="mt-2 mb-4 font-semibold block lg:hidden">{label}</p>
      </div>
    </Link>
  );
}
