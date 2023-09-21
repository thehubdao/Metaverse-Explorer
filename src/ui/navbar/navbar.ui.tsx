"use client"

import Image from "next/image";
import Link from "next/link";
import NavButton from "./navbarButton.ui";

interface ListProps {
  url: string;
  label: string;
  icon: string;
  isExternal: boolean;
}

interface SidebarProps {
  list: ListProps[];
  route: string;
}

export default function NavbarUI({ list, route }: SidebarProps){
  return(
    <nav className={`bg-lm-fill dark:bg-nm-black row-span-2 h-screen w-[143px] fixed inset-0`}>
      <Link href={"/metaverseexplorer"}>
          <div className="w-full flex justify-center items-center mt-11">
              <Image src="/images/mgh_logo/mgh_logo.svg" width={65} height={61} alt="The Hub Dao logo"/>
          </div>
      </Link>
      <div className="h-[80vh] flex justify-center items-center overflow-y-scroll hidescroll py-10 relative">
          <div className="flex flex-col space-y-4 items-center">
            {
              list.map((option: ListProps) => {
                return(
                  <div key={option.label}>
                    <NavButton url={option.url} label={option.label} icon={option.icon} isExternal={option.isExternal} active={route.includes(option.url)}/>
                  </div>
                )
              })
            }
          </div>
      </div>
    </nav>
  )
}