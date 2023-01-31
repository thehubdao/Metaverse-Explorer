import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const Logo = () => {
  const maksElement = useRef(null);
  const lightLogoElement = useRef(null);
  const darkLogoElement = useRef(null);

  useEffect(() => {
    const logoTl = gsap.timeline({ paused: true, repeat: -1 });

    logoTl.to([lightLogoElement.current, darkLogoElement.current], {
      scale: 1.4,
      duration: 0,
      transformOrigin: 'center center',
    });

    logoTl.to(maksElement.current, {
      scale: .4,
      duration: .5,
      transformOrigin: 'center center',
    });

    logoTl.to([lightLogoElement.current, darkLogoElement.current], {
      scale: 2,
      duration: .5,
      transformOrigin: 'center center',
    }, '<');

    logoTl.to([lightLogoElement.current, darkLogoElement.current], {
      rotate: 120,
      duration: 1,
      transformOrigin: 'center 55%',
      ease: "back.inOut(3)"
    });

    logoTl.to([lightLogoElement.current, darkLogoElement.current], {
      rotate: 110,
      duration: .5,
      transformOrigin: 'center 55%',
    });


    logoTl.to(maksElement.current, {
      scale: 1,
      duration: .5,
      transformOrigin: 'center center',
    });

    logoTl.to([lightLogoElement.current, darkLogoElement.current], {
      scale: 1.47,
      duration: .5,
      transformOrigin: 'center center',
    }, '<');

    logoTl.to([lightLogoElement.current, darkLogoElement.current], {
      rotate: 120,
      duration: .5,
      transformOrigin: 'center 55%',
    });

    logoTl.to([lightLogoElement.current, darkLogoElement.current], {
      duration: .4,
    });

    logoTl.play()
  }, [])

  return (
    <svg width={'100%'} height={'100%'} viewBox="0 0 250 250">
      <defs >
        <clipPath id="svgMask">
          <circle cx={125} cy={125} r={125} ref={maksElement} />
        </clipPath>
      </defs>
      <path d="M95.728,52.103C107.852,72.203 92.731,97.281 68.483,97.281C68.483,97.281 54.699,92.21 49.997,92.21C45.295,92.21 31.511,97.281 31.511,97.281C7.309,97.281 -7.858,72.203 4.266,52.103C4.266,52.103 15.607,43.667 17.958,39.748C20.263,35.922 22.752,21.447 22.752,21.447C34.876,1.347 65.118,1.347 77.242,21.447C77.242,21.447 79.501,35.507 81.806,39.333C84.157,43.252 95.728,52.103 95.728,52.103Z" style={{ fill: 'rgb(49, 47, 48)' }} transform='translate(75, 65)' ref={darkLogoElement} />
      <g clip-path='url(#svgMask)'>
        <circle cx={125} cy={125} r={125} fill='rgb(49, 47, 48)' />
        <path d="M95.728,52.103C107.852,72.203 92.731,97.281 68.483,97.281C68.483,97.281 54.699,92.21 49.997,92.21C45.295,92.21 31.511,97.281 31.511,97.281C7.309,97.281 -7.858,72.203 4.266,52.103C4.266,52.103 15.607,43.667 17.958,39.748C20.263,35.922 22.752,21.447 22.752,21.447C34.876,1.347 65.118,1.347 77.242,21.447C77.242,21.447 79.501,35.507 81.806,39.333C84.157,43.252 95.728,52.103 95.728,52.103Z" style={{ fill: 'white' }} transform='translate(75, 65)' ref={lightLogoElement} />
      </g>
    </svg>
  )
}

const Loader = () => {
  /* useEffect(() => {
    gsap.to(logoElement.current, {
      repeat: -1,
      rotate: 1080,
      duration: 5,
      ease: "power2.inOut",
    })
  }, []) */

  return (
    <div className="w-full h-full self-center flex items-center justify-center">
      <div className="relative w-96 h-96 flex justify-center items-center">
        <Logo />
        {/* <Image src={'/images/mgh_logo/shadow-logo.svg'} layout='fill'/> */}
      </div>
    </div>
  )
}

export default Loader

{/* <Fragment
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
/> */}