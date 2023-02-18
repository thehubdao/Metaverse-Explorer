import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ScrollBar from "./ScrollBar";
import Tooltip from "@mui/material/Tooltip";

interface ButtonProps {
  url: string
  label: string
  icon: string
  active: boolean
}

interface ListProps {
  url: string,
  label: string,
  icon: string
}

interface SidebarProps {
  list: ListProps[]
}

function Button({ url, label, icon, active }: ButtonProps) {
  return (
    <Link href={url}>
      <Tooltip title={label} placement="right">
        <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${active ? 'nm-flat-inset-medium border-white border' : 'nm-flat-medium'} bg-white bg-opacity-60 cursor-pointer`}>
          <div className="font-icons text-3xl">{icon}</div>
        </div>
      </Tooltip>
    </Link>
  )
}

function createMenu(list: ListProps[], router: string) {
  return (
    list.map((item: ListProps, index: number) => {
      return (
        <div key={index}>
          <Button url={item.url} label={item.label} icon={item.icon} active={router == item.url} />
        </div>
      )
    })
  )
}

export default function Sidebar({ list }: SidebarProps) {
  const router = useRouter();

  // Scrollbar Controller
  const parentRef = useRef<HTMLDivElement>(null)
  const [parentDom, setParentDom] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    setParentDom(parentRef.current)
  }, [parentRef.current])

  return (
    <div className="bg-grey-dark relative">
      <Link href={"/valuation"}>
        <div className="absolute w-full flex justify-center items-center top-6">
          <Image
            src="/images//mgh_logo/mgh_logo.svg"
            width={58}
            height={54}
            loading='lazy'
            objectFit='cover'
          />
        </div>
      </Link>
      <div className="h-[15vh]" />
      <div className="h-[70vh] flex justify-center items-center overflow-y-scroll hidescroll py-10 relative" ref={parentRef}>
        {parentDom && <ScrollBar parentDom={parentDom} />}
        <div className="flex flex-col space-y-4 items-center">
          {createMenu(list, router.pathname)}
        </div>
      </div>
      <div className="h-[15vh]" />
      <div className="w-full h-6 absolute top-[15vh] left-0 bg-gradient-to-b from-grey-dark pointer-events-none"></div>
      <div className="w-full h-6 absolute bottom-[15vh] left-0 bg-gradient-to-t from-grey-dark pointer-events-none"></div>
    </div>
  )
}