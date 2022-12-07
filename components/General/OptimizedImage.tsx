import Image from 'next/image'
interface Props {
  src: string
  width?: number
  height?: number
  layout?: 'intrinsic' | 'fixed' | 'fill' | 'responsive' | undefined
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  className?: string
  objectFit?:
    | 'contain'
    | 'cover'
    | 'fill'
    | 'none'
    | 'scale-down'
    | 'inherit'
    | 'initial'
}

const OptimizedImage = ({
  src,
  layout,
  height = 150,
  width = 150,
  rounded,
  className,
  objectFit,
}: Props) => {
  const small = height < 40 && width < 40
  return (
    <Image
      placeholder={small ? undefined : 'blur'}
      blurDataURL={src}
      src={src}
      width={width}
      layout={layout}
      height={height || 150}
      loading='lazy'
      objectFit={objectFit || 'cover'}
      className={'rounded-' + rounded + ' ' + className}
    />
  )
}

export default OptimizedImage
