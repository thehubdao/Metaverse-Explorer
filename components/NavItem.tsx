import { useRouter } from "next/dist/client/router";
import Link from "next/link";

const NavItem = ({ text, link }: any) => {
	const router = useRouter();

	let focus = router.pathname === link;
	if (
		router.pathname === "/stake-ethereum" ||
		router.pathname === "/stake-polygon"
	) {
		if (link === "/stake") {
			focus = true;
		}
	}

	const styleItem = `span-layout text-6xl ${
		focus && "text-grey-icon"
	} nav-link__icon`

	function getIcon(link: any) {
		switch (link) {
			case "/":
				return (
					<span className={styleItem} aria-hidden="true">
						&#x65;
					</span>
				);
			case "/swap":
				return (
					<span className={styleItem} aria-hidden="true">
						&#x68;
					</span>
				);
			case "/liquidity":
				return (
					<span className={styleItem} aria-hidden="true">
						&#x66;
					</span>
				);
			case "/stake":
			case "/stake-ethereum":
			case "stake-polygon":
				return (
					<span className={styleItem} aria-hidden="true">
						&#x64;
					</span>
				);
			case "https://snapshot.org/#/metagamehub.eth" || "/pools":
				return (
					<span className={styleItem} aria-hidden="true">
						&#x61;
					</span>
				);
			case "/valuation":
				return (
					<span className={styleItem} aria-hidden="true">
						&#x62;
					</span>
				);
			case "/nftValuation":
				return (
					<span className={styleItem} aria-hidden="true">
						&#x63;
					</span>
				);
			case 'https://eth-india-hackaton-git-pushnotifications-dap-frontend.vercel.app/':
				return (
					<span className={styleItem} aria-hidden="true">
						&#x69;
					</span>
				)
			case 'https://avatar-generator-metagamehub.vercel.app/?campaign=decentraland':
				return (
					<span className={styleItem} aria-hidden="true">
						&#x67;
					</span>
				)
		}
	}

	return (
		<>
			<Link href={link}>
				<div className="menu cursor-pointer" data-animation="to-right">
					
						<a
							className={`${
								focus ? "  shadowNavItem" : "shadowNormal"
							} justify-center rounded-2xl p-2 text-grey-icon `}
						>
							
							{getIcon(link)}
							<span className="font-plus font-bold justify-center span-layout text-sm text-center">{text}</span>
						
						</a>
					
						
				</div>
				
			</Link>
		</>
	);
};

export default NavItem;
