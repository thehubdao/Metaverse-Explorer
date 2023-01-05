import Button from "./Button"

const OwnCurrencyQuestion = (props: any) => {
  const handleYes = () => {
    props.actionProvider.PositiveAnswerOwnCurrency()
  }

  const handleNot = () => {
    props.actionProvider.NegativeAnswerOwnCurrency()
  }

  return (
    <div className="flex w-full justify-center gap-2 mt-4">
      <Button label="Yes" onClick={handleYes} />
      <Button label="No" onClick={handleNot} />
    </div>
  )
}

export default OwnCurrencyQuestion