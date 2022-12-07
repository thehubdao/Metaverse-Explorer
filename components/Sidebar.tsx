import Link from "next/link";
import { useRouter } from "next/router";

interface Isidebar {
  list: [object]
}

function Button ({url, label, icon, active}: any) {
  return (
    <Link href={url}>
      <div className={active?'bg-green-500':'bg-red-500'}>
        <div>{icon}</div>
        <div>{label}</div>
      </div>
    </Link>
  )
}

function createMenu (list: [object], router: string) {
  return (
    list.map((item: any) => {
      return (
        <Button url={item.url} label={item.label} icon={item.icon} active={router == item.url}/>
      )
    })
  )
}

export default function Sidebar ({list}: Isidebar) {
  const router = useRouter();
  return (
    <div>
      <div>logo</div>
      <div>
        {createMenu(list, router.pathname)}
      </div>
    </div>
  )
}