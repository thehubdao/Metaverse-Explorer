import { BiTargetLock, BiTransferAlt, BiBullseye } from 'react-icons/bi';
import { FiMap } from 'react-icons/fi';
import { MdAttachMoney } from 'react-icons/md';
import { VscGraphLine } from 'react-icons/vsc';
import Image from 'next/image';
import { Tooltip } from '@mui/material';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { MapFilter } from '../../types/heatmap/heatmap.type';

interface MapChooseFilterUIProps {
  filterBy: MapFilter;
  setFilterBy: React.Dispatch<React.SetStateAction<MapFilter>>;
  selectfilter: boolean;
  setSelectfilter: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectMetaverse: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectCoord: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MapChooseFilterUI({ filterBy, setFilterBy, selectfilter, setSelectfilter, setSelectMetaverse, setSelectCoord }: MapChooseFilterUIProps) {

  const filterOptions = {
    basic: {
      name: 'Basic',
      icon: <FiMap />,
      description: 'Quickly find undervalued LANDs when clicking on the squares in the map',
    },
    eth_predicted_price: {
      name: 'Predicted Price',
      icon: <BiTargetLock />,
      description:
        'This filter shows the estimated price of the LANDs in a specific area of the map. green = low price estimation, red = high price estimation',
    },
    floor_adjusted_predicted_price: {
      name: 'Floor Adjusted Predicted Price',
      icon: <BiBullseye />,
      description:
        'This filter adjusts the price predictions to the floor price of the collection e.g., if the price prediction is below the floor price, it gets adjusted to the current floor price of the collection',
    },
    listed_lands: {
      name: 'Listed Lands',
      icon: <VscGraphLine />,
      description:
        'This filter only shows the listed LANDs and their respective price estimation. green = low price estimation, red = high price estimation',
    },
    price_difference: {
      name: 'Undervalued Grabs',
      icon: <MdAttachMoney />,
      description:
        'This filter only shows the listed LANDs and their respective price estimation in relation to the listed price. green = undervalued red = overvalued',
    },
    transfers: {
      name: 'Transfers',
      icon: <BiTransferAlt />,
      description: 'This filter shows how many times LANDs have exchanged owners throughout their trading history',
    },
  };

  return (
    <div className='relative'>
      {/* Filter Button + Name */}
      <button onClick={() => {setSelectfilter(!selectfilter); setSelectMetaverse(false); setSelectCoord(false);}}>
        {/* Icon */}
        <div className={`flex bg-nm-fill dark:bg-nm-dm-fill items-center justify-center rounded-full w-12 h-12 ${selectfilter && "rounded-b-none h-[60px] pb-3"}`}>
          {filterOptions[filterBy].icon}
        </div>
      </button>
      {/* FilterOptions */}
      {selectfilter && (
        <>
          <div className='absolute top-[48px] left-[48px] w-3 h-3'>
            <Image src={'/images/heatmap/curve.svg'} layout='fill' alt='logo' />
          </div>
          <div className={`flex flex-col space-y-4 absolute bg-nm-fill dark:bg-nm-dm-fill rounded-xl rounded-tl-none p-3 pt-5`}>
            {Object.keys(filterOptions).map((filter) => (
              filter !== filterBy && (
                <div key={filter}>
                  <button
                    className='flex gap-4 bg-opacity-100 items-center font-medium text-lm-text dark:text-nm-highlight hover:text-nm-dm-remark dark:hover:text-nm-dm-remark min-w-max text-base'
                    onClick={() => {setFilterBy(filter as MapFilter); setSelectfilter(false)}}
                  >
                    {filterOptions[filter as MapFilter].icon}
                    <span className='whitespace-nowrap tooltip' data-tooltip={filterOptions[filter as MapFilter].description}>
                      {filterOptions[filter as MapFilter].name}
                    </span>
                    <Tooltip title={filterOptions[filter as MapFilter].description} placement='right' arrow className='-translate-x-2'>
                      <div>
                        <AiFillQuestionCircle className='text-lm-text dark:text-nm-highlight hover:text-nm-dm-remark dark:hover:text-nm-dm-remark cursor-pointer transition-all duration-300' />
                      </div>
                    </Tooltip>
                  </button>
                </div>
              )
            ))}
          </div>
        </>
      )}
    </div>
  );
}