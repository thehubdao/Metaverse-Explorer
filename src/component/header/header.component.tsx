"use client"

import { useEffect } from "react";
import { useAppSelector } from "../../state/hooks";
import HeaderUI from "../../ui/header/header.ui";

interface HeaderComponentProps {
  setIsConnected: (isConnectedChild: boolean) => void;
}

export default function HeaderComponent({ setIsConnected }: HeaderComponentProps) {
  const isConnected = useAppSelector(state => state.login.connected);

  useEffect(() => {
    setIsConnected(isConnected);
  }, [isConnected])

  return (
    <HeaderUI isConnected={isConnected} />
  ) 
}