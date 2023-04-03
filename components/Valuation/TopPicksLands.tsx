import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Metaverse } from "../../lib/metaverse";
import axios from "axios";
import { RiLoader3Fill } from "react-icons/ri";
import { Pagination } from "@mui/material";
import NoData from "../General/NoData";

interface Props {
	metaverse: Metaverse;
}

const TopPicksLands = ({ metaverse }: Props) => {
	const [picks, setPicks] = useState([]);
	const [stateData, setStateData] = useState<'errorQuery' | 'loadingQuery' | 'successQuery'>('loadingQuery')

	// Pagination Controller
	const [numberOfPages, setNumberOfPages] = useState<number>(0)
	const [controlPageIndex, setControlPageIndex] = useState<number>(0);
	const pageLenght: number = 15;

	// Scrollbar Controller
	const parentRef = useRef<HTMLTableSectionElement>(null)
	const [parentDom, setParentDom] = useState<HTMLDivElement | null>(null)

	useEffect(() => {
		setParentDom(parentRef.current)
	}, [parentRef.current])

	useEffect(() => {
		const setData = async () => {
			setStateData('loadingQuery');

			await axios
				.get(process.env.ITRM_SERVICE + "/val-analytics/topPicks", {
					params: { metaverse: metaverse },
				})
				.then((response) => {
					if (response.data) {
						const thePositiveGapTopPicks = response.data.filter((pick: any) => pick.gap < 0)
						setPicks(thePositiveGapTopPicks);
						setStateData('successQuery');
						setNumberOfPages(Math.ceil(thePositiveGapTopPicks.length / pageLenght));
						setControlPageIndex(0);
					} else {
						setStateData('errorQuery')
					}
				})
				.catch((error) => {
					setStateData('errorQuery')
				});
		};
		setData().catch((e) => console.log(e));
	}, [metaverse]);

	const rowDataStyle = "flex justify-center px-4 content-center items-center text-lg lg:text-xl font-medium font-plus md:text-base pt-0.5 w-1/5";

	const rowData = () => {
		const rows: any = [];
		for (
			let index: number = controlPageIndex * pageLenght;
			index < controlPageIndex * pageLenght + pageLenght;
			index++
		) {
			if (!picks[index]) return rows;
			rows.push(
				<tr
					key={index}
					className="flex w-full mb-4 text-grey-content font-plus"
				>
					<td className="flex justify-center px-4 content-center w-1/5 relative">
						<a className="w-fit h-fit" href={picks[index]["market_links"]['opensea']} target='_blank'>
							<div className="relative lg:h-12 lg:w-12 md:h-8 md:w-8 bg-white rounded-full border mb-4 mt-4 w-6 h-6">
								<Image
									src={picks[index]["images"]["image_url"]}
									layout="fill"
									className="rounded-full"
									alt="land image"
									loading="lazy"
								/>
							</div>
						</a>
					</td>
					<td className="flex justify-center px-4 content-center items-center text-grey-content pt-0.5 w-1/5 hover:underline">
						<a
							className="text-lg lg:text-xl font-medium font-plus md:text-base"
							href={picks[index]["market_links"]['opensea']}
							target="_blank"
						>
							{picks[index]["coords"]
								? `(x:${picks[index]["coords"]["x"]}, y:${picks[index]["coords"]["y"]})`
								: picks[index]["center"]
									? `(${picks[index]["name"]})`
									: `no-asset`}
						</a>
					</td>
					<td className={rowDataStyle}>
						<span>
							{parseFloat(picks[index]["current_price_eth"]).toFixed(2)}
						</span>
					</td>
					<td className={rowDataStyle}>
						<span>
							{parseFloat(picks[index]["eth_predicted_price"]).toFixed(2)}
						</span>
					</td>
					<td className={rowDataStyle}>
						<span>{parseFloat(picks[index]["gap"]).toFixed(2)}%</span>
					</td>
				</tr>
			);
		}
		return rows;
	};

	if (stateData === 'errorQuery') {
		return (
			<div className="mb-28">
				<NoData label="couldn't connect to top picks service" />
			</div>
		)
	}

	if (stateData === 'loadingQuery') {
		return (
			<p className="text-gray-300 flex gap-2">
				Loading Top Picks{" "}
				<RiLoader3Fill className="animate-spin-slow h-5 w-5 xs:h-6 xs:w-6" />
			</p>
		)
	}

	return (
		<div className="flex flex-col items-start mb-10">
			<h3 className="lg:text-2xl text-xl text-grey-content font-plus mb-0 sm:mb-5">
				Our Top Picks
			</h3>
			<table className="w-full table-fixed border-collapse">
				<thead className="bg-transparent text-slate-200 w-full">
					<tr className="flex w-full mb-4 text-center text-grey-content font-plus font-bold bg-grey-dark rounded-lg">
						<th className="p-4 w-1/5 text-xs lg:text-lg md:text-base ">
							Land
						</th>
						<th className="p-4 w-1/5 text-xs lg:text-lg md:text-base ">
							Coord
						</th>
						<th className="p-4 w-1/5 text-xs lg:text-lg md:text-base ">
							Current price
						</th>
						<th className="p-4 w-1/5 text-xs lg:text-lg md:text-base ">
							Predicted price
						</th>
						<th className="p-4 w-1/5 text-xs lg:text-lg md:text-base">
							Gap
						</th>
					</tr>
				</thead>
				<tbody className="bg-transparent flex flex-col items-center justify-between overflow-y-scroll w-full h-[30vh]" ref={parentRef}>
					{picks.length > 0 ? rowData() : <p className="w-full h-full flex justify-center items-center">At this moment we have no top picks from this metaverse.</p>}
					{/* {parentDom && <ScrollBar parentDom={parentDom} />} */}
				</tbody>
			</table>
			<div className="w-full flex justify-center">
				{numberOfPages > 1 ? (
					<Pagination
						count={numberOfPages}
						defaultPage={controlPageIndex + 1}
						siblingCount={3} boundaryCount={2}
						shape="rounded"
						size="large"
						onChange={(e, page) => { setControlPageIndex(page - 1) }}
					/>
				) : (<></>)}
			</div>
		</div>
	);
};

export default TopPicksLands;
