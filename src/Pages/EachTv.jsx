import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY, BASE_URL } from '../API/Config'
import Loading from '../Component/Loading'
import { Image, Row, Col } from 'react-bootstrap'
import { AiFillStar } from 'react-icons/ai'
import TvCard from '../Component/TvCard'
import Arrow from '../Component/Arrow'
import { Link } from 'react-router-dom'
import useScroll from '../Hooks/useScroll'
import VideoBox from '../Component/VideoBox'
import ImageBox from '../Component/ImageBox'

const EachTv = () => {
  const {eachtv_id} = useParams()
  const [tvDetails, setTvDetails] = useState()
  const {scroll, scrollRef, scrollB, scrollRefB, scrollC, scrollRefC} = useScroll()
  const [showVidBox, setShowVidBox] = useState(false)
  const [videoNumber, setVideoNumber] = useState(1)
  const [showImgBox, setShowImgBox] = useState(false)
  const [imgNumber, setImgNumber] = useState(1)

  useEffect(() => {
    document.title = `Tv - ${tvDetails?.original_name}`
  }, [tvDetails?.original_name, eachtv_id])

  useEffect(() => {
    window.scrollTo({ top: "0" });
  }, [eachtv_id]);


  useEffect(() => {
    async function fetchData(){
        try{
            const response = await axios.get(`${BASE_URL}/tv/${eachtv_id}?api_key=${API_KEY}&&append_to_response=credits,recommendations,images,videos&include_video_language=en`)
            setTvDetails(response.data)

        }catch(error){
            console.log(error)
        }
    }
    fetchData()
  },[eachtv_id])

  if(!tvDetails) return <Loading/>

  const {
    videos: { results },
    images: { backdrops },
    credits: { cast, crew },
    genres,
    overview,
    number_of_seasons,
    vote_average,
    original_name,
    poster_path,
    backdrop_path,
    recommendations: { results: resultsB },
  } = tvDetails;

  return (
    <div className="mt-3 py-5 position-relative">
      <div className='backdrop'>
    <Image
      src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
      style={{width:'100%', height:'100%', objectFit:'cover'}}
    />
    </div>

    <div style={{position:'relative', zIndex:'50'}}>
      <div className="d-md-flex px-4 mt-2 gap-3">
        <div className='text-center mb-3'>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={original_name}
            title={original_name}
            className='imagesize'
          />
        </div>

        <div>
          <div>
          <h2 className='fw-bold'>{original_name}</h2>
             <p>Number of Seasons - {number_of_seasons}</p>
          </div>
          <div className="d-flex gap-2 align-items-start mb-3">
            <AiFillStar color='yellow' size='1.5rem'/>
            <span>{vote_average}/10</span>
          </div>
          <div>
            <h4 className='fw-bold'>OverView</h4>
          </div>
          <div>
          <p>
              {overview ? ( overview.split("\n\n").map((paragraph, index) => (
                <span key={index}>
                  {paragraph
                    .split("\n")
                    .reduce((total, line) => [total, <br />, line])}
                </span>
              )) ) : (
                <p>No Overview</p>
              ) }
            </p>
            </div>
            <div>
              <h4 className='fw-bold'>Screenplay</h4>
               <p>{crew.length ? (`${crew[0].job} - ${crew[0].original_name}`) : (<p>No Screenplay</p>)}</p> 
            </div>
            <div>
              <h4 className='fw-bold'>Genres</h4>
              <div className="d-flex flex-wrap gap-2 ">
              {genres.length ? ( genres.map(each => (
                  <p key={each.id} className='small rounded-3 p-2 text-dark fw-bold' style={{backgroundColor: 'rgb(101, 140, 173)'}}>{each.name}</p>
              ))) : (
                <p>No Genres</p>
              ) }
              </div>
            </div>
        </div>
        </div>

        <div className="px-4 mt-3 w-100">
          <h4 className="fw-bold">{results.length > 1 ? 'Videos' : 'Video'}</h4>
          {results.length > 0 ? (
          <div className="position-relative">
          <div ref={scrollRef} className="d-flex gap-3 scrollbody" style={{overflowX:'scroll', overflowY:'hidden', width:'100%'}}>
            {results.map((each, index) => (
              <div key={index} className="video" onClick={() => {
                setShowVidBox(true)
                setVideoNumber(index)
              }}>
                <p>{(each.name).slice(0, 20)}</p>
                <p>{each.type}</p>
              </div>
            ))}
          </div>
          {results.length > 4 && <Arrow scroll={scroll}/>}
          </div>) : (
               <p>No Video for <span className='fw-bold'>{original_name}</span></p>
          )}
            {showVidBox && <VideoBox setShowVidBox={setShowVidBox} results={results} videoNumber={videoNumber} setVideoNumber={setVideoNumber}/>}
      </div>

        <h4 className="mt-5 fw-bold mb-2 px-4">{backdrops.length > 1 ? 'Images' : 'Image'}</h4>

<div>
{backdrops.length > 0 ? (
<div style={{position:'relative'}}>
<div ref={scrollRefB} className="px-4 d-flex gap-2 scrollbody" style={{width:'100%', overflowX:'scroll', overflowY:'hidden'}}>
 {backdrops.slice(0, 14).map((each, index) => (
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

{backdrops.length > 4 && (
<Arrow scroll={scrollB}/>
)}

</div> ) : (
  <p className="fw-bold px-4">No Image Available</p>
)}
           {showImgBox && <ImageBox setShowImgBox={setShowImgBox} backdrops={backdrops} imgNumber={imgNumber} setImgNumber={setImgNumber}/>}
</div>

<div className="mt-5 px-4">
        <h4 className="mb-3 fw-bold">Casts</h4>
        {cast.length > 0 ? (
        <div className="position-relative"> 
        <div ref={scrollRefC} className="d-flex scrollbody gap-2" style={{width:'100%', overflowX:'scroll', overflowY:'hidden'}}>
            {cast.map((each, index) => (
              <Link key={index} to={`/person/${each.id}`}>
                <div>
                <Image
                src={`https://image.tmdb.org/t/p/w500/${each.profile_path}`}
                className="castround"
                alt={each.name}/>
                <p className='text-center text-dark'>{each.name}</p>
                </div>
              </Link>
            ))}
        </div>
        {cast.length > 8 && <Arrow scroll={scrollC}/>}
        </div>) : (
             <p>No cast for <span className="fw-bold">{original_name}</span> is avilable at the moment</p>
        )} 
      </div>

        <div className='px-4 mt-5' >
        <h4 className='mb-2 fw-bold'>{resultsB.length > 1 ? 'Recommendations' : 'Recommendation'}</h4>
        {resultsB.length > 0 ? (
        <Row className='gy-2'>
            {resultsB.map((each) => (
              <Col key={each.id} xs={6} md={3} xl={2}>
                <TvCard {...each} />
                </Col>
            ))}
        </Row>
        ) : (
         <p >No Recommendations for <span className='fw-bold'>{original_name}</span></p>
        )}
    </div>
    </div>
    </div>
  )
}

export default EachTv