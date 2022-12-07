import IndexItem from "./IndexItem"

interface IPostPages {
  pageLenght: number
  setControlPageIndex: Function
}

const PostPages = ({ pageLenght = 0, setControlPageIndex }: IPostPages) => {
  return (
    <>
      <IndexItem index={'...'} isSelected={false} setControlPageIndex={setControlPageIndex} />
      <IndexItem index={pageLenght - 1} isSelected={false} setControlPageIndex={setControlPageIndex} />
      <IndexItem index={pageLenght} isSelected={false} setControlPageIndex={setControlPageIndex} />
    </>
  )
}

export default PostPages