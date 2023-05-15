export default function Valuation() {
	return (<></>)
}

export async function getServerSideProps() {
	return {
		redirect: {
			destination: '/metaverseexplorer'
		}
	};
}