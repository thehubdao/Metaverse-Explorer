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
    <div className="flex flex-col">
      <div className="flex font-normal justify-center text-lm-text placeholder-gray-300 gap-3 mb-4">
        <input
          type="number"
          placeholder="X"
          className="shadow-hollow-8 focus:outline-none p-4 rounded-2xl text-center bg-lm-fill"
          onChange={handleXChange}
        />
        <input
          type="number"
          placeholder="Y"
          className="shadow-hollow-8 focus:outline-none p-4 rounded-2xl text-center bg-lm-fill"
          onChange={handleYChange}
        />
      </div>
      <AddLandButtonUI/>
    </div>
  )
}