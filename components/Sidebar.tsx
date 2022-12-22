import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ScrollBar from "./ScrollBar";

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

interface Isidebar {
  list: ListProps[]
}

function Button({ url, label, icon, active }: ButtonProps) {
  return (
    <Link href={url}>
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${active ? 'nm-flat-inset-medium border-white border' : 'nm-flat-medium'} bg-white bg-opacity-60 cursor-pointer`}>
        <div className="font-icons text-3xl">{icon}</div>
        <div className="hidden text-sm">{label}</div>
      </div>
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

export default function Sidebar({ list }: Isidebar) {
  const router = useRouter();

  // Scrollbar Controller
  const parentRef = useRef<HTMLDivElement>(null)
  const [parentDom, setParentDom] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    setParentDom(parentRef.current)
    console.log(parentRef.current?.offsetHeight)
  }, [parentRef.current, parentRef.current?.offsetHeight])

  return (
    <div className="bg-grey-sidebar">
      <Link href={"/"}>
        <div className="flex justify-center items-center h-[20vh]">
          <Image
            src="/images/mgh_logo.svg"
            width={64}
            height={64}
            loading='lazy'
            objectFit='cover'
          />
        </div>
      </Link>
      <div className="h-[80vh] overflow-y-scroll hidescroll pt-6 pb-10 relative" ref={parentRef}>
        {parentDom && <ScrollBar parentDom={parentDom} />}
        <div className="flex flex-col space-y-4 items-center">
          {createMenu(list, router.pathname)}
        </div>
      </div>
      <div className="w-full h-6 absolute top-[20vh] left-0 bg-gradient-to-b from-grey-sidebar pointer-events-none"></div>
      <div className="w-full h-6 absolute bottom-0 left-0 bg-gradient-to-t from-grey-sidebar pointer-events-none"></div>
    </div>
  )
}