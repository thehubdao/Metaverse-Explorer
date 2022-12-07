import { TopSellingRequestItem } from "../../../types/TopSelling"

type MapAtribute =
|  'asset'
|  'date'
|  'external_link'
|  'image'
|  'buyer'
|  'eth_price'
|  'symbol'

export const handleOrderRank = (sortDir: boolean, setSortDir: Function, data: [key: TopSellingRequestItem], setData: Function) => {
  let sortArray = data
  sortArray.sort((a: TopSellingRequestItem, b: TopSellingRequestItem) => {
    if (sortDir) {
      return a['position'] - b['position']
    } else {
      return - (a['position'] - b['position'])
    }
  })
  setSortDir(!sortDir)
  setData(sortArray)
}

export const handleOrderPrice = (sortDir: boolean, setSortDir: Function, data: [key: TopSellingRequestItem], setData: Function) => {
  let sortArray = data
  sortArray.sort((a: TopSellingRequestItem, b: TopSellingRequestItem) => {
    let returns = 0
    if (parseFloat(a.dataTable.eth_price) > parseFloat(b.dataTable.eth_price))
      returns = 1
    if (parseFloat(a.dataTable.eth_price) < parseFloat(b.dataTable.eth_price))
      returns = -1
    return sortDir ? returns : - returns
  })
  setSortDir(!sortDir)
  setData(sortArray)
}

export const handleOrderValuation = (sortDir: boolean, setSortDir: Function, data: [key: TopSellingRequestItem], setData: Function) => {
  let sortArray = data
  sortArray.sort((a: TopSellingRequestItem, b: TopSellingRequestItem) => {
    let returns = 0
    if (parseFloat(a.dataTable.valuation) > parseFloat(b.dataTable.valuation))
      returns = 1
    if (parseFloat(a.dataTable.valuation) < parseFloat(b.dataTable.valuation))
      returns = -1
    return sortDir ? returns : - returns
  })
  setSortDir(!sortDir)
  setData(sortArray)
}

export const handleOrder = ( atribute: MapAtribute, sortDir: boolean, setSortDir: Function, data: [key: TopSellingRequestItem], setData: Function ) => {
  let sortArray = data
  sortArray.sort((a: TopSellingRequestItem, b: TopSellingRequestItem) => {
    let returns = 0
    if (a.dataTable[atribute] > b.dataTable[atribute])
      returns = 1
    if (a.dataTable[atribute] < b.dataTable[atribute])
      returns = -1
    return sortDir ? returns : - returns
  })
  setSortDir(!sortDir)
  setData(sortArray)
}

export const handleDate = (sortDir: boolean, setSortDir: Function, data: [key: TopSellingRequestItem], setData: Function) => {
  let sortArray = data
  sortArray.sort((a: TopSellingRequestItem, b: TopSellingRequestItem) => {
    let returns = 0
    const dateA = Date.parse(a.dataTable.date)/1000
    const dateB = Date.parse(b.dataTable.date)/1000
    if (dateA > dateB)
      returns = 1
    else
      returns = -1
    return sortDir ? returns : - returns
  })
  setSortDir(!sortDir)
  setData(sortArray)
}