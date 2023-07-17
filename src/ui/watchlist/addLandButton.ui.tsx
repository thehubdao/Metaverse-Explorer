import { BsPlusLg } from "react-icons/bs";

export default function AddLandButtonUI() {
  return (
    <>
      <button className="w-full flex justify-center items-center mt-4 shadow-relief-16 hover:shadow-relief-12 py-4 px-10 rounded-full gap-8 font-bold">
        <BsPlusLg />
        Add Land
      </button>
    </>
  )
}