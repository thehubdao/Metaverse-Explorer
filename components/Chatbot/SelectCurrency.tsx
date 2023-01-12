import { useEffect, useRef } from "react"
import Button from "./Button"

const SelectCurrency = (props: any) => {
  const element: any = useRef<any>(null)
  const { setState } = props

  const handleClickUSDC = () => {
    props.actionProvider.handleSelectCurrency('USDC')
    setState((state: any) => ({ ...state, currency: 'USDC' }))
  }

  const handleClickUSDT = () => {
    props.actionProvider.handleSelectCurrency('USDT')
    setState((state: any) => ({ ...state, currency: 'USDT' }))
  }

  useEffect(() => {
    element.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }, [element])

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <div className="flex w-full justify-center gap-2 mt-4" ref={element}>
      <Button label="USDC" icon="/images/icons/chatbot/cryptocurrency_usdc.svg" onClick={handleClickUSDC} />
      <Button label="USDT" icon="/images/icons/chatbot/cryptocurrency_usdt.svg" onClick={handleClickUSDT} />
    </div>
  )
}

export default SelectCurrency