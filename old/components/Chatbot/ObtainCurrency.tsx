import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Button from "./Button"

const ObtainCurrency = () => {
  const router = useRouter()
  const element: any = useRef<any>(null)

  const handleSwap = () => {
    confirm('Sure?') ? router.push("/swap") : ''
  }

  const handleBuy = () => {
    window.open('https://widget.wert.io/default/redirect', '_blank')
  }

  useEffect(() => {
    element.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }, [element])

  return (
    <div className="flex w-full justify-center gap-2 mt-4" ref={element}>
      <Button label="Buy USDY with credit card" onClick={handleBuy} />
      <Button label="Swap other currencies to get USDY" onClick={handleSwap} />
    </div>
  )
}

export default ObtainCurrency