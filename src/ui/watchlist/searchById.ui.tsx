import { LandProps } from "../../types/valuationTypes";
import { useState } from "react";
import AddLandButtonUI from "./addLandButton.ui";
import { MetaverseOptionsKey } from "../../enums/metaverses.enum";

interface SearchByIdUIProps {
  land?: LandProps;
  metaverse?: MetaverseOptionsKey;
}

export default function SearchByIdUI({ land, metaverse }: SearchByIdUIProps) {

  const [tokenId, setTokenId] = useState<string>('');
  return (
    <div className="flex">
      <div>
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
      <div className="pl-6">
        <AddLandButtonUI/>
      </div>
    </div>
  )
}