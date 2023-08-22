import ConnectButtonUI from "../common/connectButton.ui";

interface HeaderUIProp {
  isConnected: boolean;
}

export default function HeaderUI({ isConnected }: HeaderUIProp) {

  return (
    <header className={`${isConnected ? "bg-[url('/images/banner.png')]" : ""}`} >
      <div className='mr-12'>
        <ConnectButtonUI />
      </div>
    </header>
  )
}