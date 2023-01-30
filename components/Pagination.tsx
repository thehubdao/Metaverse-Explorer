import CenterPages from "./General/Pagination/CenterPages"
import PostPages from "./General/Pagination/PostPages"
import PrePages from "./General/Pagination/PrePages"

interface IPagination {
  pageLenght: number
  controlPageIndex: number
  setControlPageIndex: Function
}

const Pagination = ({ pageLenght, controlPageIndex, setControlPageIndex }: IPagination) => {
  return (
    <div className="w-full flex flex-col items-center mt-12">
      <div className="w-full flex text-grey-content justify-center space-x-10 items-center">
        <button
          className="h-8 w-8 mr-1 flex justify-center items-center  cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            controlPageIndex > 1
              ? setControlPageIndex(controlPageIndex - 2)
              : 0
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="feather feather-chevron-left w-6 h-6">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div className="flex h-10 space-x-8 font-plus text-xl">
          {
            (controlPageIndex - 3) > 2
              ? <PrePages setControlPageIndex={setControlPageIndex} />
              : <></>
          }
          <CenterPages
            setControlPageIndex={setControlPageIndex}
            controlPageIndex={controlPageIndex}
            pageLenght={pageLenght}
          />
          {
            (controlPageIndex + 4) < pageLenght
              ? <PostPages pageLenght={pageLenght} setControlPageIndex={setControlPageIndex} />
              : <></>
          }
        </div>
        <button
          className="h-8 w-8 ml-1 flex justify-center items-center  cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            controlPageIndex < pageLenght
              ? setControlPageIndex(controlPageIndex)
              : 0
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="feather feather-chevron-right w-6 h-6">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Pagination