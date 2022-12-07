import { useEffect, useState } from "react"
import IndexItem from "./IndexItem"

interface ICenterPages {
  controlPageIndex: number
  pageLenght: number
  setControlPageIndex: Function
}

const CenterPages = ({ controlPageIndex, setControlPageIndex, pageLenght }: ICenterPages) => {
  const [centerArray, setCenterArray] = useState<any[]>([])

  const giveCenterItems = () => {
    const auxArray: any[] = []
    let preCounter = 0, postCounter = 0
    for (let index = controlPageIndex - 2; index <= controlPageIndex + 2; index++) {
      (index >= 1)
        ? (index <= pageLenght)
          ? auxArray.push(<IndexItem index={index} key={index} isSelected={index === controlPageIndex} setControlPageIndex={setControlPageIndex} />)
          : postCounter = postCounter + 1
        : preCounter = preCounter + 1
    }

    if (pageLenght > 6) {
      if (controlPageIndex === 5) {
        auxArray.unshift(<IndexItem index={2} key={-2} isSelected={false} setControlPageIndex={setControlPageIndex} />)
        auxArray.unshift(<IndexItem index={1} key={-1} isSelected={false} setControlPageIndex={setControlPageIndex} />)
      } else if (controlPageIndex === 4) {
        auxArray.unshift(<IndexItem index={1} key={-1} isSelected={false} setControlPageIndex={setControlPageIndex} />)
      } if (controlPageIndex === pageLenght - 4) {
        auxArray.push(<IndexItem index={pageLenght - 1} key={-4} isSelected={false} setControlPageIndex={setControlPageIndex} />)
        auxArray.push(<IndexItem index={pageLenght} key={-3} isSelected={false} setControlPageIndex={setControlPageIndex} />)
      } else if (controlPageIndex === pageLenght - 3) {
        auxArray.push(<IndexItem index={pageLenght} key={-3} isSelected={false} setControlPageIndex={setControlPageIndex} />)
      }
    }


    for (let index = 1; index <= preCounter; index++) {
      if ((4 - preCounter) + index <= pageLenght)
        auxArray.push(<IndexItem index={(5 - preCounter) + index} key={-(5 + index)} isSelected={false} setControlPageIndex={setControlPageIndex} />)
    }
    for (let index = 1; index <= postCounter; index++) {
      if (pageLenght - (4 - postCounter) - index >= 1)
        auxArray.unshift(<IndexItem index={pageLenght - (4 - postCounter) - index} key={-(10 + index)} isSelected={false} setControlPageIndex={setControlPageIndex} />)
    }
    setCenterArray(auxArray)
  }

  useEffect(() => {
    giveCenterItems()
  }, [controlPageIndex, pageLenght])

  return (
    <> {centerArray.map((item) => item)} </>
  )
}

export default CenterPages