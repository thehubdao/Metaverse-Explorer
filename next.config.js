/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/valuation',
				permanent: false,
			},
			{
				source: "/docs/mghdao_engl_whitepaper.pdf",
				destination: "/docs/mgh_whitepaper_v3.pdf",
				permanent: true,
			},
			{
				source:
					"/wp-content/uploads/2021/06/mghdao_engl_whitepaper_20210626_print-1.pdf",
				destination: "/docs/mgh_whitepaper_v3.pdf",
				permanent: true,
			},
		];
	},
	images: {
		domains: [
			"img.seadn.io",
			"api.sandbox.game",
			"lh3.googleusercontent.com",
			"cdn.axieinfinity.com",
			"i.seadn.io",
			"fluf-compressed.s3.eu-west-1.amazonaws.com",
			"openseauserdata.com",
			'ipfs.io'
		],
	},
	env: {
		ITRM_SERVICE: process.env.ITRM_SERVICE,
		SOCKET_SERVICE: process.env.SOCKET_SERVICE,
		WEB3AUTH_CLIENT_ID: process.env.WEB3AUTH_CLIENT_ID,
		WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID,
		MLM_BACKEND_URL: process.env.MLM_BACKEND_URL,
		MLM_CONTRACT_ADDRESS: process.env.MLM_CONTRACT_ADDRESS,
		BADGES_CONTRACT_ADDRESS: process.env.BADGES_CONTRACT_ADDRESS,
		CHANNEL_PUSH_ADDRESS: process.env.CHANNEL_PUSH_ADDRESS,
		ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
		ROLE_CONTRACT_ADDRESS:process.env.ROLE_CONTRACT_ADDRESS
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
};
