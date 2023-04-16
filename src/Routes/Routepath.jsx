import React from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from '../Component/Layout'
import Popularmovies from '../Pages/Popularmovies'
import Home from '../Pages/Home'
import Popularpeople from '../Pages/Popularpeople'
import Toprated from '../Pages/Toprated'
import Genres from '../Pages/Genres'
import Eachmovie from '../Pages/Eachmovie'
import EachTv from '../Pages/EachTv'
import EachPerson from '../Pages/EachPerson'
import Upcoming from '../Pages/Upcoming'

const Routepath = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
          <Route path='/' element={<Layout/>} >
            <Route index element={<Home/>} />
              <Route path='/populartv' element={<Popularmovies/>}/>
              <Route path='/popularpeople' element={<Popularpeople/>}/>
              <Route path='/toprated' element={<Toprated/>}/>
              <Route path='/upcoming' element={<Upcoming/>}/>
              <Route path='/movie/genres/:id' element={<Genres/>}/>
              <Route path='/movie/:each_id' element={<Eachmovie/>}/>
              <Route path='/tv/:eachtv_id' element={<EachTv/>}/>
              <Route path='/person/:person_id' element={<EachPerson/>}/>
          </Route>
        )
      )
      
        return <RouterProvider router ={router}/>
}

export default Routepath