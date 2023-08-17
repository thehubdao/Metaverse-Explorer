import { useState } from "react";
import { Link, Pagination } from "@mui/material";
import Image from "next/image";
import { TopLandForm } from "../../enums/common.enum";
import { TopSellingFilterBy } from "./topSellsFilter.ui";
import { TopLandsData } from "../../interfaces/heatmap.interface";
import TopSellsFilterUI from "./topSellsFilter.ui";

const pageLength = 5;

interface TopLandsProps {
  tableData: TopLandsData[];
  title: string;
  headers: string[];
  form: TopLandForm;
}

export default function TopLandsUI({ tableData, title, headers, form }: TopLandsProps) {
  const [numberOfPages, setNumberOfPages] = useState<number>(Math.ceil(tableData.length / pageLength));
  const [controlPageIndex, setControlPageIndex] = useState<number>(1);
  const [currentPageData, setCurrentPageData] = useState<TopLandsData[]>(tableData.slice(controlPageIndex - 1, pageLength));
  const [filterBy, setFilterBy] = useState<TopSellingFilterBy>("totalTop");

  const changePage = (newPage: number) => {
    const startIndex = (newPage - 1) * pageLength;
    const endIndex = startIndex + pageLength;
    setControlPageIndex(newPage);
    setCurrentPageData(tableData.slice(startIndex, endIndex));
  }

  return (
    <>
      <div className="flex justify-between">
        <p className="text-lm-text text-lg font-semibold mb-9">{title}</p>
        {
          form === TopLandForm.Sells && <TopSellsFilterUI filterBy={filterBy} setFilterBy={setFilterBy} />
        }
      </div>
      <table className="w-full table-fixed border-collapse">
        <thead className="w-full">
          <tr className="flex w-full items-center text-lm-text font-bold bg-nm-gray rounded-xl">
            {headers.map((header, index) => (
              <th key={index} className="p-4 w-1/5 text-lg rounded-2xl">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="flex-col items-center justify-between w-full">
          {tableData.length > 0 ? (
            currentPageData.map((item, index) => (
              <tr key={index} className="flex w-full items-center">
                {
                  form === TopLandForm.Sells ?
                    <>
                      <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">{item.position}</td>
                      <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-around items-center">
                        <Link key={index} href={item.external_link}>
                          <div className="relative h-12 w-12 rounded-full">
                            <Image
                              src={item.image}
                              fill
                              className="rounded-full"
                              alt="land image"
                            />
                          </div>
                        </Link>
                        {item.asset}
                      </td>
                      <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">{item.current_price_eth}</td>
                      <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">{item.buyer === "" || item.buyer === undefined ? "anonymous" : item.buyer}</td>
                      <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">{item.date}</td>
                    </>
                    :
                    <>
                      <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">
                        <Link key={index} href={item.external_link}>
                          <div className="relative h-12 w-12 rounded-full">
                            <Image
                              src={item.image}
                              fill
                              className="rounded-full"
                              alt="land image"
                            />
                          </div>
                        </Link>
                      </td>
                      <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">{item.coords}</td>
                      <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">{item.current_price_eth}</td>
                      <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">{item.eth_predicted_price}</td>
                      <td className="p-4 w-1/5 text-lg rounded-2xl flex justify-center">{item.gap}%</td>
                    </>
                }
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
          />
        }
      </div>
    </>
  )
}