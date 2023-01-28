import Link from "next/link";
import { formatName } from "../lib/utilities";

interface OptionProps {
  name: string,
  route: string
}

interface GeneralSectionProps {
  sectionTitle: string
  optionList: OptionProps[]
  children: React.ReactNode
  backgroundClass: string
}

function linkedButtons(optionList: OptionProps[]) {
  return (
    optionList.map((option: OptionProps) => {
      return (
        <Link key={option.name} href={`/${option.route}`}>
          {/* Oval Button */}
          <div className="px-8 py-2 flex items-center justify-center rounded-3xl nm-flat-medium cursor-pointer">
            <p className="pt-1 font-bold font-plus text-grey-content text-xl">
              {formatName(option.name)}
            </p>
          </div>
        </Link>
      )
    })
  )
}

export default function GeneralSection({ sectionTitle, optionList, children, backgroundClass }: GeneralSectionProps) {
  return (
    <>
      {/* Top Header */}
      <div className="px-8">
        <div className={`${backgroundClass} rounded-xl`}>
          {/* Menu Header */}
          <div className="border-t border-l border-white/10 rounded-xl p-5 w-full bg-opacity-30; flex flex-col lg:flex-row justify-between items-center bg-grey-dark">
            <h1 className="text-grey-content font-plus font-bold rounded-2xl lg:text-3xl text-3xl  mb-0">
              {sectionTitle}
            </h1>
            {/* Links Wrapper */}
            <div className="flex gap-5">
              {/* Links */}
              {linkedButtons(optionList)}
            </div>
          </div>
          {/* Main Body */}
          <div>{children}</div>
        </div>
      </div>
    </>
  )
}