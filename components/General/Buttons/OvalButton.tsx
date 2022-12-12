import { ReactNode } from "react"

interface OvalButtonProps {
  buttonFunction: Function
  label: string
  icon: ReactNode
}

export default function OvalButton({ buttonFunction, label, icon }: OvalButtonProps) {
  return (
    <div
      className="flex flex-row my-6 mx-8 px-12 py-3 rounded-2xl nm-flat-medium gap-2 cursor-pointer"
      onClick={() => buttonFunction()}
    >
      {icon && icon}
      <p className="font-bold">{label}</p>
    </div>
  )
}