export default function ChartTimeFilterSelector() {
  return (
    <div className="flex justify-center items-center gap-3">
      <button className="rounded-md w-12 h-12 shadow-relief-12 bg-nm-fill">
        D
      </button>
      <button className="rounded-md w-12 h-12 shadow-relief-12 bg-nm-fill">
        W
      </button>
      <button className="rounded-md w-12 h-12 shadow-relief-12 bg-nm-fill">
        M
      </button>
      <button className="rounded-md w-12 h-12 shadow-relief-12 bg-nm-fill">
        ALL
      </button>
    </div>
  )
}