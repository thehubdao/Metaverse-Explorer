import { nftObject } from "../../lib/types";
import Loader from "../Loader";
import NftCard from "./NftCard";

interface ContentProps {
	filteredItems: nftObject[];
	nftObject: nftObject[];
	isLoading: boolean;
	controlPageIndex: number
	pageLenght: number
	collectionName: string
	handleSpecificNftData: Function
}

export default function Content({
	filteredItems,
	nftObject,
	isLoading,
	controlPageIndex,
	pageLenght,
	collectionName,
	handleSpecificNftData
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
					key={index}
					dataObject={dataObject[index]}
					collectionName={collectionName}
					handleSpecificNftData={handleSpecificNftData}
				/>
			);
		}
		return flufs;
	};

	return (
		<>
			{isLoading ? (
				<div className="w-full pt-16">
					<Loader color="blue" size={100}/>
				</div>
			) : (
				<div className="flex flex-wrap justify-center gap-10">
					{filteredItems && filteredItems.length > 0 ? (
						<>{dataFluf(true)}</>
					) : (
						<>{dataFluf(false)}</>
					)}
				</div>
			)}
		</>
	);
}
