import "animate.css";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Components
const InitWeb3Connect = dynamic(() => import('../components/InitWeb3Connect'), { ssr: false })
import ScrollBar from "../components/ScrollBar";
import Sidebar from "../components/Sidebar";

interface LayoutProps {
	children: React.ReactNode;
}

const list = [
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
		url: "/mlm",
		label: "MLM",
		icon: "i",
	},
	{
		url: "https://avatar-generator-metagamehub.vercel.app/?campaign=decentraland",
		label: "EDIT AVATAR",
		icon: "g",
	},
	
];

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
			url: "/mlm",
			label: "MLM",
			icon: "i",
		},
		{
			url: "https://avatar-generator-metagamehub.vercel.app/?campaign=decentraland",
			label: "EDIT AVATAR",
			icon: "g",
		},
	];
	// Scrollbar Controller
	const parentRef = useRef<HTMLDivElement>(null)
	const [parentDom, setParentDom] = useState<HTMLDivElement | null>(null)

	useEffect(() => {
		setParentDom(parentRef.current)
		//console.log(parentRef)
	}, [parentRef.current])

	useEffect(() => {
		console.log(children)
	}, [])

	return (
		<div className="font-plus text-grey-content w-full h-screen overflow-y-scroll hidescroll" ref={parentRef}>
			{/* Page wrapper */}
			<main className="w-full min-h-screen pl-24">
				{children}
			</main>

			{/* Wallet connection wrapper */}
			<div className="absolute top-0 right-0">
				<InitWeb3Connect />
			</div>
			{/* Sidebar wrapper */}
			<div className="fixed inset-0 w-24 overflow-hidden">
				<Sidebar list={list} />
			</div>
			{parentDom && <ScrollBar parentDom={parentDom} />}
		</div>
	);
}
