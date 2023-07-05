"use client"

import { usePathname } from 'next/navigation'
import LinkedButton from "./linkedButtons.ui";

interface OptionProps {
  name: string,
  route: string
}

interface GeneralSectionProps {
  optionList: OptionProps[]
}

export default function SubHeader({ optionList }: GeneralSectionProps) {
  const pathname = usePathname()
  return (
    <div className="pr-16 pl-8 mt-14 ">
      <div className="rounded-xl">
        {/* Menu Header */}
        <div className="rounded-3xl px-5 py-7 w-full flex flex-col lg:flex-row justify-between items-center bg-nm-fill">
          {/* {Title(optionList)} */}
          <h1 className="text-nm-dm-icons font-bold rounded-2xl lg:text-3xl capitalize text-3xl mb-0">
            {pathname === '/metaverseexplorer'? "Heatmap" : pathname.replace("/metaverseexplorer/", "")}
          </h1>
          {/* Links Wrapper */}
          <div className="flex gap-5">
              {/* Links */}
              {
                optionList.map((option: OptionProps) => {
                  return (
                    <div key={option.name}>
                      <LinkedButton name={option.name} route={option.route} isActive={pathname == `/${option.route}`}/>
                    </div>
                  )
                })
              }
          </div>
        </div>
      </div>
    </div>
  )
}