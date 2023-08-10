import { LandProps } from "../../types/valuationTypes";
import { Metaverses } from "../../enums/enums";
import { useState } from "react";
import AddLandButtonUI from "./addLandButton.ui";

interface SearchByIdUIProps {
  land?: LandProps;
  metaverse: Metaverses;
}

export default function SearchByIdUI({ land, metaverse }: SearchByIdUIProps) {

  const [tokenId, setTokenId] = useState<string>('');
  return (
    <div className="flex">
      <div className="mr-6">
        <input
          type="number"
          placeholder="Token ID"
          className="shadow-hollow-2 rounded-2xl text-center w-[352px] h-[63px] bg-nm-highlight"
          min={0}
          onChange={(event) => {
            setTokenId(event.target.value)
          }}
        />
      </div>
      <AddLandButtonUI/>
    </div>
  )
}