import dynamic from 'next/dynamic'

export { default as Loader } from './Loader'
export { default as WalletModal } from './WalletModal'

const AppInit = dynamic(() => import('./AppInit'), { ssr: false })

export { AppInit }
