"use client"

import './global.css';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Plus_Jakarta_Sans } from 'next/font/google';
import HeaderComponent from '../component/header/header.component';
import store from '../state/store';
import { Provider } from 'react-redux';
import FontIcons from 'next/font/local';
import ToogleIcons from 'next/font/local';
import SubHeaderUI from '../ui/subHeader/subHeader.ui';
import { fetchCurrencyData } from '../utils/api';
import { setCurrencyValues } from '../state/currencySlice';
import FooterUI from '../ui/common/footer.ui';
import WagmiProvider from "../providers/wagmi.provider";
import { ThemeProvider } from 'next-themes';
import { SUB_HEADER_LIST } from '../constants/common.constant';

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'block', variable: '--jakarta-font' });
const fontIcons = FontIcons({ src: '../../public/fonts/fonts-icons/iconSet01.ttf', display: 'block', variable: '--icons-font' });
const toogleIcons = ToogleIcons({src: '../../public/fonts/fonts-icons/icomoon-toogle-x.ttf', display: 'block', variable: '--toogle-font'});

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Asynchronous function that updates data for Currency coins
    const updateCurrencyData = async () => {
      const currencyData = await fetchCurrencyData();
      if (currencyData) store.dispatch(setCurrencyValues(currencyData));
    };

    void updateCurrencyData();
  }, []);

  return (
    <Provider store={store}>
      <html lang="en" className={`${plusJakarta.variable} ${fontIcons.variable} ${toogleIcons.variable}`}>
        <body className="font-plus text-nm-dm-highlight dark:text-nm-fill">
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <WagmiProvider>
              <div className={`w-full h-screen block lg:grid lg:grid-cols-1 ${isConnected ? 'lg:grid-rows-[226px_1fr]' : 'lg:grid-rows-[70px_1fr]'} `}>
                <HeaderComponent setIsConnected={(isConnectedChild: boolean) => setIsConnected(isConnectedChild)} />
                <main className='px-4 md:px-10 lg:px-16'>
                  {pathname !== '/stake' && <SubHeaderUI optionList={SUB_HEADER_LIST} />}
                  {children}
                  {isConnected && pathname !== '/metaverseexplorer/analytics' && <FooterUI />}
                </main>
              </div>
            </WagmiProvider>
          </ThemeProvider>
        </body>
      </html>
    </Provider >
  )
}