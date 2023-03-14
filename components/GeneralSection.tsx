import Link from "next/link";
import { formatName } from "../lib/utilities";
import { useRouter } from "next/router";

interface OptionProps {
  name: string,
  route: string
}

interface GeneralSectionProps {
  sectionTitle: string
  optionList: OptionProps[]
  children: React.ReactNode
  backgroundClass?: string
}

function linkedButtons(optionList: OptionProps[]) {
  const router = useRouter();

  return (
    optionList.map((option: OptionProps) => {
      return (
        <Link key={option.name} href={`/${option.route}`}>
          {/* Oval Button */}
          <div className={`${router.pathname == `/${option.route}` ? 'nm-inset-medium' : 'nm-flat-medium hover:nm-flat-soft border border-white'} px-8 py-2 flex items-center justify-center rounded-3xl cursor-pointer bg-grey-bone transition ease-in-out duration-300`}>
            <div className="pt-1 font-bold font-plus text-grey-content text-base">
              {formatName(option.name, true)}
            </div>
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
      <div className="px-16">
        <div className={`${backgroundClass} rounded-xl`}>
          {/* Menu Header */}
          <div className="border-t border-l border-white/10 rounded-3xl p-5 w-full bg-opacity-30; flex flex-col lg:flex-row justify-between items-center bg-grey-dark">
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