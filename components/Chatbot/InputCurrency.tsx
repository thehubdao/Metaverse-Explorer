import Button from "./Button"

const InputCurrency = () => {
  return (
    <div className="w-full flex flex-col">
      <input type='number' placeholder=""/>
      <div className="flex w-full justify-center gap-2 mt-4">
        <Button label="$350" onClick={() => { }} />
        <Button label="$1050" onClick={() => { }} />
        <Button label="$1400" onClick={() => { }} />
      </div>
    </div>
  )
}

export default InputCurrency