import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BASE_URL, API_KEY } from '../API/Config'
import axios from 'axios'
import Loading from '../Component/Loading'
import { Image, Col, Row } from 'react-bootstrap'
import Asonry from '../Component/Masonry'
import Arrow from '../Component/Arrow'
import useScroll from '../Hooks/useScroll'
import ImageBox from '../Component/ImageBox'

const EachPerson = () => {
    const {person_id} = useParams()
    const [personDetails, setPersonDetails] = useState()
    const {scroll, scrollRef} = useScroll()
    const [showImgBox, setShowImgBox] = useState(false)
    const [imgNumber, setImgNumber] = useState(1)

    useEffect(() => {
      document.title = personDetails?.name
    }, [personDetails?.name, person_id])


    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get(
              `${BASE_URL}/person/${person_id}?api_key=${API_KEY}&append_to_response=images,movie_credits`
            )
            setPersonDetails(response.data)
          } catch (error) {
            console.log(error)
          }
        }
        fetchData()
      }, [person_id])

      if(!personDetails) return <Loading/>

      const {
        name,
        profile_path,
        biography,
        gender,
        birthday,
        place_of_birth,
        images: { profiles },
        movie_credits: { cast },
      } = personDetails


  return (
    <div className="mt-3 py-5 position-relative">
      <div className="backdrop">
    <Image
      src={`https://image.tmdb.org/t/p/original/${profile_path}`}
      style={{width:'100%', height:'100%', objectFit:'cover'}}
    />
    </div>

    <div style={{position:'relative', zIndex:'50'}}>

<div className='d-md-flex px-4 mt-2 gap-3'>
        <div className='text-center mb-3'>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
            className='imagesize'
            alt={name}
            title={name}
          />
        </div>

        <div>
          <h2 className='fw-bold'>{name}</h2>
          <h4 className='fw-bold'>Biography</h4>
          {biography.split('\n\n').map((paragraph, index) => (
            <p key={index}>
              {paragraph
                .split('\n')
                .reduce((total, line) => [total, <br />, line])}
            </p>
          ))}
          <h4 className='fw-bold'>Personal info</h4>
          <div className='d-flex flex-wrap gap-2'>
            <div>
              <p className='text-secondary mb-0 fw-bold'>Gender</p>
              <p>{gender === 1 ? 'Female' : 'Male'}</p>
            </div>
            <div>
              <p className='text-secondary mb-0 fw-bold'>Birthday</p>
              <p>{birthday}</p>
            </div>
            <div>
              <p className='text-secondary mb-0 fw-bold'>Place of birth</p>
              <p>{place_of_birth}</p>
            </div>
          </div>
        </div>
  </div>

  
<div>
  <h4 className="fw-bold mb-2 px-4">{profiles.length > 1 ? 'Images' : 'Image'}</h4>
{profiles.length > 0 ? (
<div style={{position:'relative'}}>
<div ref={scrollRef} className="px-4 d-flex gap-2 scrollbody" style={{width:'100%', overflowX:'scroll', overflowY:'hidden'}}>
 {profiles.slice(0, 14).map((each, index) => (
   <div key={index} onClick={() => {
    setShowImgBox(true)
    setImgNumber(index)
  }}>
   <Image 
   src={`https://image.tmdb.org/t/p/w500/${each.file_path}`}
   style={{
     width: '270px',
     height: '180px',
     cursor: 'pointer',
     objectFit: 'fill',
   }}
   className="rounded-2"/>
   </div>
 ))}
</div>

{profiles.length > 4 && (
<Arrow scroll={scroll}/>
)}

</div> ) : (
  <p className="fw-bold px-4">No Image Available</p>
  )}
  {showImgBox && <ImageBox setShowImgBox={setShowImgBox} profiles={profiles} imgNumber={imgNumber} setImgNumber={setImgNumber}/>}
  </div>

      <div className='px-4 mt-5' >
        <h4 className='mb-2 fw-bold'>{cast.length > 1 ? 'Recommendations' : 'Recommendation'}</h4>
        {cast.length > 0 ? (
        <Row className='gy-2'>
            {cast.map((each) => (
              <Col key={each.id} xs={6} md={3} xl={2}>
                <Asonry {...each} />
                </Col>
            ))}
        </Row>
        ) : (
         <p>No Movie Credits for <span className='fw-bold'>{name}</span></p>
        )}
    </div>
    </div>
    </div>
    
  )
}

export default EachPerson