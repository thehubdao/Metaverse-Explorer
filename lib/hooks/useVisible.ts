import { useState, useEffect, useRef } from 'react'
/**
 * @description Hook to listen to clicks outside of elements and hide them. Use this for popups,etc..
 */
const useVisible = (initialIsVisible: boolean) => {
  const [isVisible, setIsVisible] = useState(initialIsVisible)
  const ref = useRef<HTMLDivElement>(null)

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Enter') {
      setIsVisible(false)
    }
  }

/*   const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsVisible(false)
    }
  } */

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true)
/*     document.addEventListener('click', handleClickOutside, true) */
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true)
/*       document.removeEventListener('click', handleClickOutside, true) */
    }
  }, [])

  return { ref, isVisible, setIsVisible }
}

export default useVisible
