import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
// import { CustomEase } from "gsap/CustomEase";

interface FragmentProps {
  rotateGradesClass?: string,
  positionClass?: string
  label: string
  animationProps: {
    x: number,
    y: number
  }
}

// Gsap general timeline
const timeLineAnimation = gsap.timeline()

const Fragment = ({
  label,
  rotateGradesClass,
  positionClass,
  animationProps
}: FragmentProps) => {
  const fragmentElement = useRef(null)

  useEffect(() => {
    gsap.fromTo(fragmentElement.current, {
      x: animationProps.x,
      y: animationProps.y,
      duration: 0
    }, {
      x: 0,
      y: 0,
      repeat: -1,
      repeatDelay: 1,
      duration: 4,
      yoyo: true
    })
  })

  return (
    <>
      <div className={`absolute ${rotateGradesClass} ${positionClass}`} ref={fragmentElement}>
        <Image
          src={"/images/mgh_logo/fragmented.png"}
          width={340}
          height={340}
        />
        {/* <p className="absolute w-full text-center font-bold">{label}</p> */}
      </div>
    </>
  )
}

const Loader = () => {
  const logoElement = useRef(null);

  useEffect(() => {
    gsap.to(logoElement.current, {
      repeat: -1,
      rotate: 1080,
      duration: 5,
      ease: "power2.inOut",
    })
  }, [])

  return (
    <div className="w-full h-full self-center flex items-center justify-center">
      <div className="relative w-96 h-96 flex justify-center items-center" ref={logoElement}>
        <Fragment
          label="1"
          positionClass="top-4"
          animationProps={{ x: 25, y: -25 }}
        />
        <Fragment
          label="2"
          rotateGradesClass="rotate-[120deg]"
          positionClass="bottom-1 right-3"
          animationProps={{ x: 0, y: 50 }}
        />
        <Fragment
          label="3"
          rotateGradesClass="rotate-[240deg]"
          positionClass="bottom-1 left-3"
          animationProps={{ x: -50, y: 0 }}
        />
      </div>
      <p className="">Message</p>
    </div>
  )
}

export default Loader