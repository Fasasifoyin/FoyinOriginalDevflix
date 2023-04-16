import React from "react";
import { NavLink } from "react-router-dom";
import useFetchData from "../Hooks/useFetchData";
import Loading from "./Loading";

const Sidebar = () => {
   const {genre:genres, loading, error} = useFetchData(`genre/movie/list`)

  return (
    <div className="w-100 d-flex flex-column gap-2 px-lg-2 mt-lg-5 py-4" >
      <div>
        <h4 className="ps-2 mb-3" style={{color:'rgb(101,140,173)'}}>Discover</h4>
        <div className="px-3 d-flex flex-column gap-3" >
          <div  className='hover'>
          <NavLink to='/popularpeople' style={({isActive}) => ({
                    color: isActive ? "black" : "rgb(214,214,206)"
                  })}>
            <h5>Popular People</h5>
          </NavLink>
          </div>
          <div  className='hover'>
          <NavLink to='/populartv' style={({isActive}) => ({
                    color: isActive ? "black" : "rgb(214,214,206)"
                  })}>
            <h5>Popular TV</h5>
          </NavLink>
          </div>
          <div  className='hover'>
          <NavLink to='/toprated' style={({isActive}) => ({
                    color: isActive ? "black" : "rgb(214,214,206)"
                  })}>
            <h5>Top Rated Movies</h5>
          </NavLink>
          </div>
          <div  className='hover'>
          <NavLink to='/upcoming' style={({isActive}) => ({
                    color: isActive ? "black" : "rgb(214,214,206)"
                  })}>
            <h5>Upcoming Movies</h5>
          </NavLink>
          </div>
        </div>
      </div>
      <hr className="text-white text-center" />
      <div className="mt-1">
        <h4 className="ps-2 mb-3" style={{color:'rgb(101,140,173)'}}>Genres</h4>
        <div className="px-3 d-flex flex-column gap-3">
          {loading && <Loading/>}
          {error && <p>{error.message}</p>}
              {genres.map(each => (
                <div  key={each.id} className='hover'>
                <NavLink to={`movie/genres/${each.id}`}  style={({isActive}) => ({
                    color: isActive ? "black" : "rgb(214,214,206)"
                  })}>
                    <h5>{each.name}</h5>
                </NavLink>
                </div>
              ))}
        </div>
      </div>
      <h6 className="text-white text-center mt-2">Copyright &copy; 2023</h6>
    </div>
  );
};

export default Sidebar;
