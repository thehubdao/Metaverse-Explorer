import { useState } from "react"
import { TraitFilter } from "../../lib/nftValuation/nftCommonTypes"


interface Props {
    filterBy: TraitFilter
    setFilterBy: React.Dispatch<React.SetStateAction<TraitFilter>>
    traits: {
        atributo: number
    }
  }

const FilterTraits = ({ filterBy, setFilterBy, traits }: Props) => {
    const [opened, setOpened] = useState(false)

    const filterOptions = {
        background: {
            value: 
                'Backalley' ,

        },

    }


    return (
    <button
        onClick={() => setOpened(!opened)}
        className='h-16 gray-box bg-grey-bone mb-2 items-center w-96 tracking-wider font-plus font-medium text-grey-content hover:text-[#7c7b7b] flex justify-between cursor-pointer transition-all'
      >

    {/*         
        {/* Icon 
        <span className='hidden sm:block text-lg'>
          {filterOptions[filterBy].value}
          
        </span>

        {/* Name 
        <p className='hidden sm:block'>
          {filterOptions[filterBy].shortName ?? filterOptions[filterBy].name}
        </p>
        {/* Mobile Name 
        <p className='block sm:hidden'>Stats</p>
        {/* Down/Up Arrow 
        <IoIosArrowDown
          className={
            (isPremium ? '' : 'opacity-0 ') +
            (opened ? 'rotate-180 ' : '') +
            'transition-all duration-500 relative bottom-[1px]'
          } 
        />*/}
    </button>
    )
    

}

export default FilterTraits