import { Login } from "../../component/login.component"
import { useTheme } from "next-themes";

export default function ConnectButtonUI() {
  const { resolvedTheme } = useTheme();
  return (
    <div className={`w-fit mt-6 cursor-pointer px-4  ${resolvedTheme === 'dark' ? "dark-connect" : ""}`}>
      <Login />
    </div>
  )
}
