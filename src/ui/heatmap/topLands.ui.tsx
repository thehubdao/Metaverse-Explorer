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

  useEffect(() => {
    if (tableData && tableData?.length > 0) changePage(controlPageIndex);
  }, [tableData])

  return (
    <>
      <p className="text-lm-text dark:text-nm-fill text-lg font-semibold mt-10 mb-4 block lg:hidden">{title}</p>
      <div className="bg-lm-fill dark:bg-nm-dm-fill rounded-3xl w-full lg:mt-10 lg:py-10 lg:px-12 relative overflow-x-auto">
        <p className="text-lm-text dark:text-nm-fill text-lg font-semibold mb-9 hidden lg:block">{title}</p>
        <table className="w-full min-w-[664px]">
          <thead className="w-full">
            <tr className="flex w-full items-center text-lm-text dark:text-nm-fill font-bold bg-nm-gray dark:bg-[#32363C] rounded-t lg:rounded-xl">
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
                    <Tooltip title={item.gap.toLocaleString()} placement="top">
                      <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center truncate">
                        <div className="truncate">
                          {item.gap.toLocaleString()}%
                        </div>
                      </td>
                    </Tooltip>
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
        <div className="w-full justify-center pb-5 lg:pb-0 hidden lg:flex">
          {numberOfPages > 1 &&
            <Pagination
              count={numberOfPages}
              defaultPage={controlPageIndex}
              siblingCount={3} boundaryCount={2}
              shape="rounded"
              size="large"
              onChange={(e, page) => changePage(page)}
              id="pagination"
              className={`${resolvedTheme === 'dark' ? "dark-paginator" : ""} `}
            />
          }
        </div>
      </div>
      <div className="w-full flex lg:hidden justify-center pb-5 mt-3">
          {numberOfPages > 1 &&
            <Pagination
              count={numberOfPages}
              defaultPage={controlPageIndex}
              siblingCount={0} boundaryCount={1}
              shape="rounded"
              size="large"
              onChange={(e, page) => changePage(page)}
              id="pagination"
              className={`${resolvedTheme === 'dark' ? "dark-paginator" : ""} `}
            />
          }
        </div>
    </>
  )
}