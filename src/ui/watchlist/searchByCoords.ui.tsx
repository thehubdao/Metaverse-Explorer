import {useEffect, useState} from "react";
import AddLandButtonUI from "./addLandButton.ui";
import { LandProps } from "../../types/valuationTypes";
import { MetaverseOptionsKey } from "../../enums/metaverses.enum";

interface SearchByCoordsUIProps {
  land?: LandProps;
  metaverse: MetaverseOptionsKey;
}

export default function SearchByCoordsUI(props: SearchByCoordsUIProps) {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  
  // TODO: remove
  useEffect(() => {
    console.warn(props);
  }, []);
  
  return (
    <div className="flex">
      <div className="flex font-normal justify-between text-lm-text gap-3">
        <input
          type="number"
          placeholder="X"
          value={x}
          className="shadow-hollow-2  rounded-2xl text-center bg-nm-highlight w-[164px] h-[63px] mr-3"
          onChange={(e) => setX(e.target.valueAsNumber)}
        />
        <input
          type="number"
          placeholder="Y"
          value={y}
          className="shadow-hollow-2  rounded-2xl text-center bg-nm-highlight w-[164px] h-[63px]"
          onChange={(e) => setY(e.target.valueAsNumber)}
        />
      </div>
      <div className="pl-6">
        <AddLandButtonUI/>
      </div>
    </div>
  )
}