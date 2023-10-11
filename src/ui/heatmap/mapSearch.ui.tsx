import { AiFillQuestionCircle, AiOutlineSearch } from "react-icons/ai";
import Image from 'next/image';
import { Tooltip } from '@mui/material';
import { MdAddLocationAlt } from 'react-icons/md';
import { useState } from "react";
import { typedKeys } from "../../utils/common.util";

interface MapSearchUIProps {
  selectCoord: boolean;
  setSelectCoord: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectfilter: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectMetaverse: React.Dispatch<React.SetStateAction<boolean>>;
  setCoordinates: React.Dispatch<React.SetStateAction<{ X: number | undefined; Y: number | undefined }>>;
  coordinates: { X: number | undefined; Y: number | undefined };
  landId: number | undefined;
  setLandId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function MapSearchUI({selectCoord, setSelectCoord, setSelectMetaverse, setSelectfilter, setCoordinates, coordinates, landId, setLandId}: MapSearchUIProps) {
  const [searchBy, setSearchBy] = useState<'coordinates' | 'id'>('coordinates');
  const searchOptions = {
    coordinates: {
      hasGuide: false,
      guide: '',
    },
    id: {
      hasGuide: true,
      guide: 'Find LAND on Opensea > Details > Token ID',
    },
  };
  
  return (
    <div className='relative'>
      <button
        onClick={() => {
          setSelectCoord(!selectCoord);
          setSelectMetaverse(false);
          setSelectfilter(false);
        }}
      >
        {/* Icon */}
        <div
          className={`flex bg-nm-fill dark:bg-nm-dm-fill items-center justify-center rounded-full w-12 h-12 ${selectCoord && "rounded-b-none h-15"}`}
        >
          <AiOutlineSearch className='text-2xl' />
        </div>
      </button>
      {selectCoord && (
        <>
          <div className='absolute top-[48px] left-[48px] w-3 h-3'>
            <Image src={'/images/heatmap/curve.svg'} layout='fill' alt="logo" />
          </div>
          <div className={`flex flex-col space-y-4 absolute bg-nm-fill dark:bg-nm-dm-fill rounded-xl rounded-tl-none p-3 pt-5`}>
            <div className='flex flex-col gap-2 mb-4'>
            {typedKeys(searchOptions).map((filter) => (
                <div key={filter} className='flex gap-2 items-center relative'>
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
                  {searchOptions[filter].hasGuide && (
                    <Tooltip title={searchOptions[filter].guide} placement="right" arrow>
                      <div>
                        <AiFillQuestionCircle className='text-lm-text dark:text-nm-highlight hover:text-nm-dm-remark dark:hover:text-nm-dm-remark cursor-pointer transition-all duration-300' />
                      </div>
                    </Tooltip>
                  )}
                </div>
              ))}
            </div>
            <div className='flex flex-col gap-4 relative'>
              <div className='flex gap-2'>
                {searchBy === 'coordinates' ? (
                  typedKeys(coordinates).map((coord) => (
                    <input
                      key={coord}
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
                ) : (
                  <input
                    required
                    type='number'
                    onChange={(e) => setLandId(parseInt(e.target.value))}
                    value={landId}
                    placeholder='14271'
                    className='font-light border-gray-300 shadowCoord placeholder-nm-fill block w-[8.5rem] text-lm-text dark:text-nm-highlight p-3 focus:outline-none border border-opacity-40 hover:border-opacity-100 focus:border-opacity-100 transition duration-300 ease-in-out rounded-xl'
                  />
                )}
              </div>
              <button className="items-center justify-center font-medium text-center transition-all flex grow gap-2 ease-in shadow-relief-12 hover:shadow-relief-32 z-10 p-2 rounded-xl bg-nm-dm-icons dark:bg-nm-fill text-nm-highlight dark:text-lm-text">
                <MdAddLocationAlt className='h-5 w-5 relative bottom-[0.2rem]' />
                Search
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
