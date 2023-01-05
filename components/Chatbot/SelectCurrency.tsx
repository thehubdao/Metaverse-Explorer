import Button from "./Button"

const SelectCurrency = (props: any) => {
  const handleClickUSDC = () => {
    props.actionProvider.handleSelectCurrency('USDC')
  }

  const handleClickUSDT = () => {
    props.actionProvider.handleSelectCurrency('USDT')
  }

  return (
    <div className="flex w-full justify-center gap-2 mt-4">
      <Button label="USDC" icon="/images/icons/chatbot/cryptocurrency_usdc.svg" onClick={handleClickUSDC} />
      <Button label="USDT" icon="/images/icons/chatbot/cryptocurrency_usdt.svg" onClick={handleClickUSDT} />
    </div>
  )
}

export default SelectCurrency