export {}
// import { useAppSelector } from '../../state/hooks'
// import { Fade } from 'react-awesome-reveal'
// import { SocialMediaOptions } from '../../lib/socialMediaOptions'
// import React from 'react'
// import { IAPIData, IPredictions } from '../../lib/types'

// type SocialMediaKey = 'twitter' | 'whatsapp' | 'external' | 'telegram'

// interface Props {
//   onPopupSelect: (copy: boolean) => void
//   sharing: 'valuation' | 'portfolio'
//   predictions?: IPredictions
//   apiData?: IAPIData
// }
// // onPopupSelect is the function setIsVisible passed from the parent component
// const SharePopup = ({
//   onPopupSelect,
//   sharing,
//   predictions,
//   apiData,
// }: Props) => {
//   // SocialMediaOptions contains all options with their texts, icons, etc..
//   const options = SocialMediaOptions(apiData, predictions)
//   const handleClick = (social: SocialMediaKey) => {
//     if (social !== 'external') {
//       sharing === 'portfolio'
//         ? window.open(options[social].portfolioLink + address)
//         : window.open(options[social].valuationLink)

//       onPopupSelect(false)
//     } else {
//       onPopupSelect(true)
//     }
//   }

//   const { address } = useAppSelector((state) => state.account)

//   let keys = Object.keys(options) as SocialMediaKey[]
//   // No URL needed for a valuation. Only for Portfolios
//   if (sharing === 'valuation') {
//     keys = keys.filter((option) => option !== 'external')
//   }

//   return (
//     <ul className='gray-box bg-grey-darker bg-opacity-100 flex gap-2 '>
//       {/* List of Options */}
//       <Fade className='w-full' direction='up' duration={200} cascade>
//         {keys.map((option) => (
//           <li
//             key={option}
//             onClick={() => handleClick(option)}
//             className='z-30 transition hover:bg-grey-dark bg-grey-other duration-300 cursor-pointer ease-in-out gray-box '
//           >
//             {options[option].icon}
//           </li>
//         ))}
//       </Fade>
//     </ul>
//   )
// }

// export default React.memo(SharePopup)
