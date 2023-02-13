interface IIndexItem {
  index: number | string
  isSelected: boolean
  setControlPageIndex: Function
}

const IndexItem = ({ index, isSelected, setControlPageIndex }: IIndexItem) => {
  return (
    <div
      className={`w-14 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in border-t-2 ${isSelected ? 'border-grey-content' : 'border-transparent'} select-none`}
      onClick={() => { typeof index == 'string' ? 0 : setControlPageIndex(index - 1) }}
    >{index}</div >
  )
}

export default IndexItem