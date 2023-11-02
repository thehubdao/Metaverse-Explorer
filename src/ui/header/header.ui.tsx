import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import ConnectButtonUI from "../common/connectButton.ui";
import DarkModeButtonUI from "../common/darkModeButton.ui";
import { useTheme } from "next-themes";

interface HeaderUIProp {
  isConnected: boolean;
}

export default function HeaderUI({ isConnected }: HeaderUIProp) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();
  const handleToggleClick = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      <header className={`${isConnected ? "bg-[url('/images/BANNER.png')] dark:bg-[url('/images/BANNER_DARK.png')]" : ""} hidden lg:block`}  >
        <div className="ml-16 relative float-left">
          <Link href={"/metaverseexplorer"}>
            <div className="w-full flex justify-center items-center mt-6">
              <Image src={ isConnected ? "/images/mgh_logo/THEHUB_LOGO.svg" : "/images/mgh_logo/mgh_logo.svg"} width={65} height={61} alt="The Hub Dao logo" />
            </div>
          </Link>
        </div>
        <div className='mr-16 mt-6 relative float-right flex items-center justify-center'>
          <ConnectButtonUI />
          <DarkModeButtonUI />
        </div>
      </header>
      <nav className="mt-7 block lg:hidden">
        <div className="flex justify-between items-center">
          <Link href={"/metaverseexplorer"}>
            <Image
              src={'/images/mgh_logo/mgh_logo.svg'}
              alt={'TheHub DAO logo'}
              width={45}
              height={43}
              className="cursor-pointer flex justify-start items-start ml-4"
            />
          </Link>
          <div className={`font-toogle text-3xl pr-4 cursor-pointer ${isNavOpen ? 'hidden' : ''}`} onClick={() => handleToggleClick()}>
            b
          </div>
        </div>
        {isNavOpen && (
          <>
            <div className="fixed w-full h-screen inset-0 z-20">
              <div className='absolute top-0 right-0 h-screen w-full bg-lm-fill dark:bg-nm-black flex flex-col justify-center px-8 items-center py-20'>
                <div className="absolute top-0 right-0 pr-7 pt-9">
                  <DarkModeButtonUI />
                </div>
                <div className="absolute top-0 left-0 pl-7 pt-9 cursor-pointer" onClick={() => handleToggleClick()}>
                  <div className="w-12 h-12 bg-lm-fill dark:bg-nm-black shadow-relief-12 dark:shadow-dm-relief-12 flex justify-center items-center rounded-xl">
                    <Image
                      src={resolvedTheme === "dark" ? '/images/icons/back-white.svg' : '/images/icons/back.svg'}
                      alt={'Header icon'}
                      width={31}
                      height={31}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mt-20">
                  <ConnectButtonUI />
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  )
}