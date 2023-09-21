import { BsPlusLg } from "react-icons/bs";

export default function AddLandButtonUI() {
  return (
    <>
      <button className="w-[352px] h-[63px] flex justify-center items-center shadow-relief-32 hover:shadow-relief-12 rounded-2xl gap-8 font-bold text-lm-text dark:text-nm-fill bg-lm-fill dark:bg-nm-dm-fill dark:shadow-dm-relief-12 dark:hover:shadow-dm-relief-32">
        <BsPlusLg />
        Add Land
      </button>
    </>
  )
}