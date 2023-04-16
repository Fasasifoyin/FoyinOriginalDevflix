import React, { useEffect } from 'react'
import useFetchData from '../Hooks/useFetchData'
import TvCard from '../Component/TvCard'
import { Row, Col } from 'react-bootstrap'
import Loading from '../Component/Loading'


const Popularmovies = () => {
  const {data2, loading, error, bottomPage, newData2} = useFetchData('tv/popular')
  const aa = [...newData2, data2]

  useEffect(() => {
    document.title = 'Discover - Popular Tv'
  }, [])

  return (
    <div className='px-3 px-lg-4 py-4 mt-5' >
        <h3 className='mb-4'>Popular TV</h3>
        <Row className='gy-2'>
            {aa.map((each, index) => (
              aa.length === index + 1 ? (
                  <Col key={index} xs={6} md={3} xl={2} ref={bottomPage}>
                <TvCard {...each} />
                </Col>
                ) :
                (
                  <Col key={index} xs={6} md={3} xl={2}>
                < TvCard {...each}/>
                </Col>
                )
            ))}
        </Row>
        {loading && <Loading/>}
        {error && <p>{error.message}</p>}
    </div>
  )
}

export default Popularmovies