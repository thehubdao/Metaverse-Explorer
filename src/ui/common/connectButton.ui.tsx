import { Login } from "../../component/login.component"
import { useTheme } from "next-themes";

export default function ConnectButtonUI() {
  const { resolvedTheme } = useTheme();
  return (
    <div className={`mt-6 cursor-pointer lg:px-4 flex justify-center items-center  ${resolvedTheme === 'dark' ? "dark-connect" : ""}`}>
      <Login />
    </div>
  )
}
