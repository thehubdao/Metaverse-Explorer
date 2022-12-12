import { ReactNode } from "react"

interface WhiteOvalButtonProps {
  buttonFunction: Function
  label: string
  icon: ReactNode
}

export default function WhiteOvalButton({ buttonFunction, label, icon }: WhiteOvalButtonProps) {
  return (
    <div
      className="flex flex-row m-8 px-12 py-3 bg-white rounded-2xl nm-flat-medium gap-2 cursor-pointer"
      onClick={() => buttonFunction()}
    >
      {icon && icon}
      <p className="font-bold">{label}</p>
    </div>
  )
}