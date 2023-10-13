import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';

interface FullScreenButtonUIProps {
  fullScreenRef: React.RefObject<HTMLDivElement | null>;
}

export default function FullScreenButtonUI({ fullScreenRef }: FullScreenButtonUIProps) {
  const isFullScreen = document.fullscreenElement;
  //TODO fix fullscreen exit
  const toggleFullScreen = () => {
    if (fullScreenRef.current) {
      if (isFullScreen) {
        document.exitFullscreen().catch((error) => {
          console.error("Error when exiting full screen mode:", error);
        });
      } else {
        fullScreenRef.current.requestFullscreen().catch((error) => {
          console.error("Error entering full screen mode:", error);
        });
      }
    }
  };

  return (
    <button onClick={toggleFullScreen}>
      {isFullScreen ? (
        <BiExitFullscreen className="text-xl text-lm-text cursor-pointer hover:scale-120" />
      ) : (
        <BiFullscreen className="text-xl text-lm-text cursor-pointer hover:scale-120" />
      )}
    </button>
  );
}
