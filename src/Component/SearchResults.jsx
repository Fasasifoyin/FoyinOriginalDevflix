import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, API_KEY } from "../API/Config";
import SearchLayout from "./SearchLayout";
import Loading from "./Loading";
import { useRef, useCallback } from "react";

const SearchResults = ({ search, setSearchBox }) => {
  const observer = useRef()
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  
  let aa = [...newData, ...data]

  const lastSearch = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && data.length > 0){
        setPage(prev => prev + 1)
        setloading(true)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, data])

  useEffect(() => {
    setData([])
    setNewData([])
    setPage(1)
}, [search])

  useEffect(() => {
   const delayDebounceFn = setTimeout(() => {
     async function fetchData() {
        setloading(true)
        try {
          const response = await axios.get(
            `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${search}&page=${page}`
          );
          setData(response.data.results);
          setNewData([...newData, ...data])
        } catch (error) {
          setError(error)
          console.log(error)
        }finally{
          setloading(false)
        }
      }
      fetchData();
  }, 1000)
   return () => {
    clearTimeout(delayDebounceFn)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);



  return (
    <div
      className="searchresults position-absolute bg-dark scrollbody"
      style={{ top: "105%", overflowX: "scroll" }}
    >
   
      {[...newData, ...data].length > 0 ? (
        <div className="d-flex flex-column gap-3 px-3 mt-3">
          {aa.map((each, index) => (
            aa.length === index + 1 ? (
              <div ref={lastSearch} key={index}>
             <SearchLayout  each={each} setSearchBox={setSearchBox}/>  
             </div> 
             ) :
             (
              <div key={index} >
              <SearchLayout each={each} setSearchBox={setSearchBox}/>
              </div> 
             )
          ))}
        </div>
      ) : (
        <p className="fw-bold text-center mt-3 text-white">
          No movie/tv/person matched {search.length > 25 ? search.slice(0, 20) + "..." : search}
        </p>
      )}
      {data.length === 0 && newData.length > 1 && <p className="text-white text-center mt-2">No more results for  {search.length > 25 ? search.slice(0, 20) + "..." : search}</p>}
          {loading && <Loading/>}
        {error && <p>{error.message}</p>}
    </div>
  );
};

export default SearchResults;
