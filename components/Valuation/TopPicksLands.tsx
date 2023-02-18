import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Metaverse } from "../../lib/metaverse";
import axios from "axios";
import { RiLoader3Fill } from "react-icons/ri";
import { Pagination } from "@mui/material";

interface Props {
	metaverse: Metaverse;
}

const TopPicksLands = ({ metaverse }: Props) => {
	const [loading, setLoading] = useState(true);
	const [picks, setPicks] = useState([]);

	// Pagination Controller
	const [numberOfPages, setNumberOfPages] = useState<number>(0)
	const [controlPageIndex, setControlPageIndex] = useState<number>(0);
	const pageLenght: number = 15;

	useEffect(() => {
		const setData = async () => {
			setLoading(true);

			await axios
				.get(process.env.ITRM_SERVICE + "/val-analytics/topPicks", {
					params: { metaverse: metaverse },
				})
				.then((response) => {
					setPicks(response.data);
					setLoading(false);
					setNumberOfPages(Math.ceil(response.data.length / pageLenght));
					setControlPageIndex(0);
				})
				.catch((error) => {
					console.log(error);
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
						<div className="relative lg:h-12 lg:w-12 md:h-8 md:w-8 bg-white rounded-full border mb-4 mt-4 w-6 h-6">
							<Image
								src={picks[index]["images"]["image_url"]}
								layout="fill"
								className="rounded-full"
								alt="land image"
								loading="lazy"
							/>
						</div>
					</td>
					<td className="flex justify-center px-4 content-center items-center text-grey-content pt-0.5 w-1/5 hover:underline">
						<a
							className="text-lg lg:text-xl font-medium font-plus md:text-base"
							href={picks[index]["external_link"]}
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

	return (
		<div className="flex flex-col items-start mb-10">
			{loading ? (
				<p className="text-grey-content flex gap-2">
					Loading Top Picks{" "}
					<RiLoader3Fill className="animate-spin-slow h-5 w-5 xs:h-6 xs:w-6" />
				</p>
			) : (
				<>
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
						<tbody className="bg-transparent flex flex-col items-center justify-between overflow-y-scroll w-full h-[50vh] md:h-[30vh] scrollbar--y scrollbar overflow-x-hidden">
							{rowData()}
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
				</>
			)}
		</div>
	);
};

export default TopPicksLands;
