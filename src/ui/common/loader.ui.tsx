import LogoUI from "./logo.ui";

interface LoaderUIProps {
  size: number;
  text?: string;
}

export default function LoaderUI({ size, text }: LoaderUIProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div style={{ width: size, height: size }} className="text-center">
        <LogoUI />
        <p className='text-lm-text dark:text-nm-fill text-xs font-semibold mt-2'>{text}</p>
      </div>
    </div>
  )
}