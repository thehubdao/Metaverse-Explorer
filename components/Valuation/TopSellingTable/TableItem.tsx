import { Metaverse } from "../../../lib/metaverse"
import { TopSellingDataTable, TopSellingRequestItem } from "../../../types/valuation/TopSelling"

const getExternalLink = (metaverse: Metaverse, dataTable: TopSellingDataTable) => {
  return metaverse === 'somnium-space' ? ("https://somniumspace.com/parcel/" + dataTable.landId) : dataTable.external_link
}

const TableItem = ({ item, metaverse }: { item: TopSellingRequestItem, metaverse: Metaverse }) => {
  let dataTable: TopSellingDataTable | any = item.dataTable || null

  const priceLoader = () => {
    if (dataTable.price == 0)
      return <span className="mr-2">Loading...</span>
    return <span className="mr-2">{`${Number.parseFloat(dataTable.eth_price).toFixed(3)} ${dataTable.symbol}`}</span>
  }

  const valuationLoader = () => {
    if (typeof (dataTable?.valuation) === 'string')
      return <span className="mr-2">{dataTable.valuation}</span>
    return <span className="mr-2">{`${Number.parseFloat(dataTable.valuation).toFixed(3)} ${dataTable.symbol}`}</span>
  }

  const buyerControl = (buyer: string | undefined) => {
    if (!buyer) return 'anonymous'

    if (buyer.length > 20) {
      buyer = `${buyer.substring(0, 2)}...${buyer.substring(-3)}`
    }

    return buyer
  }

  const tdStyle = "border-t-0 px-4 border-l-0 border-r-0 text-md lg:text-lg whitespace-nowrap p-4 text-center"

  return (
    <tr>
      <td className={tdStyle}>{item.position}</td>
      <th className={`${tdStyle} text-left flex items-center font-plus`}>
        <img src={dataTable.image} className="h-12 w-12 bg-white rounded-full border" alt={`Land ${dataTable.asset} image`} />
        <span className="ml-3 font-normal text-grey-content">
          <a className="hover:underline text-grey-content" href={getExternalLink(metaverse, dataTable)} target='_blank'>
            {dataTable.asset}
          </a>
        </span>
      </th>
      <td className={tdStyle} >
        {priceLoader()}
      </td>
      <td className={tdStyle} >
        {valuationLoader()}
      </td>
      <td className={`${tdStyle} text-xs`} >
        <span>{buyerControl(dataTable.buyer)}</span>
      </td>
      <td className={tdStyle} >
        <span>{dataTable.date}</span>
      </td>
    </tr>
  )
}

export default TableItem