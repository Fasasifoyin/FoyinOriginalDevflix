import React from 'react'
import Navhead from './Navhead'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
    <>
        <Navhead/>
        <div className='d-lg-flex'>
            <div className='d-none d-lg-block' style={{width:'22vw', minHeight:'100vh', background:'rgb(133,96,67,0.7)'}}>
                <div className='position-fixed top-0 start-0 sideAdjust scrollbody' style={{ marginTop: "1rem"}}>
                <Sidebar/>
                </div>
            </div>
            <div className='outlet position-relativ'>
                   <Outlet />
            </div>
        </div>
    </>
  )
}

export default Layout