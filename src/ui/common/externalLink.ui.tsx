import Image from "next/image";

interface ExternalLinkProps{
  text: string;
  icon: string;
  externalLink: string;
}

export default function ExternalLinkUI({text, icon, externalLink}:ExternalLinkProps) {
  return (
    <div
      onClick={() => { window.open(externalLink, '_blank') }}
      className="w-auto flex gap-2 justify-start items-center duration-150 rounded-2xl p-2 cursor-pointer h-15"
    >
      <Image src={icon} loading='lazy' className="rounded-3xl" width={20} height={20} alt="icon"/>
      <p className="text-sm font-bold hover:text-nm-selected dark:hover:text-nm-selected  dark:text-lm-text-gray">{text}</p>
    </div>
  )
}