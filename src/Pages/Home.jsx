import useFetchData from "../Hooks/useFetchData";
import Asonry from "../Component/Masonry";
import { Row, Col } from "react-bootstrap";
import Loading from "../Component/Loading";
import { useEffect } from "react";

const Home = () => {
  const { data2, loading, error, newData2, bottomPage } =
    useFetchData("trending/all/day");
  const aa = [...newData2, ...data2];

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="px-3 px-lg-4 py-4 mt-5">
      <h3 className="mb-4">Trending Movies</h3>
      <Row className="gy-2">
        {aa.map((each, index) =>
          aa.length === index + 1 ? (
            <Col key={index} xs={6} md={3} xl={2} ref={bottomPage}>
              <Asonry {...each} />
            </Col>
          ) : (
            <Col key={index} xs={6} md={3} xl={2}>
              <Asonry {...each} />
            </Col>
          )
        )}
      </Row>
      {loading && <Loading />}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Home;
