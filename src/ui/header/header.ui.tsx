import ConnectButtonUI from "../common/connectButton.ui";
import DarkModeButtonUI from "../common/darkModeButton.ui";

interface HeaderUIProp {
  isConnected: boolean;
}

export default function HeaderUI({ isConnected }: HeaderUIProp) {

  return (
    <header className={`${isConnected ? "bg-[url('/images/banner.png')] dark:bg-[url('/images/dm-banner.png')]" : ""}`}  >
      <div className='mr-12 relative float-right flex'>
        <ConnectButtonUI />
        <DarkModeButtonUI/>
      </div>
    </header>
  )
}