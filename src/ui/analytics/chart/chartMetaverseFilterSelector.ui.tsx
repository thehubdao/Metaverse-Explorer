import Image from "next/image";
import { METAVERSE_FILTERS } from "../../../utils/analyticsChart";
import { Metaverses } from "../../../enums/common";

// Interface for props used in the component.
interface ChartMetaverseFilterSelectorUIProps {
  visibleMetaverses: Metaverses[]; // Array of currently visible metaverses
  setVisibleMetaverses: React.Dispatch<React.SetStateAction<Metaverses[]>>; // Function to set the array of visible metaverses
}

//* React functional component responsible for rendering the metaverse filter selector UI.
export default function ChartMetaverseFilterSelectorUI({ visibleMetaverses, setVisibleMetaverses }: ChartMetaverseFilterSelectorUIProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, metaverse: Metaverses) => {
    e.preventDefault();
    let copyOfVisibleMetaverses = [...visibleMetaverses];

    // Check if the metaverse is already in the visibleMetaverses array
    if (copyOfVisibleMetaverses.includes(metaverse)) {
      // If yes, remove it from the array
      copyOfVisibleMetaverses = copyOfVisibleMetaverses.filter((item) => item !== metaverse);
    } else {
      // If not, add it to the array
      copyOfVisibleMetaverses.push(metaverse);
    }

    // Update the state with the modified array of visible metaverses
    setVisibleMetaverses(copyOfVisibleMetaverses);
  };

  return (
    // Container for the metaverse filter selector buttons
    <div className="flex gap-3">
      {/* Mapping through the available metaverse filters */}
      {METAVERSE_FILTERS.map(item => {
        return (
          <button
            key={item.metaverse} // React key to identify each button uniquely
            className={`rounded-lg w-12 h-12 bg-lm-fill flex justify-center items-center
            ${(visibleMetaverses.includes(item.metaverse)) ? 'shadow-hollow-8' : 'shadow-relief-12'}
            transition-all duration-300`} // Dynamically generated class based on the visibility of the metaverse
            onClick={(e) => handleClick(e, item.metaverse)}
          >
            {/* Image representing the metaverse */}
            <Image
              width={30} // Width of the image
              height={30} // Height of the image
              alt={item.metaverse} // Alternate text for accessibility
              src={item.imageUrl} // Image URL
            />
          </button>
        );
      })}
    </div>
  );
}
