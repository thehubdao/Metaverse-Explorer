import { useEffect, useRef, useState } from "react"

interface ScrollBarProps {
}

export default function ScrollBar({ }: ScrollBarProps) {
  const scrollBarDom = useRef<HTMLDivElement>(null)
  const parentDom = scrollBarDom.current?.parentElement

  const ScrollHandler = (event: Event) => {
    console.log('Scroll Top: ', parentDom?.scrollTop)
    console.log('Scroll Height: ', parentDom?.scrollHeight)
    console.log('Parent Position', parentDom?.getBoundingClientRect())
  }

  useEffect(() => {
    parentDom?.addEventListener('scroll', ScrollHandler)
  }, [])

  return (
    <div
      className={`bg-red-600 w-1 h-full fixed top-0 right-0`}
      ref={scrollBarDom}
    >
      <div className="bg-green-600 w-full h-1">

      </div>
    </div>
  )
}