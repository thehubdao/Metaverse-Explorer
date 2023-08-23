import { usePathname } from "next/navigation";
import ConnectButtonUI from "../common/connectButton.ui";

interface HeaderUIProp {
  isConnected: boolean;
}

export default function HeaderUI({ isConnected }: HeaderUIProp) {
  const pathname = usePathname();
  return (
    <header className={`${isConnected && pathname !== '/metaverseexplorer/watchlist' && pathname !== '/metaverseexplorer/analytics' ? "bg-[url('/images/land_header.png')]" : ""}`} >
      <div className='mr-12'>
        <ConnectButtonUI />
      </div>
    </header>
  )
}