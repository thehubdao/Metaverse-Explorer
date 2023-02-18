import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type iColors = 'black' | 'blue'

const Logo = ({ color }: { color: iColors }) => {
  const maksElement = useRef(null);
  const lightLogoElement = useRef(null);
  const darkLogoElement = useRef(null);

  const colors = {
    black: 'rgb(49, 47, 48)',
    blue: 'rgb(25, 127, 243)'
  }

  useEffect(() => {
    const logoTl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: .4 });

    // start point
    logoTl.to([lightLogoElement.current, darkLogoElement.current], {
      scale: 1.4,
      duration: 0,
      transformOrigin: 'center center',
    });

    // first we scale the MGH logo and the mask circle.
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

    // We do a 120 degree turn
    logoTl.to([lightLogoElement.current, darkLogoElement.current], {
      rotate: 120,
      duration: 1,
      transformOrigin: 'center 55%',
      ease: "back.inOut(3)"
    });

    // Turn back -10 degree
    logoTl.to([lightLogoElement.current, darkLogoElement.current], {
      rotate: 110,
      duration: .5,
      transformOrigin: 'center 55%',
    });

    // resize to initial settings
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

    // Turn again to 120 deg
    logoTl.to([lightLogoElement.current, darkLogoElement.current], {
      rotate: 120,
      duration: .5,
      transformOrigin: 'center 55%',
    });

    logoTl.play()
  }, [])

  return (
    <svg width={'100%'} height={'100%'} viewBox="0 0 250 250">
      {/* circle mask applied to the group */}
      <defs >
        <clipPath id="svgMask">
          <circle cx={125} cy={125} r={125} ref={maksElement} />
        </clipPath>
      </defs>
      {/* external grey logo */}
      <path d="M95.728,52.103C107.852,72.203 92.731,97.281 68.483,97.281C68.483,97.281 54.699,92.21 49.997,92.21C45.295,92.21 31.511,97.281 31.511,97.281C7.309,97.281 -7.858,72.203 4.266,52.103C4.266,52.103 15.607,43.667 17.958,39.748C20.263,35.922 22.752,21.447 22.752,21.447C34.876,1.347 65.118,1.347 77.242,21.447C77.242,21.447 79.501,35.507 81.806,39.333C84.157,43.252 95.728,52.103 95.728,52.103Z" style={{ fill: colors[color] }} transform='translate(75, 65)' ref={darkLogoElement} />
      {/* white logo with grey circle group */}
      <g clipPath='url(#svgMask)'>
        <circle cx={125} cy={125} r={125} fill={colors[color]} />
        <path d="M95.728,52.103C107.852,72.203 92.731,97.281 68.483,97.281C68.483,97.281 54.699,92.21 49.997,92.21C45.295,92.21 31.511,97.281 31.511,97.281C7.309,97.281 -7.858,72.203 4.266,52.103C4.266,52.103 15.607,43.667 17.958,39.748C20.263,35.922 22.752,21.447 22.752,21.447C34.876,1.347 65.118,1.347 77.242,21.447C77.242,21.447 79.501,35.507 81.806,39.333C84.157,43.252 95.728,52.103 95.728,52.103Z" style={{ fill: 'white' }} transform='translate(75, 65)' ref={lightLogoElement} />
      </g>
    </svg>
  )
}

const Loader = ({ size, color }: { size: number, color: iColors }) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-20">
      <div style={{ width: size, height: size }}>
        <Logo color={color} />
      </div>
    </div>
  )
}

export default Loader