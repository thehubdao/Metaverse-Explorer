'use client';

import React from 'react';
import WagmiProvider from "../providers/wagmi/index";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <WagmiProvider>
            {children}
        </WagmiProvider>
    )
};

export default RootProvider;