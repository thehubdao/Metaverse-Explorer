import { AiFillQuestionCircle, AiOutlineSearch } from "react-icons/ai";
import { Tooltip } from '@mui/material';
import { MdAddLocationAlt } from 'react-icons/md';
import { useState } from "react";
import { typedKeys } from "../../utils/common.util";
import { SEARCH_OPTIONS } from "../../constants/common.constant";

interface MapSearchUIProps {
  selectCoord: boolean;
  setSelectCoord: (coordState: boolean) => void;
  setSelectFilter?: (filterState: boolean) => void;
  setSelectMetaverse: (metaverseState: boolean) => void;
  setCoordinates: (newCoordinates: { X: number | undefined; Y: number | undefined }) => void;
  coordinates: { X: number | undefined; Y: number | undefined };
  landId: string | undefined;
  setLandId: (tokenId: string | undefined) => void;
  onClickSearch: () => Promise<void>;
}

export default function MapSearchUI({ selectCoord, setSelectCoord, setSelectMetaverse, setSelectFilter, setCoordinates, coordinates, landId, setLandId, onClickSearch }: MapSearchUIProps) {
  const [searchBy, setSearchBy] = useState<'coordinates' | 'id'>('coordinates');

  const handleButtonClick = () => {
    setSelectMetaverse(false);
    setSelectFilter && setSelectFilter(false);
    setSelectCoord(!selectCoord);
  };

  return (
    <div className='relative'>
      <button onClick={() => handleButtonClick()}>
        {/* Icon */}
        <div
          className={`flex bg-nm-fill dark:bg-nm-dm-fill items-center justify-center rounded-full w-12 h-12 ${selectCoord && "rounded-b-none h-[60px] pb-3"}`}
        >
          <AiOutlineSearch className='text-2xl' />
        </div>
      </button>
      {selectCoord &&
        <>
          <form className={`flex flex-col space-y-4 absolute bg-nm-fill dark:bg-nm-dm-fill rounded-xl rounded-tl-none p-3 pt-5`} onSubmit={event => event.preventDefault()}>
            <div className='flex flex-col gap-2 mb-4'>
              {typedKeys(SEARCH_OPTIONS).map((filter, index) => (
                <div key={index} className='flex gap-2 items-center relative'>
                  <input
                    type='radio'
                    name={filter}
                    value={filter}
                    checked={searchBy === filter}
                    onChange={() => setSearchBy(filter)}
                  />
                  <label className='text-lm-text dark:text-nm-highlight hover:text-nm-dm-remark dark:hover:text-nm-dm-remark text-sm font-bold'>
                    {filter[0].toLocaleUpperCase() + filter.substring(1)}
                  </label>
                  {SEARCH_OPTIONS[filter].hasGuide &&
                    <Tooltip title={SEARCH_OPTIONS[filter].guide} placement="right" arrow>
                      <div>
                        <AiFillQuestionCircle className='text-lm-text dark:text-nm-highlight hover:text-nm-dm-remark dark:hover:text-nm-dm-remark cursor-pointer transition-all duration-300' />
                      </div>
                    </Tooltip>
                  }
                </div>
              ))}
            </div>
            <div className='flex flex-col gap-4 relative'>
              <div className='flex gap-2'>
                {searchBy === 'coordinates' ?
                  <>
                    {
                      typedKeys(coordinates).map((coord, index) => (
                        <input
                          key={index}
                          required
                          type='number'
                          onChange={(e) =>
                            setCoordinates({
                              ...coordinates,
                              [coord]: e.target.value,
                            })
                          }
                          value={coordinates[coord]}
                          placeholder={coord}
                          className='font-light border-gray-300 shadow-hollow-2 placeholder-nm-fill block w-16 text-lm-text dark:text-nm-highlight p-3 focus:outline-none border border-opacity-40 hover:border-opacity-100 focus:border-opacity-100 transition duration-300 ease-in-out rounded-xl'
                        />
                      ))
                    }
                    <button className="items-center justify-center font-medium text-center transition-all flex grow gap-2 ease-in z-10 p-2 rounded-xl bg-nm-dm-icons hover:bg-nm-dm-remark dark:bg-nm-fill dark:hover:bg-nm-remark text-nm-highlight dark:text-lm-text" disabled={coordinates.X == undefined || coordinates.Y == undefined} onClick={() => void onClickSearch()}>
                      <MdAddLocationAlt className='h-5 w-5 relative bottom-[0.2rem]' />
                      Search
                    </button>
                  </> : <>
                    {
                      <input
                        required
                        type='number'
                        onChange={(e) => setLandId(e.target.value)}
                        value={landId}
                        placeholder='14271'
                        className='font-light border-gray-300 placeholder-nm-fill block w-[8.5rem] text-lm-text dark:text-nm-highlight p-3 focus:outline-none border border-opacity-40 hover:border-opacity-100 focus:border-opacity-100 transition duration-300 ease-in-out rounded-xl'
                      />
                    }
                    <button className="items-center justify-center font-medium text-center transition-all flex grow gap-2 ease-in z-10 p-2 rounded-xl bg-nm-dm-icons hover:bg-nm-dm-remark dark:bg-nm-fill dark:hover:bg-nm-remark text-nm-highlight dark:text-lm-text" disabled={landId == undefined} onClick={() => void onClickSearch()}>
                      <MdAddLocationAlt className='h-5 w-5 relative bottom-[0.2rem]' />
                      Search
                    </button>
                  </>}
              </div>
            </div>
          </form>
        </>
      }
    </div>
  );
}
