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
      <div className="flex flex-wrap lg:hidden justify-between mt-10 mb-4">
        <p className="text-lm-text dark:text-nm-fill text-lg font-semibold mb-4">{title}</p>
        <TopSellsFilterUI filterBy={filterBy} setFilterBy={setFilterBy} />
      </div>

      <div className="bg-lm-fill dark:bg-nm-dm-fill rounded-3xl w-full lg:mt-10 lg:py-10 lg:px-12 relative overflow-x-auto">
        <div className="justify-between hidden lg:flex">
          <p className="text-lm-text dark:text-nm-fill text-lg font-semibold mb-9">{title}</p>
          <TopSellsFilterUI filterBy={filterBy} setFilterBy={setFilterBy} />
        </div>
        <table className="w-full min-w-[664px]">
          <thead className="w-full">
            <tr className="flex w-full items-center text-lm-text dark:text-nm-fill font-bold bg-nm-gray dark:bg-[#32363C] rounded-t lg:rounded-xl">
              {headers.map((header, index) => (
                <th key={index} className="p-4 w-1/5 text-lg">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="flex-col items-center justify-between w-full">
            {currentPageData ? currentPageData.map((item, index) => (
              <tr key={index} className="flex w-full items-center">
                <>
                  <td className="p-4 w-1/5 text-lg flex justify-center">{item.position}</td>
                  <Tooltip title={item.dataTable?.asset} placement="top">
                    <td className="p-4 w-1/5 text-lg flex  items-center">
                      <Link key={index} href={item.dataTable?.external_link}>
                        <div className="relative h-12 w-12 rounded-full">
                          <Image
                            src={item.dataTable?.image ?? ""}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                  <td className="p-4 w-1/5 text-lg flex justify-center">not available</td>
                  <td className="p-4 w-1/5 text-lg flex justify-center">anonymous</td>
                  <td className="p-4 w-1/5 text-lg flex justify-center">{item.dataTable?.date?.toString() ?? "no date available"}</td>
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
      </div>
    </>
  )
}