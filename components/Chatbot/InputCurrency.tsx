import { useState } from "react"
import Button from "./Button"

const InputCurrency = (props: any) => {
  const [inputValue, setInputValue] = useState()

  const handleSubmitCurrency = (amount: number) => {
    props.actionProvider.handleLastMessage(`$${amount}`)
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full grid grid-cols-4 mt-11 gap-2">
        <input
          className={`bg-grey-sidebar rounded-xl p-3 focus:outline-none text-center ${inputValue ? 'col-span-3' : 'col-span-full'}`}
          type='number'
          placeholder="Enter Amount USDC or select below"
          value={inputValue}
          onChange={(e: any) => setInputValue(e.target.value)}
        />
        {inputValue && <Button label="Submit" onClick={() => { handleSubmitCurrency(inputValue) }} />}
      </div>
      <div className="flex w-full justify-center gap-2 mt-4">
        <Button label="$350" onClick={() => { handleSubmitCurrency(350) }} />
        <Button label="$1050" onClick={() => { handleSubmitCurrency(1050) }} />
        <Button label="$1400" onClick={() => { handleSubmitCurrency(1400) }} />
      </div>
    </div>
  )
}

export default InputCurrency