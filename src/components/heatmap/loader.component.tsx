import {LogoColors} from "../../types/heatmap/heatmap.type";
import Logo from "./logo.component";

interface LoaderProps {
  size: number;
  color: LogoColors;
}

export default function Loader({ size, color }: LoaderProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div style={{ width: size, height: size }}>
        <Logo color={color} />
      </div>
    </div>
  )
}