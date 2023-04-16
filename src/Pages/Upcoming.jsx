import React, { useEffect } from 'react'
import useFetchData from '../Hooks/useFetchData'
import Asonry from '../Component/Masonry'
import { Row, Col } from 'react-bootstrap'
import Loading from '../Component/Loading'

const Upcoming = () => {
    const {data2, loading, error, newData2, bottomPage} = useFetchData('movie/upcoming')
    const aa = [...newData2, ...data2]

    useEffect(() => {
      document.title = 'Discover - Upcoming Movies'
    }, [])

  return (
    <div className='px-3 px-lg-4 py-4 mt-5' >
    <h3 className='mb-4'>Upcoming Movies</h3>
    <Row className='gy-2'>
            {aa.map((each, index) => (
              aa.length === index + 1 ? (
                  <Col key={index} xs={6} md={3} xl={2} ref={bottomPage}>
                <Asonry {...each} />
                </Col>
                ) :
                (
                  <Col key={index} xs={6} md={3} xl={2}>
                <Asonry {...each}/>
                </Col>
                )
            ))}
        </Row>
        {loading && <Loading/>}
        {error && <p>{error.message}</p>}
</div>
  )
}

export default Upcoming