import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import Button from "./Button"

const LastMessage = () => {
  const router = useRouter()
  const element: any = useRef<any>(null)

  const handleClick = () => {
    confirm('Sure?') ? router.push("/valuation") : ''
  }

  useEffect(() => {
    element.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }, [element])

  return (
    <div ref={element}>
      <Button label='Go back' onClick={handleClick}/>
    </div>
  )
}

export default LastMessage