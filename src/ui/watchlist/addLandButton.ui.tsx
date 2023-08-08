import { BsPlusLg } from "react-icons/bs";

export default function AddLandButtonUI() {
  return (
    <>
      <button className="w-full flex justify-center items-center mt-4 shadow-relief-32 hover:shadow-relief-16 py-4 px-10 rounded-2xl gap-8 font-bold text-lm-text bg-lm-fill">
        <BsPlusLg />
        Add Land
      </button>
    </>
  )
}