import React, { useEffect } from 'react';
import { Widget } from "@maticnetwork/wallet-widget";

const widget = new Widget({
  target: '#btnOpenWidget',
  appName: 'MGH-Bridge',
  position: 'center',
  network: 'mainnet',
});


const Bridge = () => {

  // subscribe to event onLoad
  const load = () => {
    console.log('widget is loaded');
  };

  const close = () => {
    console.log('widget is closed');
  };

  useEffect(() => {
    widget.on('load', load);
    widget.on('close', close);
    widget.create();
  }, [])

  return (
    <React.Fragment>
      <button id="btnOpenWidget" className="relative flex justify-center items-center bg-grey-dark bg-opacity-70  border border-opacity-10 hover:border-opacity-20 hover:shadow-button transition ease-in-out duration-500 shadow-dark rounded-xl w-full max-w-sm py-3 sm:py-4 text-gray-200 font-medium text-lg sm:text-xl overflow-hidden">
        {/* <div className="h-full w-full absolute bg-gradient-to-br transition-all ease-in-out duration-300 from-pink-600 to-blue-500 rounded-xl blur-2xl group-hover:blur-xl" /> */}
        <span className="pt-1 z-10 flex-grow">Bridge $MGH</span>
        <img src="/images/polygon-matic-logo.png" className="absolute right-1.5 top-1/6 h-4/5 w-auto z-10 bg-white rounded-lg p-1 px-2 bg-opacity-10" />
      </button>
    </React.Fragment>
  )
}

export default Bridge