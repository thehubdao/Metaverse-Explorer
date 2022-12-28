import { useEffect, useState } from "react";
import Loader from "../Loader";
import Pagination from "../Pagination";
import NftCard from "./NftCard";

interface nftObject {
	tokenId: string;
	floor_adjusted_predicted_price: number;
	traits: {
		traitType: string;
		value: string;
	}[];
	images: {
		image_small: string;
	};
}

interface ContentProps {
	filteredItems: nftObject[];
	checked: boolean;
	nftObject: nftObject[];
	isLoading: boolean;
	controlPageIndex: number
}

const formatter = new Intl.NumberFormat("en-US", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 4,
});

export default function Content({
	filteredItems,
	checked,
	nftObject,
	isLoading,
	controlPageIndex
}: ContentProps) {


	const dataFluf = () => {
		const flufs: React.ReactElement[] = [];
		for (
			let index: number = controlPageIndex * 10;
			index < controlPageIndex * 10 + 20;
			index++
		) {
			if (!nftObject[index]) return flufs;
			flufs.push(
				<NftCard
					image={nftObject[index]["images"]["image_small"]}
					text="Estimated Price: "
					value={formatter.format(
						nftObject[index]["floor_adjusted_predicted_price"]
					)}
					key={index}
				/>
			);
		}
		return flufs;
	};

	const datafiltered = () => {
		const flufs: React.ReactElement[] = [];
		for (
			let index: number = controlPageIndex * 10;
			index < controlPageIndex * 10 + 20;
			index++
		) {
			if (!filteredItems[index]) return flufs;
			flufs.push(
				<NftCard
					image={filteredItems[index]["images"]["image_small"]}
					text="Estimated Price: "
					value={formatter.format(
						filteredItems[index]["floor_adjusted_predicted_price"]
					)}
					key={index}
				/>
			);
		}
		return flufs;
	};

	return (
		<>
			{isLoading ? (
				<div className="w-full pt-16">
					<Loader />

				</div>
			) : (
				<>
					{filteredItem && checked && filteredItem.length > 0 ? (
						<div className="flex flex-wrap justify-center gap-5">
							{datafiltered()}
						</div>
					) : (
						<div className="flex flex-wrap justify-center gap-10">
							{dataFluf()}
						</div>
					)}
				</>
			)}
		</>
	);
}
