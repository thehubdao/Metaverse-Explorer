import { ReactNode } from "react"

interface OvalButtonProps {
  buttonFunction: Function
  label: string
  icon?: ReactNode
  backgroundColorClass?: string
}

export default function OvalButton({ buttonFunction, label, icon, backgroundColorClass }: OvalButtonProps) {
  return (
    <div
      className={`${backgroundColorClass} flex flex-row my-6 mx-8 px-12 py-3 rounded-2xl nm-flat-medium hover:nm-flat-soft duration-300 gap-2 cursor-pointer`}
      onClick={() => buttonFunction()}
    >
      {icon && icon}
      <p className="font-bold">{label}</p>
    </div>
  )
}