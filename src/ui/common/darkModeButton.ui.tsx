import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeButtonUI() {
  const { theme, setTheme } = useTheme();
  const { resolvedTheme } = useTheme();
  const [buttonState, setButtonState] = useState<boolean>(false);

  useEffect(() => {
    if (resolvedTheme === "dark") setButtonState(true);
    else setButtonState(false);
  }, [resolvedTheme]);

  return (
    <div className="w-[77px] h-[39px] bg-[#D3D9E6] shadow-relief-12 dark:bg-[#3B434E] rounded-3xl border-4 border-nm-fill dark:border-nm-dm-fill dark:shadow-dark-toogle mt-6 cursor-pointer" onClick={() => theme == "dark" ? setTheme("light") : setTheme("dark")}>
      <div className={`w-[31px] h-[31px] flex justify-center items-center bg-nm-gray dark:bg-nm-dm-fill shadow-toogle dark:shadow-dark-toogle rounded-full transition-all duration-300 ${buttonState ? "translate-x-[37px]" : "translate-x-0"}`}>
        <div className="w-[21px] h-[21px] bg-nm-gray dark:bg-nm-dm-fill shadow-toogle dark:shadow-dark-toogle rounded-full">

        </div>
      </div>
    </div>
  )
}