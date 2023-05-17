import { useEffect, useState } from "react";

import TableStructure from "./TopSellingTable/TableStructure";
import { TopSellings } from "../../types/valuation/TopSelling";
import { Metaverse } from "../../lib/metaverse";
import TopSellingFilter, {
	TopSellingFilterBy,
} from "./TopSellingTable/TopSellingFilter";
import { fetchChartData } from "../Analytics/fetchChartData";
import { RiLoader3Fill } from "react-icons/ri";
import NoData from "../General/NoData";

const TopSellingLands = (props: { metaverse: Metaverse }) => {
	const [topSellings, setTopSellings] = useState<TopSellings | any>({});
	const [filterBy, setFilterBy] = useState<TopSellingFilterBy>("totalTop");
	const [stateData, setStateData] = useState<'errorQuery' | 'loadingQuery' | 'successQuery'>('loadingQuery')

	async function waitingData(metaverse: Metaverse) {
		const data = await fetchChartData(metaverse, "topSellingLands");
		if (data) {
			setTopSellings(data);
			setStateData('successQuery')
		} else {
			setStateData('errorQuery')
		}
	}

	useEffect(() => {
		waitingData(props.metaverse);
	}, [props.metaverse]);

	if (stateData === 'errorQuery') {
		return (
			<div className="mb-28">
				<NoData label="couldn't connect to top sells service" />
			</div>
		)
	}

	if (stateData === 'loadingQuery') {
		return (
			<p className="text-gray-300 flex gap-2">
				Loading Top Sells{" "}
				<RiLoader3Fill className="animate-spin-slow h-5 w-5 xs:h-6 xs:w-6" />
			</p>
		)
	}

	return (
		<div className="flex flex-col items-start rounded-xl py-3 px-4 w-full text-left mb-10">
			<div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded text-grey-content">
				<div className="flex w-full justify-between mb-5 items-center">
					<h3 className="lg:text-2xl text-xl text-grey-content  mb-0 sm:mb-2">
						Top Selling LANDs
					</h3>
					<TopSellingFilter filterBy={filterBy} setFilterBy={setFilterBy} />
				</div >
				<div className="block w-full overflow-x-scroll scrollbar 2xl:overflow-x-hidden">
					<TableStructure
						metaverse={props.metaverse}
						filterby={{ element: filterBy, data: topSellings[filterBy] }}
					/>
				</div>
			</div >

		</div >
	);
};

export default TopSellingLands;
