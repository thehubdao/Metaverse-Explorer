import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { TraitFilter } from "../../lib/nftValuation/nftCommonTypes";
import { Fade } from 'react-awesome-reveal'
import { typedKeys } from '../../lib/utilities'
interface Props {
	filterBy: TraitFilter;
	setFilterBy: React.Dispatch<React.SetStateAction<TraitFilter>>;
}

export default function FilterTraits ({ filterBy, setFilterBy }: Props){
	const [opened, setOpened] = useState(false);

	const filterOptions = {
		background: {
			name: "Background",
			description: "",
		},
		dance: {
			name: "Dance",
			description: "",
		},
		music: {
			name: "Music",
			description: "",
		},
		expression: {
			name: "Expression",
			description: "",
		},
		ears: {
			name: "Ears",
			description: "",
		},
		nose: {
			name: "Nose",
			description: "",
		},
		mouth: {
			name: "Mouth",
			description: "",
		},
		head: {
			name: "Head",
			description: "",
		},
		neck: {
			name: "Neck",
			description: "",
		},
		top: {
			name: "Top",
			description: "",
		},
		eyewear: {
			name: "Eyewear",
			description: "",
		},
		eyes: {
			name: "Eyes",
			description: "",
		},
		fur: {
			name: "Fur",
			description: "",
		},
		sex: {
			name: "Sex",
			description: "",
		},
	};

	return (
    <div className="flex flex-col">
    <button
			onClick={() => setOpened(!opened)}
			className=" items-center tracking-wider font-plus font-medium text-grey-content flex justify-between cursor-pointer transition-all"
		>   
        {/* Name  */}
        <p className='hidden sm:block'>
          {filterOptions[filterBy].name}
        </p>
        {/* Down/Up Arrow */}
        <IoIosArrowDown
          className={
            (opened ? 'rotate-180 ' : '') +
            'transition-all duration-500 relative bottom-[1px]'
          } 
        />
		</button>
    <div
        className={(opened && 'mb-1 md:mb-0') + 'md:absolute flex flex-col gap-2'}
      >
        {opened &&
          typedKeys(filterOptions).map(
            (filter) =>
              filter !== filterBy && (
                <Fade duration={500} key={filter} direction='down'>
                  <button
                    className=' flex gap-4 bg-opacity-100 items-center font-plus font-medium text-grey-content w-96 text-sm md:text-base'
                    onClick={() => {
                      setFilterBy(filter)
                      setOpened(false)
                    }} 

                  >
                    <div>
                      {filterOptions[filter].name}
                    </div>
                  </button>
                </Fade>
              )
          )}
      </div>
    </div>
		
	);
};
