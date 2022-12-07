import IndexItem from "./IndexItem"

interface IPrePages {
  setControlPageIndex: Function
}

const PrePages = ({ setControlPageIndex }: IPrePages) => {
  return (
    <>
      <IndexItem index={1} isSelected={false} setControlPageIndex={setControlPageIndex} />
      <IndexItem index={2} isSelected={false} setControlPageIndex={setControlPageIndex} />
      <IndexItem index={'...'} isSelected={false} setControlPageIndex={setControlPageIndex} />
    </>
  )
}

export default PrePages