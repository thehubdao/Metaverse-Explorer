import { LandProps } from "../../types/valuationTypes";
import { Metaverses } from "../../enums/enums"
import { useState } from "react";
import AddLandButtonUI from "./addLandButton.ui";

interface SearchByIdUIProps {
  land?: LandProps,
  metaverse: Metaverses;
}

export default function SearchByIdUI({ land, metaverse }: SearchByIdUIProps) {

  const [tokenId, setTokenId] = useState<string>()
  return (
    <div className="flex flex-col">
      <div className="w-full mb-4">
        <input
          type="number"
          placeholder="Token ID"
          className="shadow-hollow-8 focus:outline-none p-4 rounded-2xl text-center w-full bg-lm-fill"
          min={0}
          onChange={(input) => {
            setTokenId(input.target.value)
          }}
        />
      </div>
      <AddLandButtonUI/>
    </div>
  )
}