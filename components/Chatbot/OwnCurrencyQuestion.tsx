import Button from "./Button"

const OwnCurrencyQuestion = () => {
  const handleYes = () => {

  }

  const handleNot = () => {

  }

  return (
    <div className="flex w-full justify-center gap-2 mt-4">
      <Button label="Yes" onClick={handleYes} />
      <Button label="No" onClick={handleNot} />
    </div>
  )
}

export default OwnCurrencyQuestion