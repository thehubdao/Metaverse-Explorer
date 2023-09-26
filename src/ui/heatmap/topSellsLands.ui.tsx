import { useEffect, useState } from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import { TopSellingFilterBy, TopSellingLand } from "../../interfaces/itrm/val-analytics.interface";
import TopSellsFilterUI from "./topSellsFilter.ui";

interface TopSellsLandsUIProps {
  tableData: TopSellingLand | null;
  title: string;
  headers: string[];
}

export default function TopSellsLandsUI({ tableData, title, headers }: TopSellsLandsUIProps) {
  const [currentPageData, setCurrentPageData] = useState<TopSellingLand | null>(null);
  const [filterBy, setFilterBy] = useState<TopSellingFilterBy>("totalTop");

  const filterInfo = (topSells: TopSellingLand | null, filter: TopSellingFilterBy) => {
    if (!topSells) return null;
    switch (filter) {
      case "yesterdayTop":
        return topSells.yesterdayTop;    
      case "monthTop":
        return topSells.monthTop;      
      case "yearTop":
        return topSells.yearTop;     
      case "totalTop":
        return topSells.totalTop;
        
    }
  };

  useEffect(() => {
    if (tableData) {
      const filteredData = filterInfo(tableData, filterBy);
      setCurrentPageData(filteredData);
    }
  }, [tableData, filterBy]);

  return (
    <>
      <div className="flex justify-between">
        <p className="text-lm-text dark:text-nm-fill text-lg font-semibold mb-9">{title}</p>
        <TopSellsFilterUI filterBy={filterBy} setFilterBy={setFilterBy} />
      </div>
      <table className="w-full table-fixed border-collapse">
        <thead className="w-full">
          <tr className="flex w-full items-center text-lm-text dark:text-nm-fill font-bold bg-nm-gray dark:bg-[#32363C] rounded-xl">
            {headers.map((header, index) => (
              <th key={index} className="p-4 w-1/5 text-lg rounded-2xl">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="flex-col items-center justify-between w-full">
          {tableData ? (
            <></>
            // currentPageData && currentPageData.map((item, index) => (
            //   <tr key={index} className="flex w-full items-center">
            //     <>
            //       <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">{item.position}</td>
            //       <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-around items-center">
            //         <Link key={index} href={item.external_link}>
            //           <div className="relative h-12 w-12 rounded-full">
            //             <Image
            //               src={item.image}
            //               fill
            //               className="rounded-full"
            //               alt="land image"
            //             />
            //           </div>
            //         </Link>
            //         {item.asset}
            //       </td>
            //       <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">{item.current_price_eth}</td>
            //       <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">{item.buyer === "" || item.buyer === undefined ? "anonymous" : item.buyer}</td>
            //       <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">{item.date}</td>
            //     </>
            //   </tr>
            // ))
          ) : (
            <tr className="w-full h-full flex justify-center items-center">
              <th className="my-20">At this moment we have no top from this metaverse.</th>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}