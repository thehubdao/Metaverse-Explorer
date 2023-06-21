import Image from "next/image";

interface ButtonProps {
  icon?: string
  label: string
  onClick: Function
}

const Button = ({ icon, label, onClick }: ButtonProps) => {
  return (
    <div
      onClick={() => { onClick() }}
      className='w-full flex flex-row p-3 rounded-2xl gap-2 cursor-pointer bg-[#212121] justify-center items-center text-white text-center'
    >
      {icon && <Image src={icon} width={20} height={20} />}
      <p>{label}</p>
    </div>
  )
}

export default Button