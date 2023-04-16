import React from 'react'
import {MdCancel} from 'react-icons/md'
import Sidebar from './Sidebar'

const Mobileview = ({setShowMenu}) => {
  return (
    <div className='position-fixed start-0  top-0 sideAdjust' style={{width:'100%', height:'100vh', zIndex:'20', backgroundColor: 'rgb(101,140,173)'}}>
        <div style={{position:'fixed', top: 10, right: 20}}>
            <MdCancel className='d-lg-none' size='3rem' onClick={() => setShowMenu(true)}/>
        </div>
        <Sidebar/>
    </div>
  )
}

export default Mobileview