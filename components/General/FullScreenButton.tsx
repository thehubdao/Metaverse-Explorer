import React from 'react'
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi'

interface Props {
  fullScreenRef: React.RefObject<HTMLDivElement>
  className?: string
}

const FullScreenButton = ({ fullScreenRef, className }: Props) => {
  const basicStyle = 'cursor-pointer hover:scale-120'
  const isFullScreen = document.fullscreenElement
  const handleClick = () => {
    isFullScreen
      ? document.exitFullscreen()
      : fullScreenRef.current?.requestFullscreen()
  }

  return (
    <button onClick={handleClick}>
      {isFullScreen ? (
        <BiExitFullscreen className={className + ' ' + basicStyle} />
      ) : (
        <BiFullscreen className={className + ' ' + basicStyle} />
      )}
    </button>
  )
}

export default FullScreenButton
