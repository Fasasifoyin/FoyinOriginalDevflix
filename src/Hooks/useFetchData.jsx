import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "../API/Config";
import axios from "axios";
import { useRef } from "react";

const useFetchData = (url) => {
  const [genre, setGenre] = useState([]);
  const [data2, setData2] = useState([]);
  const [newData2, setNewData2] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const observer = useRef();

  const bottomPage = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && data2.length > 0) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const getData = await axios.get(
          `${BASE_URL}/${url}?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        const mapEasy = getData.data.results;
        setGenre(getData.data.genres);
        setData2(mapEasy);
        setNewData2([...newData2, ...data2]);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, page]);

  return { genre, data2, loading, error, newData2, bottomPage, page };
};

export default useFetchData;
