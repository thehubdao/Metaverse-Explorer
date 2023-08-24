import Image from "next/image";
import { METAVERSE_FILTERS } from "../../../utils/analyticsChart";
import { Metaverses } from "../../../enums/metaverses.enum";


interface ChartMetaverseFilterSelectorUIProps {
  visibleMetaverses: Metaverses[]; // Array of currently visible metaverses
  setVisibleMetaverses: React.Dispatch<React.SetStateAction<Metaverses[]>>; // Function to set the array of visible metaverses
}

export default function ChartMetaverseFilterSelectorUI({ visibleMetaverses, setVisibleMetaverses }: ChartMetaverseFilterSelectorUIProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, metaverse: Metaverses) => {
    e.preventDefault();
    let copyOfVisibleMetaverses = [...visibleMetaverses];

    // Check if the metaverse is already in the visibleMetaverses array
    if (copyOfVisibleMetaverses.includes(metaverse)) { // If yes, remove it from the array
      copyOfVisibleMetaverses = copyOfVisibleMetaverses.filter((item) => item !== metaverse);
    } else { // If not, add it to the array
      copyOfVisibleMetaverses.push(metaverse);
    }

    // Update the state with the modified array of visible metaverses
    setVisibleMetaverses(copyOfVisibleMetaverses);
  };

  return (
    <div className="flex gap-3">
      {/* Mapping through the available metaverse filters */}
      {METAVERSE_FILTERS.map(item => {
        return (
          <button
            key={item.metaverse}
            className={`rounded-lg w-12 h-12 bg-lm-fill flex justify-center items-center
            ${(visibleMetaverses.includes(item.metaverse)) ? 'shadow-hollow-8' : 'shadow-relief-12'}
            transition-all duration-300`}
            onClick={(e) => handleClick(e, item.metaverse)}
          >
            {/* Image representing the metaverse */}
            <Image
              width={30}
              height={30}
              alt={item.metaverse}
              src={item.imageUrl}
            />
          </button>
        );
      })}
    </div>
  );
}
