import { useEffect, useRef } from "react"
import Button from "./Button"

const OwnCurrencyQuestion = (props: any) => {
  const element: any = useRef<any>(null)

  const handleYes = () => {
    props.actionProvider.PositiveAnswerOwnCurrency(props.currency)
  }

  const handleNot = () => {
    props.actionProvider.NegativeAnswerOwnCurrency()
  }

  useEffect(() => {
    element.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }, [element])

  return (
    <div className="flex w-full justify-center gap-2 mt-4" ref={element}>
      <Button label="Yes" onClick={handleYes} />
      <Button label="No" onClick={handleNot} />
    </div>
  )
}

export default OwnCurrencyQuestion