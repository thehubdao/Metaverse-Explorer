import { useRouter } from 'next/router'
import Button from "./Button"

const ObtainCurrency = () => {
  const router = useRouter()

  const handleSwap = () => {
    confirm('Sure?') ? router.push("/swap") : ''
  }

  const handleBuy = () => {
    confirm('Sure?') ? router.push("/stake") : ''
  }

  return (
    <div className="flex w-full justify-center gap-2 mt-4">
      <Button label="Buy USDY with credit card" onClick={handleSwap} />
      <Button label="Swap other currencies to get USDY" onClick={handleBuy} />
    </div>
  )
}

export default ObtainCurrency