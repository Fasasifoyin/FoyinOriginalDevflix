import React from 'react'
import { MdCancel } from "react-icons/md";
import {IoMdArrowDropleftCircle,IoMdArrowDroprightCircle} from 'react-icons/io'
import { Image } from 'react-bootstrap';

const ImageBox = ({ setShowImgBox, backdrops, imgNumber, setImgNumber, profiles }) => {
    const image = backdrops?.map(each => each.file_path)
    const image2 = profiles?.map(each => each.file_path)

    function playNext(){
      backdrops ?
        setImgNumber(imgNumber === backdrops.length ? 1 : imgNumber + 1) :
        setImgNumber(imgNumber === profiles.length ? 1 : imgNumber + 1)
    }

    function playPrev(){
      backdrops ? 
        setImgNumber(imgNumber === 1 ? backdrops.length : imgNumber - 1) :
        setImgNumber(imgNumber === 1 ? profiles.length : imgNumber - 1)
    }

  return (
    <>
    <div className="modalbox">
      <div className="modalbox2" />
      <div className="contentbox d-flex justify-content-center align-items-center">
        <div className="position-absolute top-0 end-0">
          <MdCancel
            size="3rem"
            color="white"
            className="align-self-end"
            onClick={() => setShowImgBox(false)}
            style={{cursor:'pointer'}}
          />
        </div>

        <div className="arrow2">
            <IoMdArrowDropleftCircle size='3rem' style={{cursor:'pointer', color:'rgb(101, 140, 173)'}} onClick={playPrev}/>
            <IoMdArrowDroprightCircle size='3rem' style={{cursor:'pointer', color:'rgb(101, 140, 173)'}} onClick={playNext}/>
        </div>

        <div>
            <Image
            src={backdrops ? `https://image.tmdb.org/t/p/w500/${image[imgNumber]}` : `https://image.tmdb.org/t/p/w500/${image2[imgNumber]}`}
            style={{height:'400px', width:'auto'}}/>
        </div>
      </div>
    </div>
  </>
  )
}

export default ImageBox