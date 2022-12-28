import { useEffect, useRef, useState } from "react"
import useResizeObserver from "use-resize-observer"; //if we dont use, uninstall

interface ScrollBarProps {
  parentDom: HTMLDivElement
}

export default function ScrollBar({ parentDom }: ScrollBarProps) {
  const scrollBarDom = useRef<HTMLDivElement>(null)
  const [offsetScroll, setOffsetScroll] = useState(0)
  const [heightBar, setHeightBar] = useState(0)

  const ScrollHandler = (event: Event) => {
    const calcOffset = parentDom.scrollTop / (parentDom.scrollHeight - parentDom.getBoundingClientRect().height)
    setOffsetScroll(calcOffset)
    setHeightBar((parentDom.getBoundingClientRect().height / parentDom.scrollHeight) * (parentDom.getBoundingClientRect().height))
    console.log('scrolled')
  }

  useEffect(() => {
    parentDom?.addEventListener('scroll', ScrollHandler)
    /* return (parentDom?.removeEventListener('scroll', ScrollHandler)) */
  }, [parentDom])

  return (
    <div
      className={`w-1 fixed`}
      style={{
        top: parentDom.getBoundingClientRect().top,
        left: parentDom.getBoundingClientRect().right - 4,
        height: parentDom.getBoundingClientRect().height
      }}
      ref={scrollBarDom}
    >
      {
        (heightBar / parentDom.getBoundingClientRect().height <= 1) &&
        <div
          className={`bg-grey-content w-full absolute rounded-full opacity-60`}
          style={{
            top: offsetScroll * (parentDom.getBoundingClientRect().height - heightBar),
            height: heightBar
          }}
        />
      }
    </div>
  )
}