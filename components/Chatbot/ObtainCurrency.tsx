import { useRouter } from 'next/router'
import Button from "./Button"

const ObtainCurrency = () => {
  const router = useRouter()

  const handleSwap = () => {
    confirm('Sure?') ? router.push("/swap") : ''
  }

  const handleBuy = () => {
    window.open('https://widget.wert.io/default/redirect', '_blank')
  }

  return (
    <div className="flex w-full justify-center gap-2 mt-4">
      <Button label="Buy USDY with credit card" onClick={handleBuy} />
      <Button label="Swap other currencies to get USDY" onClick={handleSwap} />
    </div>
  )
}

export default ObtainCurrency