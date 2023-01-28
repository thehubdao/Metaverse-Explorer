import React from 'react'
import { Metaverse } from '../../lib/metaverse'
import { handleLongLandName, typedKeys } from '../../lib/utilities'

interface Props {
  coordinates: { x: number; y: number }
  metaverse: Metaverse
  owner?: string
  name?: string
}

const MapLandSummary = ({ name, owner, coordinates, metaverse }: Props) => {
  return (
    <div className='flex flex-col gap-2 text-sm bg-grey-bone p-1'>
      <div className='flex gap-4'>
        {typedKeys(coordinates).map((coord) => (
          <span
            key={coord}
            className='text-grey-content font-bold text-base whitespace-nowrap'
          >
            {coord.toUpperCase()}:{' '}
            {isNaN(coordinates[coord]) ? 'xx' : coordinates[coord]}
          </span>
        ))}
      </div>

      {metaverse !== 'sandbox' && (
        <>
          {metaverse === 'decentraland' && (
            <p className='text-grey-content font-bold text-base whitespace-nowrap'>
              {name
                ? handleLongLandName(name, 13)
                : `Parcel ${coordinates.x}, ${coordinates.y}`}
            </p>
          )}
          <p className='text-grey-content font-bold font-plus whitespace-nowrap'>
            Owner: {owner ? owner : 'None'}
          </p>
        </>
      )}
    </div>
  )
}

export default MapLandSummary
