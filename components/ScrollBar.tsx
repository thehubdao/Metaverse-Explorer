import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface ScrollBarProps {
  parentDom: HTMLElement
}

export default function ScrollBar({ parentDom }: ScrollBarProps) {
  const scrollBarDom = useRef<HTMLDivElement>(null)
  const [offsetScroll, setOffsetScroll] = useState(0)
  const [heightBar, setHeightBar] = useState(0)

  const ScrollHandler = (event: Event) => {
    const calcOffset = parentDom.scrollTop / (parentDom.scrollHeight - parentDom.getBoundingClientRect().height)
    setOffsetScroll(calcOffset)
    setHeightBar((parentDom.getBoundingClientRect().height / parentDom.scrollHeight) * (parentDom.getBoundingClientRect().height))
    gsap.killTweensOf(scrollBarDom.current)
    const scrollTl = gsap.timeline({ paused: true }) // Timeline
    scrollTl.to(scrollBarDom.current, {
      opacity: 1,
      duration: 0.3
    }).to(scrollBarDom.current, {
      opacity: 0,
      duration: 1,
      delay: 1
    })
    scrollTl.play()
  }

  const ResizeHandler = (event: Event) => {
    setHeightBar((parentDom.getBoundingClientRect().height / parentDom.scrollHeight) * (parentDom.getBoundingClientRect().height))
  }

  useEffect(() => {
    parentDom?.addEventListener('scroll', ScrollHandler)
    window?.addEventListener('resize', ResizeHandler)

    return(() => {
      parentDom?.removeEventListener('scroll', ScrollHandler)
      window?.removeEventListener('resize', ResizeHandler)
    })
  }, [parentDom])

  return (
    <div
      className={`w-5 absolute`}
      style={{
        top: 0,//parentDom.getBoundingClientRect().top,
        right: 0, //parentDom.getBoundingClientRect().width - 20,
        height: parentDom.getBoundingClientRect().height,
        opacity: 0
      }}
      ref={scrollBarDom}
    >
      {
        (heightBar < parentDom.getBoundingClientRect().height) &&
        <div className="relative w-full h-full">
          <div
            className={`bg-grey-content w-full absolute rounded-full opacity-60`}
            style={{
              top: offsetScroll * (parentDom.getBoundingClientRect().height - heightBar),
              height: heightBar
            }}
          />
          </div>
      }
    </div>
  )
}