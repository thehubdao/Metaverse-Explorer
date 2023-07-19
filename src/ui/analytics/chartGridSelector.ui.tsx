import Image from "next/image";

export default function ChartGridSelector() {
  return (
    <div className="flex justify-center items-center gap-3">
      <button className="grid rounded-md  w-12 h-12 place-content-center justify-items-center shadow-relief-12 bg-nm-fill">
        <Image
          src='/images/icons/chart/two-col.svg'
          width={22}
          height={16}
          alt="button to change charts grid to 2 cols"
        />
      </button>
      <button className="grid rounded-md w-12 h-12 place-content-center shadow-relief-12 bg-nm-fill">
        <Image
          src='/images/icons/chart/one-col.svg'
          width={27}
          height={20}
          alt="button to change charts grid to 2 cols"
        />
      </button>
    </div>
  )
}