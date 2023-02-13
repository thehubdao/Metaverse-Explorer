import dynamic from 'next/dynamic'

export { default as Loader } from './Loader'
export { default as WalletModal } from './WalletModal_deprecated'

const Badges = dynamic(() => import("../components/MLM/dashboard/Badges") as any, { ssr: false })
const Dashboard = dynamic(() => import("../components/MLM/dashboard/Dashboard") as any, { ssr: false })

export { Badges, Dashboard }
