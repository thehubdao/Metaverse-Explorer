import { useEffect, useState } from "react";
import { Login } from "../../component/login.component"
import { useTheme } from "next-themes";

export default function ConnectButtonUI() {
  const { resolvedTheme } = useTheme();
  const [buttonState, setButtonState] = useState<boolean>(false);

  useEffect(() => {
    if (resolvedTheme === "dark") setButtonState(true);
    else setButtonState(false);
  }, [resolvedTheme]);
  return (
    <div className={`mt-6 cursor-pointer lg:px-4 flex justify-center items-center  ${buttonState ? "dark-connect" : ""}`}>
      <Login />
    </div>
  )
}
