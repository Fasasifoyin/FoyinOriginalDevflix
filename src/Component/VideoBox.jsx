import React from "react";
import { MdCancel } from "react-icons/md";
import ReactPlayer from "react-player";
import {IoMdArrowDropleftCircle,IoMdArrowDroprightCircle} from 'react-icons/io'

const VideoBox = ({ setShowVidBox, results, videoNumber, setVideoNumber }) => {
    const video = results.map(each => each.key)

    function playNext(){
        setVideoNumber(videoNumber === results.length ? 1 : videoNumber + 1)
    }

    function playPrev(){
        setVideoNumber(videoNumber === 1 ? results.length : videoNumber - 1)
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
              onClick={() => setShowVidBox(false)}
              style={{cursor:'pointer'}}
            />
          </div>

          <div className="arrow2">
              <IoMdArrowDropleftCircle size='3rem' style={{cursor:'pointer', color:'rgb(101, 140, 173)'}} onClick={playPrev}/>
              <IoMdArrowDroprightCircle size='3rem' style={{cursor:'pointer', color:'rgb(101, 140, 173)'}} onClick={playNext}/>
          </div>

          <div>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${video[videoNumber]}`} controls/>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoBox;
