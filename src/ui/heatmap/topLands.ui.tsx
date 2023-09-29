import { useEffect, useState } from "react";
import { Link, Pagination } from "@mui/material";
import Image from "next/image";
import { useTheme } from "next-themes";
import { TopPickLand } from "../../interfaces/itrm/val-analytics.interface";
import Tooltip from "@mui/material/Tooltip";

const pageLength = 5;

interface TopLandsProps {
  tableData: TopPickLand[] | null;
  title: string;
  headers: string[];
}

export default function TopLandsUI({ tableData, title, headers }: TopLandsProps) {
  const [controlPageIndex, setControlPageIndex] = useState<number>(1);
  const [currentPageData, setCurrentPageData] = useState<TopPickLand[] | null>(tableData ? tableData.slice(controlPageIndex - 1, pageLength) : null);
  const { resolvedTheme } = useTheme();
  const numberOfPages = Math.ceil((tableData != null ? tableData.length : 0) / pageLength);

  const changePage = (newPage: number) => {
    const startIndex = (newPage - 1) * pageLength;
    const endIndex = startIndex + pageLength;
    setControlPageIndex(newPage);
    setCurrentPageData(tableData && tableData.slice(startIndex, endIndex));
  }
  console.log(currentPageData, 'curr daa');

  useEffect(() => {
    if (tableData && tableData?.length > 0) changePage(controlPageIndex);
  }, [tableData])

  return (
    <>
      <div className="flex justify-between">
        <p className="text-lm-text dark:text-nm-fill text-lg font-semibold mb-9">{title}</p>
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
          {tableData && tableData.length > 0 ? (
            currentPageData && currentPageData.map((item, index) => (
              <tr key={index} className="flex w-full items-center">
                <>
                  <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">
                    <Link key={index} href={item.external_link}>
                      <div className="relative h-12 w-12 rounded-full">
                        <Image
                          src={item.images.image_url}
                          fill
                          className="rounded-full"
                          alt="land image"
                        />
                      </div>
                    </Link>
                  </td>
                  {
                    item.coords ?

                      <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">
                        <div className="truncate">
                          {`(x:${item.coords.x}, y:${item.coords.y})`}
                        </div>
                      </td>
                      : item.name ?
                        <Tooltip title={item.name} placement="top">
                          <td className="p-4 w-1/5 text-lg rounded-2xl flex">
                            <div className="truncate">
                              {item.name}
                            </div>
                          </td>
                        </Tooltip>
                        : <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">no coords</td>
                  }
                  <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center truncate">{item.current_price_eth.toLocaleString()}</td>
                  <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center truncate">{item.eth_predicted_price.toLocaleString()}</td>
                  <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center truncate">{item.gap.toLocaleString()}%</td>
                </>
              </tr>
            ))
          ) : (
            <tr className="w-full h-full flex justify-center items-center">
              <th className="my-20">At this moment we have no top from this metaverse.</th>
            </tr>
          )}
        </tbody>
      </table>
      <div className="w-full flex justify-center">
        {numberOfPages > 1 &&
          <Pagination
            count={numberOfPages}
            defaultPage={controlPageIndex}
            siblingCount={3} boundaryCount={2}
            shape="rounded"
            size="large"
            onChange={(e, page) => changePage(page)}
            id="pagination"
            className={`${resolvedTheme === 'dark' ? "dark-paginator" : ""}`}
          />
        }
      </div>
    </>
  )
}