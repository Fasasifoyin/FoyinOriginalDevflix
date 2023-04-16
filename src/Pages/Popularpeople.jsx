import React from 'react'
import useFetchData from '../Hooks/useFetchData'
import { Row, Col } from 'react-bootstrap'
import Peoplecard from '../Component/Peoplecard'
import Loading from '../Component/Loading'
import { useEffect } from 'react'

const Popularpeople = () => {
   const {data2, loading, error, newData2, bottomPage} = useFetchData('person/popular')
   const aa = [...newData2, ...data2]

   useEffect(() => {
    document.title = 'Discover - Popular People'
  }, [])


  return (
    <div className='px-3 px-lg-4 py-4 mt-5' >
        <h3 className='mb-4'>Popular People</h3>
        <Row className='gy-2'>
            {aa.map((each, index) => (
              aa.length === index + 1 ? (
                  <Col key={index} xs={6} md={3} xl={2} ref={bottomPage}>
                <Peoplecard {...each} />
                </Col>
                ) :
                (
                  <Col key={index} xs={6} md={3} xl={2}>
                <Peoplecard {...each}/>
                </Col>
                )
            ))}
        </Row>
        {loading && <Loading/>}
        {error && <p>{error.message}</p>}
    </div>
  )
}

export default Popularpeople