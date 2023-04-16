import { useRef } from 'react'

const useScroll = () => {
  const scrollRef = useRef()
  const scrollRefB = useRef()
  const scrollRefC = useRef()

  function scroll(direction){
    const {current} = scrollRef
    direction === 'left' ? (current.scrollLeft -= 500) : (current.scrollLeft += 500)
  }

  function scrollB(direction){
    const {current} = scrollRefB
    direction === 'left' ? (current.scrollLeft -= 500) : (current.scrollLeft += 500)
  }

  function scrollC(direction){
    const {current} = scrollRefC
    direction === 'left' ? (current.scrollLeft -= 500) : (current.scrollLeft += 500)
  }

  return {scrollRef, scroll, scrollRefB, scrollB, scrollRefC, scrollC}
}

export default useScroll