import React, { useEffect, useState } from 'react'
import { AiFillQuestionCircle, AiOutlineSearch } from 'react-icons/ai'
import { ValuationTile } from '../../lib/heatmap/heatmapCommonTypes'
import { getState, typedKeys } from '../../lib/utilities'
import { ValuationState } from '../../pages/valuation'
import SearchLandButton from './SearchLandButton'

interface Props {
  mapState: ValuationState
  handleMapSelection: (
    lands?: ValuationTile,
    x?: number | undefined,
    y?: number | undefined,
    tokenId?: string | undefined
  ) => Promise<NodeJS.Timeout | undefined>
  onClick: () => void
  opened: boolean
}
const MapSearch = ({ mapState, handleMapSelection, onClick, opened }: Props) => {
  const [landId, setLandId] = useState('')
  const [coordinates, setCoordinates] = useState({ X: '', Y: '' })

  const [loadingQuery, errorQuery] = getState(mapState, [
    'loadingQuery',
    'errorQuery',
  ])

  const [searchBy, setSearchBy] = useState<'coordinates' | 'id'>('coordinates')

  const searchById = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleMapSelection(undefined, undefined, undefined, landId)
  }
  const searchByCoordinates = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleMapSelection(undefined, Number(coordinates.X), Number(coordinates.Y), undefined)
  }
  const searchOptions = {
    coordinates: {
      search: searchByCoordinates,
      text: 'Go by Coordinates',
      hasGuide: false,
    },
    id: {
      search: searchById,
      text: 'Go by ID',
      hasGuide: true,
    },
  }
  // const checkMobile = () => {
  //   // not sure why setMobile(window.innerWidth <= 768) isn't working..
  //   window.innerWidth <= 768 ? setMobile(true) : setMobile(false)
  //   if (window.innerWidth > 768) {
  //     setOpened(true)
  //   }
  // }

  // useEffect(() => {
  //   // checkMobile()
  //   window.addEventListener('resize', checkMobile)

  //   return () => {
  //     window.removeEventListener('resize', checkMobile)
  //   }
  // }, [])

  return (
    <div className='flex flex-col gap-6 h-16 md:h-auto'>
      {/* Search */}
      <form
        className='gray-box bg-grey-bone rounded-full'
        onSubmit={(e) => searchOptions[searchBy].search(e)}
      >

        <div
          onClick={() => onClick()}
          className={`hidden sm:flex bg-grey-bone items-center justify-center rounded-full cursor-pointer w-12 h-12 ${opened && "rounded-b-none"}`}
        >
          {/* Icon */}
          <AiOutlineSearch className='text-2xl' />
        </div>

        {/* Inputs */}
        {opened && (
          <div className={`flex flex-col space-y-4 md:absolute bg-grey-bone rounded-xl rounded-tl-none p-3 pt-5`}>
            <div className='flex flex-col gap-2 mb-4'>
              {/* Mapping through search options */}
              {typedKeys(searchOptions).map((filter) => (
                <span key={filter} className='flex gap-2 items-center relative'>
                  <input
                    type='radio'
                    name={filter}
                    value={filter}
                    checked={searchBy === filter}
                    onChange={() => setSearchBy(filter)}
                  />
                  <label className='text-grey-content font-plus text-sm font-bold'>
                    {filter[0].toLocaleUpperCase() + filter.substring(1)}
                  </label>
                  {searchOptions[filter].hasGuide && (
                    <div className='items-center justify-center'>
                      <AiFillQuestionCircle className='text-grey-content cursor-pointer peer relative bottom-[2px]' />
                      <p className='absolute -top-7 border border-gray-500 -left-6 xs:left-0 p-2 rounded-lg bg-grey-bone bg-opacity-10 backdrop-filter backdrop-blur font-medium text-xs text-grey-content hidden peer-hover:block w-70'>
                        Find LAND on Opensea &gt; Details &gt; Token ID
                      </p>
                    </div>
                  )}
                </span>
              ))}
            </div>
            <div className='flex flex-col gap-4 relative'>
              <div className='flex gap-2'>
                {searchBy === 'coordinates' ? (
                  // Coordinates Input
                  typedKeys(coordinates).map((coord) => (
                    <input
                      disabled={loadingQuery}
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
                      className='font-light font-plus border-gray-300 shadowCoord placeholder-grey-content block w-16  text-grey-content p-3 focus:outline-none border border-opacity-40 hover:border-opacity-100 focus:border-opacity-100 transition duration-300 ease-in-out rounded-xl'
                    />
                  ))
                ) : (
                  // Id Input
                  <input
                    disabled={loadingQuery}
                    required
                    type='number'
                    onChange={(e) => setLandId(e.target.value)}
                    value={landId}
                    placeholder='14271'
                    className='font-light font-plus border-gray-300 shadowCoord placeholder-grey-content block w-[8.5rem]  text-grey-content p-3 focus:outline-none border border-opacity-40 hover:border-opacity-100 focus:border-opacity-100 transition duration-300 ease-in-out rounded-xl'
                  />
                )}
              </div>
              {/* Add land Button */}
              <SearchLandButton searchBy={searchBy} mapState={mapState} />
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default MapSearch
