import {useEffect, useState} from "react";
import AddLandButtonUI from "./addLandButton.ui";
import { Metaverses } from "../../enums/metaverses.enum";
import { SingleLandAPIResponse } from "../../interfaces/land.interface";

interface SearchByIdUIProps {
  land?: SingleLandAPIResponse;
  metaverse?: Metaverses;
}

export default function SearchByIdUI(props: SearchByIdUIProps) {
  const [tokenId, setTokenId] = useState<string>('');

  // TODO: Remove
  useEffect(() => {
    console.warn(props);
  }, []);
  
  return (
    <div className="flex flex-col sm:flex-row">
        <input
          type="number"
          placeholder="Token ID"
          value={tokenId}
          className="shadow-hollow-2 rounded-2xl text-center w-[230px] lg:w-[352px] h-[63px] bg-nm-highlight dark:bg-nm-black dark:shadow-dm-hollow-8"
          min={0}
          onChange={(event) => setTokenId(event.target.value)}
        />
      <div className="sm:pl-6 pt-5 sm:pt-0">
        <AddLandButtonUI/>
      </div>
    </div>
  )
}