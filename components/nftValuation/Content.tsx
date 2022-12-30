import Loader from "../Loader";
import NftCard from "./NftCard";

interface nftObject {
	tokenId: string;
	floor_adjusted_predicted_price: number;
	traits: {};
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
	pageLenght: number
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
	controlPageIndex,
	pageLenght
}: ContentProps) {
	const dataFluf = (isFiltered: boolean) => {
		const flufs: React.ReactElement[] = [];
		const dataObject = isFiltered ? filteredItems : nftObject

		for (
			let index: number = controlPageIndex * pageLenght;
			index < pageLenght * (controlPageIndex + 1);
			index++
		) {
			if (!dataObject[index]) return flufs;
			flufs.push(
				<NftCard
					image={dataObject[index]["images"]["image_small"]}
					text="Estimated Price: "
					value={formatter.format(
						dataObject[index]["floor_adjusted_predicted_price"]
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
				<div className="flex flex-wrap justify-center gap-10">
					{filteredItems && checked && filteredItems.length > 0 ? (
						<>{dataFluf(true)}</>
					) : (
						<>{dataFluf(false)}</>
					)}
				</div>
			)}
		</>
	);
}
