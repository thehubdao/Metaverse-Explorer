import { useTheme } from "next-themes";

export default function DarkModeButtonUI() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-[77px] h-[39px] bg-[#D3D9E6] shadow-relief-12 dark:bg-[#3B434E] rounded-3xl border-4 border-nm-fill dark:border-nm-dm-fill dark:shadow-dark-toogle cursor-pointer" onClick={() => theme == "dark" ? setTheme("light") : setTheme("dark")}>
      <div className="w-[31px] h-[31px] flex justify-center items-center bg-nm-gray dark:bg-nm-dm-fill shadow-toogle dark:shadow-dark-toogle rounded-full transition-all duration-300 translate-x-0 dark:translate-x-[37px]">
        <div className="w-[21px] h-[21px] bg-nm-gray dark:bg-nm-dm-fill shadow-toogle dark:shadow-dark-toogle rounded-full">

        </div>
      </div>
    </div>
  )
}