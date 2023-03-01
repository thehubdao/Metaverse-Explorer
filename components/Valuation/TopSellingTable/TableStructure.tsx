import { useEffect, useState } from "react"
import TableItem from "./TableItem"
import { handleOrder, handleOrderRank, handleOrderPrice, handleDate, handleOrderValuation } from "../../../lib/valuation/topSellingLands/Order"
import { TopSellingRequestItem } from "../../../types/valuation/TopSelling"
import { Metaverse } from "../../../lib/metaverse"

interface filterBy {
  element: String,
  data: [key: TopSellingRequestItem]
}

const TableStructure = ({ filterby, metaverse }: { filterby: filterBy, metaverse: Metaverse }) => {
  const filterData = (data: any) => {
    let result: any = []
    data.map((value: any) => value.position ? result.push(value) : false)
    return result
  }

  const [response, setResponse] = useState<[key: TopSellingRequestItem]>(filterData(filterby.data))
  const [sortDir, setSortDir] = useState<boolean>(false)

  const thStyle = " p-4 w-1/5 align-middle text-xs lg:text-lg border-l-0 border-r-0 whitespace-nowrap font-bold bg-grey-dark text-grey-content font-plus cursor-pointer"

  useEffect(() => {
    setResponse(filterData(filterby.data))
  }, [filterby])

  return (
    <>
      {
        response[0] ?
          <table className="items-center w-full bg-transparent border-collapse text-grey-content font-plus">
            <thead>
              <tr className="bg-grey-dark rounded-xl text-center">
                <th className={thStyle} onClick={() => handleOrderRank(sortDir, setSortDir, response, setResponse)} >Rank</th>
                <th className={thStyle} onClick={() => handleOrder('asset', sortDir, setSortDir, response, setResponse)}>Asset</th>
                <th className={thStyle} onClick={() => handleOrderPrice(sortDir, setSortDir, response, setResponse)}>Price</th>
                <th className={thStyle} onClick={() => handleOrderValuation(sortDir, setSortDir, response, setResponse)}>Valuation</th>
                <th className={thStyle} onClick={() => handleOrder('buyer', sortDir, setSortDir, response, setResponse)}>Buyer</th>
                <th className={thStyle} onClick={() => handleDate(sortDir, setSortDir, response, setResponse)}>Purchased</th>
              </tr>
            </thead>
            <tbody className="bg-transparent items-center w-full h-52">
              {
                response.map((value) => <TableItem key={value.position} item={value} metaverse={metaverse} />)
              }
            </tbody>
          </ table> :
          <h3 className="px-6 text-lg text-white">NO LANDS</h3>
      }
    </>
  )
}

export default TableStructure