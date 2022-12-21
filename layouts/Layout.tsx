import "animate.css";
import dynamic from "next/dynamic";
const InitWeb3Connect = dynamic(() => import('../components/InitWeb3Connect'), { ssr: false })

import Sidebar from "../components/Sidebar";

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const SidebarOptionList = [
		{
			url: "/valuation",
			label: "LAND Valuation",
			icon: "b",
		},
		{
			url: "/nftValuation",
			label: "NFT Valuation",
			icon: "c",
		},
		{
			url: "/swap",
			label: "SWAP",
			icon: "h",
		},
		{
			url: "/liquidity",
			label: "LIQUIDITY",
			icon: "f",
		},
		{
			url: "/stake",
			label: "STAKE",
			icon: "d",
		},
		{
			url: "https://snapshot.org/#/metagamehub.eth",
			label: "GOVERNANCE",
			icon: "a",
		},
		{
			url: "https://eth-india-hackaton-git-pushnotifications-dap-frontend.vercel.app/",
			label: "MLM",
			icon: "i",
		},
		{
			url: "https://avatar-generator-metagamehub.vercel.app/?campaign=decentraland",
			label: "EDIT AVATAR",
			icon: "g",
		},
	];

	return (
		<div className="font-plus text-grey-content w-screen">
			{/* Page wrapper */}
			<main className="w-full min-h-screen pl-24">{children}</main>
			{/* Wallet connection wrapper */}
			<div className="absolute top-0 right-0">
				<InitWeb3Connect />
			</div>
			{/* Sidebar wrapper */}
			<div className="fixed inset-0 w-24 overflow-hidden">
				<Sidebar list={SidebarOptionList} />
			</div>
		</div>
	);
}
