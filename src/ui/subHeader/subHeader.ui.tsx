"use client"

import { usePathname } from 'next/navigation';
import LinkedButton from "./linkedButtons.ui";
import { useAppSelector } from '../../state/hooks';

interface OptionProps {
  name: string;
  route: string;
  image: string;
  darkImage: string;
}

interface GeneralSectionProps {
  optionList: OptionProps[];
}

export default function SubHeader({ optionList }: GeneralSectionProps) {
  const pathname = usePathname();
  const isConnected = useAppSelector(state => state.login.connected);

  return (
    <>
      <div className="mt-14 hidden lg:block">
        <div className="rounded-xl">
          {/* Menu Header */}
          <div className={`rounded-3xl px-5 py-7 w-full flex flex-col lg:flex-row justify-between items-center bg-lm-fill dark:bg-nm-dm-fill`}>
            {/* {Title(optionList)} */}
            <h1 className={`text-lm-text dark:text-lm-fill font-bold rounded-2xl lg:text-3xl capitalize text-3xl mb-0`}>
              {pathname === '/metaverseexplorer' ? "Heatmap" : pathname.replace("/metaverseexplorer/", "")}
            </h1>
            {/* Links Wrapper */}
            <div className="flex gap-5">
              {/* Links */}
              {
                optionList.map((option: OptionProps) => {
                  return (
                    <div key={option.name}>
                      <LinkedButton name={option.name} route={option.route} isActive={pathname == `/${option.route}`} image={option.image} darkImage={option.darkImage} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      {
        isConnected &&
        <div className='flex justify-center items-center lg:hidden fixed bottom-0 left-0 bg-nm-fill dark:bg-nm-black w-full h-20 z-10'>
          <div className="flex gap-5">
            {/* Links */}
            {
              optionList.map((option: OptionProps) => {
                return (
                  <div key={option.name}>
                    <LinkedButton name={option.name} route={option.route} isActive={pathname == `/${option.route}`} image={option.image} darkImage={option.darkImage}/>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </>
  )
}