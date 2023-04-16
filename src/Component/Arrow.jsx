import React from 'react'
import {IoMdArrowDropleftCircle,IoMdArrowDroprightCircle} from 'react-icons/io'


const Arrow = ({scroll}) => {
  return (
    <div className="d-none d-lg-flex w-100 justify-content-between align-items-center arrow">
          <IoMdArrowDropleftCircle style={{cursor:'pointer', color:'rgb(101, 140, 173)'}} size='2rem' onClick={() => scroll('left')}/>
          <IoMdArrowDroprightCircle style={{cursor:'pointer', color:'rgb(101, 140, 173)'}} size='2rem' onClick={() => scroll('right')}/>
         </div> 
  )
}

export default Arrow