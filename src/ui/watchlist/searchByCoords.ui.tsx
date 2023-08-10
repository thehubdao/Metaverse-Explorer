import { LandProps } from "../../types/valuationTypes";
import { Metaverses } from "../../enums/enums";
import { useState } from "react";
import AddLandButtonUI from "./addLandButton.ui";
interface SearchByCoordsUIProps {
  land?: LandProps;
  metaverse: Metaverses;
}

export default function SearchByCoordsUI({ land, metaverse }: SearchByCoordsUIProps) {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  const handleXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setX(isNaN(value) ? 0 : value);
  };

  const handleYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setY(isNaN(value) ? 0 : value);
  };
  
  return (
    <div className="flex">
      <div className="flex font-normal justify-between text-lm-text gap-3 mr-7">
        <input
          type="number"
          placeholder="X"
          className="shadow-hollow-2  rounded-2xl text-center bg-nm-highlight w-[164px] h-[63px] mr-4"
          onChange={handleXChange}
        />
        <input
          type="number"
          placeholder="Y"
          className="shadow-hollow-2  rounded-2xl text-center bg-nm-highlight w-[164px] h-[63px]"
          onChange={handleYChange}
        />
      </div>
      <AddLandButtonUI/>
    </div>
  )
}