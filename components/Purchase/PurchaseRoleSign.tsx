import React from 'react'
import { useAppSelector } from '../../state/hooks'

const PurchaseRoleSign = () => {
  const { role } = useAppSelector((state) => state.account)
  return (
    /* Role Sign */
    <div className='m-auto w-fit gray-box bg-opacity-10 mb-8'>
      <h3 className='text-2xl text-center'>
        Tier: {role ? role.tier : 'None'}
      </h3>
      {role && <p>Active until: {new Date(role.expiration).toDateString()}</p>}
    </div>
  )
}

export default PurchaseRoleSign
