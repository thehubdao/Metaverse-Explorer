import { useEffect, useState } from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import { TopDate, TopSellingFilterBy, TopSellingLand } from "../../interfaces/itrm/val-analytics.interface";
import TopSellsFilterUI from "./topSellsFilter.ui";
import Tooltip from "@mui/material/Tooltip";

interface TopSellsLandsUIProps {
  tableData: TopSellingLand | null;
  title: string;
  headers: string[];
}

export default function TopSellsLandsUI({ tableData, title, headers }: TopSellsLandsUIProps) {
  const [currentPageData, setCurrentPageData] = useState<TopDate[] | null>(null);
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
      if (filteredData && filteredData.length > 0) {
        const result = filteredData.filter(data => data.dataTable)
        if (result.length > 0) setCurrentPageData(filteredData);
        else setCurrentPageData(null);
      }
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
          {currentPageData ? currentPageData.map((item, index) => (
            <tr key={index} className="flex w-full items-center">
              <>
                <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">{item.position}</td>
                <Tooltip title={item.dataTable?.asset} placement="top">
                  <td className="p-4 w-1/5 text-lg rounded-2xl flex  items-center">
                    <Link key={index} href={item.dataTable?.external_link}>
                      <div className="relative h-12 w-12 rounded-full">
                        <Image
                          src={item.dataTable?.image ?? ""}
                          fill
                          className="rounded-full"
                          alt="land image"
                        />
                      </div>
                    </Link>
                    <div className="truncate pl-2">
                      {item.dataTable?.asset}
                    </div>
                  </td>
                </Tooltip>
                <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">not available</td>
                <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">anonymous</td>
                <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">{item.dataTable?.date?.toString() ?? "no date available"}</td>
              </>
            </tr>
          ))
            :
            <tr className="w-full h-full flex justify-center items-center">
              <th className="my-20">At this moment we have no top from this metaverse.</th>
            </tr>
          }
        </tbody>
      </table>
    </>
  )
}