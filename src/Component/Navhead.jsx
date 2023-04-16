import React, {useState} from 'react'
import {MdMovieFilter} from 'react-icons/md'
import { Container } from 'react-bootstrap'
import {FaGripHorizontal} from 'react-icons/fa'
import {MdOutlineCancel} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import Mobileview from './Mobileview'
import SearchResults from './SearchResults'
import { useEffect } from 'react'


const Navhead = () => {
 const [showMenu, setShowMenu] = useState(true)
 const [search, setSearch] = useState('')
 const [searchBox, setSearchBox] = useState(false)

 useEffect(() => {
  if (search !== "") {
    setSearchBox(true);
  } else {
    setSearchBox(false);
  }
}, [search]);

  return (
    <Container fluid className='position-fixed top-0 gradient' style={{zIndex: '100'}}>
        <div className='d-flex justify-content-between align-items-center h-100 py-2 px-1 px-md-2'>
            <div className='d-flex gap-2'>
        {showMenu ? <FaGripHorizontal className='d-lg-none size-sm' size='2.5rem' onClick={() => setShowMenu(false)}/> : <Mobileview setShowMenu={setShowMenu}/> }
        <NavLink to='/'>
         <MdMovieFilter size='2.5rem' className='icon'/>
         </NavLink>
         </div>
         <div className='position-relative'>
            <input type="text" placeholder='Search Movies, TVs & People' className='search position-relative' value={search} onChange={(e) => setSearch(e.target.value)}/>
            {search.length === 0 ?   <FaSearch className='position-absolute end-0 top-10 opacity-75' size='1.5rem' style={{color:'#fff'}}/> : <MdOutlineCancel className='position-absolute end-0 top-10 opacity-75' size='1.5rem ' color='white' onClick={() => setSearch('')}/>}
            {searchBox && <SearchResults search={search} setSearchBox={setSearchBox}/>}
         </div>
         </div>
            
    </Container>
  )
}

export default Navhead