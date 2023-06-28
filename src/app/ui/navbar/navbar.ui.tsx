"use client"

import Image from "next/image";
import Link from "next/link";
import NavButton from "./navbarButton.ui";

interface ListProps {
  url: string,
  label: string,
  icon: string,
  isExternal: boolean
}

interface SidebarProps {
  list: ListProps[]
}



function createMenu(list: ListProps[]) {
  return (
    list.map((item: ListProps, index: number) => {
      return (
        <div key={index}>
          <NavButton url={item.url} label={item.label} icon={item.icon} isExternal={item.isExternal}/>
        </div>
      )
    })
  )
}

export default function NavbarUI({ list }: SidebarProps){
    return(
        <>
            <Link href={"/metaverseexplorer"}>
                <div className="w-full flex justify-center items-center mt-11">
                    <Image src="/images/mgh_logo/mgh_logo.svg" width={65} height={61} alt="The Hub Dao logo"/>
                </div>
            </Link>
            <div className="h-[80vh] flex justify-center items-center overflow-y-scroll hidescroll py-10 relative">
                <div className="flex flex-col space-y-4 items-center">
                {createMenu(list)}
                </div>
            </div>
        </>
    )
}