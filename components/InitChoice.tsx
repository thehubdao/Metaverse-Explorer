import { BsExclamationCircleFill } from "react-icons/bs"

interface InitChoiceProps {
  title: string
  children: React.ReactNode;
}

function PurchaseInfo() {
  return (
    <div className='flex space-x-2 items-center justify-center bg-grey-dark rounded-2xl w-[70%] m-auto p-2'>
      <BsExclamationCircleFill className={`text-2xl text-[#6196FF]`} />
      <p className='flex text-xs xs:text-base xl:text-base font-normal  text-grey-content pl-3'>
        You can have &nbsp;<span className='font-bold'>5 free valuations</span>, after that pro version is needed
      </p>
    </div>
  )
}

export default function InitChoice({ title, children }: InitChoiceProps) {
  return (
    <div className='w-full h-full p-8'>
      {/* Title */}
      <h2 className='text-grey-content  font-normal rounded-2xl lg:text-3xl text-2xl text-center mb-8' > {title}</h2>
      {/* Purchase Info Span */}
      < PurchaseInfo />
      {/* Card Chooser */}
      {children}
    </div >
  )
}