import React from 'react'
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const SearchLayout = ({each, setSearchBox}) => {

    function chosenImage(takein) {
        // eslint-disable-next-line eqeqeq
        if (takein.media_type == "movie") {
          return `https://image.tmdb.org/t/p/w500/${takein.poster_path}`;
        // eslint-disable-next-line eqeqeq
        } else if (takein.media_type == "person") {
          return `https://image.tmdb.org/t/p/original/${takein.profile_path}`;
        } else {
          return `https://image.tmdb.org/t/p/w500/${takein.poster_path}`;
        }
      }
      function link(takein) {
        // eslint-disable-next-line eqeqeq
        if (takein.media_type == "movie") {
          return `/movie/${takein.id}`;
        // eslint-disable-next-line eqeqeq
        } else if (takein.media_type == "person") {
          return `/person/${takein.id}`;
        } else {
          return `/tv/${takein.id}`;
        }
      }
    
      function first(takein) {
        // eslint-disable-next-line eqeqeq
        if (takein.media_type == "movie") {
          return `${takein.title}`;
        // eslint-disable-next-line eqeqeq
        } else if (takein.media_type == "person") {
          return `${takein.name}`;
        } else {
          return `${takein.original_name}`;
        }
      }

  return (
    <>
                    <Link
              to={link(each)}
              onClick={() => setSearchBox(false)}
              className="text-decoration-none"
            >
              <div className="d-flex gap-3">
                <Image src={chosenImage(each)} className="searchimage" />
                <div className="d-flex flex-column gap-1">
                  <p
                    style={{ color: "rgb(101, 140, 173)" }}
                    className="fw-bold mb-0"
                  >
                    {first(each)}
                  </p>
                  <p style={{ color: "rgb(133, 96, 67)" }} className="mb-0">
                    {each.media_type}
                  </p>
                </div>
              </div>
            </Link>
    </>
  )
}

export default SearchLayout