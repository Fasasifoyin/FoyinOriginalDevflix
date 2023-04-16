import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL, API_KEY } from "../API/Config";
import { Row, Col } from "react-bootstrap";
import Asonry from "../Component/Masonry";
import useFetchData from "../Hooks/useFetchData";
import Loading from "../Component/Loading";
import { useRef, useCallback } from "react";

const Genres = () => {
  const observer = useRef();

  const { id } = useParams();
  const [genreList, setGenreList] = useState([]);
  const [newGenreList, setNewGenreList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const { genre } = useFetchData("genre/movie/list");
  const getEachGenreTitle = genre.filter((title) => title.id.toString() === id);

  const lastLine = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
          setLoading(true);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_video=false&page=${page}&with_genres=${id}`
        );
        const movielist = response.data.results;
        setGenreList(movielist);
        setNewGenreList([...newGenreList, ...genreList]);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

  useEffect(() => {
    document.title = getEachGenreTitle.map(
      (getGenre) => `Genre - ${getGenre.name}`
    );
  }, [id, getEachGenreTitle]);

  useEffect(() => {
    window.scrollTo({ top: "0" });
  }, [id]);

  if (!genreList) return <Loading />;

  return (
    <div className="px-3 px-lg-4 py-4 mt-5">
      <h3 className="mb-4">
        {getEachGenreTitle.map((getTitle) => getTitle.name)} Movies
      </h3>
        <Row className='gy-2'>
            {[...genreList, ...newGenreList].map((movie, index) => (
              [...newGenreList, ...genreList].length === index + 1 ? (
              <Col key={index} xs={6} md={3} xl={2} ref={lastLine}>
                <Asonry {...movie} />
                </Col>
              ) : (
                <Col key={index} xs={6} md={3} xl={2}>
                <Asonry {...movie} />
                </Col>
              )
            ))}
        </Row>
      {loading && <Loading />}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Genres;
