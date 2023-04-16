import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'

const TvCard = ({id, poster_path, name, first_air_date, vote_average}) => {

  return (
<div className='mediaCard'>
        <div className='cast'>
            <Link to={`/tv/${id}`}>
            <Image src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            className='img-fluid'
            alt={name}
            title={name}
            loading='lazy'/>
            </Link>
            <div className='px-1 mt-2'>
              <Link to={`/tv/${id}`}>
              <p className='text-white small fw-bold mb-0'>{name}</p>
              </Link>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='text-secondary small '>{first_air_date?.slice(0,4)}</p>
                <div className='d-flex gap-1'>
                   <BsStarFill className='text-warning' size='1rem'/>
                   <p className='small text-secondary'>{vote_average?.toFixed(2)}</p>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default TvCard