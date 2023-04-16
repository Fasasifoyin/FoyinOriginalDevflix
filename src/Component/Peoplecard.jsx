import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Peoplecard = ({id, profile_path, name, known_for_department}) => {
  return (
<div className='mediaCard'>
        <div className='cast'>
            <Link to={`/person/${id}`}>
            <Image src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
            className='img-fluid'
            alt={name}
            title={name}
            loading='lazy'/>
            </Link>
            <div className='px-1 mt-2 d-flex justify-content-between align-items-center'>
              <Link to={`/person/${id}`}>
              <p className='text-white small fw-bold mb-0'>{name}</p>
              </Link>
               <p className='small fw-bold mb-0' style={{color: 'rgb(133,96,67)'}}>{known_for_department}</p>
            </div>
        </div>
    </div>
  )
}

export default Peoplecard