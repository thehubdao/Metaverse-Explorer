import { LandProps } from "../../types/valuationTypes";
import { Metaverses } from "../../enums/enums"
import { useState } from "react";
import AddLandButtonUI from "./addLandButton.ui";
interface SearchByCoordsUIProps {
  land?: LandProps,
  metaverse: Metaverses;
}

export default function SearchByCoordsUI({ land, metaverse }: SearchByCoordsUIProps) {
  const [x, setX] = useState<number>();
  const [y, setY] = useState<number>();

  const handleXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setX(isNaN(value) ? undefined : value);
  };

  const handleYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setY(isNaN(value) ? undefined : value);
  };
  
  return (
    <div className="flex flex-col">
      <div className="flex font-normal justify-center text-nm-dm-icons placeholder-gray-300 gap-3 mb-4">
        <input
          type="number"
          placeholder="X"
          className="shadow-inset focus:outline-none p-4 rounded-full text-center"
          onChange={handleXChange}
        />
        <input
          type="number"
          placeholder="Y"
          className="shadow-inset focus:outline-none p-4 rounded-full text-center"
          onChange={handleYChange}
        />
      </div>
      <AddLandButtonUI/>
    </div>
  )
}