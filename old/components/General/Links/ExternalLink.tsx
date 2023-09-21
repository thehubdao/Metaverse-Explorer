import { FiExternalLink } from 'react-icons/fi'

interface Props {
  href?: string
  text: string
  className?: string
}
const ExternalLink = ({ className, href, text }: Props) => {
  return (
    <a
      href={href}
      target='_blank'
      className={
        'flex items-center max-w-max space-x-1 text-grey-content text-sm hover:text-blue-400 transition duration-300 ease-in-out' +
        ' ' +
        className
      }
    >
      <p className='font-medium'>{text}</p>
      <FiExternalLink className='mb-0.5' />
    </a>
  )
}
export default ExternalLink
