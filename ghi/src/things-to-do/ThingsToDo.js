import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openCreateEventModal,
  setSelectedBusiness,
  setBusinessDataFetched,
} from "../store/eventModalSlice";
import CreateYelpEventModal from "./CreateYelpEventModal";
import styles from "./ThingsToDo.module.css";
import summer_vacay_2 from "./videos/summer_vacay_2.mp4";
import { useGetTokenQuery } from "../store/ApiSlice";

export default function ThingsToDo() {
  const [formData, setFormData] = useState({
    term: "",
    location: "",
  });

  const [businesses, setBusinesses] = useState([]);
  const [business, setBusiness] = useState([]);
  const dispatch = useDispatch();

  const isCreateModalOpen = useSelector(
    (state) => state.eventModal.isModalOpen.createModal
  );

  const handleCreateOpenModal = (business) => () => {
    if (business && business.name) {
      dispatch(setSelectedBusiness(business));
      dispatch(openCreateEventModal());
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      term: formData.term,
      location: formData.location,
    });

    const response = await fetch(
      `http://localhost:8000/api/businesses?${params.toString()}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();
      dispatch(setBusinessDataFetched(true));
      setBusinesses(data);
      setBusiness(false);
    }
  };

  const [rouletteData, setRouletteData] = useState({
    term: "fun food activity",
    location: "",
  });

  const handleRouletteInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setRouletteData({ ...rouletteData, [inputName]: inputValue });
  };

  const handleRouletteSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      term: rouletteData.term,
      location: rouletteData.location,
    });

    const response = await fetch(
      `http://localhost:8000/api/business?${params.toString()}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();
      dispatch(setBusinessDataFetched(true));
      setBusiness(data);
      setBusinesses(false);
    }
  };

  const { data: tokenData, isLoading: tokenLoading } = useGetTokenQuery();
  if (tokenData) {
  }

  if (tokenLoading) {
    return (
      <>
        <progress className="progress is-primary" max="100"></progress>
      </>
    );
  }

  return (
    <>
      <div>
        <div className="roulette-container roulette-box">
          <div className="blinking-text">
            <span>T</span>
            <span>h</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
            <span>s</span>
            <span> </span>
            <span>t</span>
            <span>o</span>
            <span> </span>
            <span>d</span>
            <span>o</span>
          </div>
        </div>
      </div>
      {isCreateModalOpen && <CreateYelpEventModal />}
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="term">Activity</label>
          <input
            onChange={handleInputChange}
            value={formData.term}
            placeholder="Pizza, Rollerblading, Spa, Frozen yogurt"
            required
            type="text"
            name="term"
            id="term"
            className="form-control"
          />
          <label htmlFor="location">Location</label>
          <input
            onChange={handleInputChange}
            value={formData.location}
            placeholder="City, State, Zipcode"
            required
            type="text"
            name="location"
            id="location"
            className="form-control"
          />
          <div className="submit-button-container">
            <button className="btn btn-secondary submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div>
        <div>
          <div className="roulette-container roulette-box">
            <div className="blinking-text">
              <span>P</span>
              <span>l</span>
              <span>a</span>
              <span>y</span>
              <span> </span>
              <span>E</span>
              <span>x</span>
              <span>c</span>
              <span>u</span>
              <span>r</span>
              <span>s</span>
              <span>i</span>
              <span>o</span>
              <span>n</span>
              <span> </span>
              <span>R</span>
              <span>o</span>
              <span>u</span>
              <span>l</span>
              <span>e</span>
              <span>t</span>
              <span>t</span>
              <span>e</span>
              <span>!</span>
            </div>
          </div>
        </div>
        <div className={styles.form_container}>
          <div className={styles.form}>
            <form>
              <label htmlFor="location">Location</label>
              <input
                onChange={handleRouletteInputChange}
                value={rouletteData.location}
                placeholder="City, State, Zipcode"
                required
                type="text"
                name="location"
                id="location"
                className="form-control"
              />
              <div className="submit-button-container">
                <button
                  onClick={handleRouletteSubmit}
                  className="btn btn-secondary submit-button"
                  variant="primary"
                >
                  I'm Feeling Lucky!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.cards}>
        <Row className="g-4 justify-content-center">
          {businesses &&
            businesses.businesses?.map((business) => (
              <Col key={business.id}>
                <Card style={{ width: "19rem", height: "430px" }}>
                  <Card.Img
                    variant="top"
                    src={business.image_url}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Card.Title>{business.name}</Card.Title>
                    <Card.Text>
                      {business.location.address1},{business.location.address3}{" "}
                      {business.location.city}, {business.location.zip_code},{" "}
                      {business.location.country}, {business.location.state}
                    </Card.Text>
                    <div style={{ height: "60px" }}>
                      <a
                        href={business.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="btn btn-secondary" variant="primary">
                          Get details
                        </button>
                      </a>
                      {tokenData ? (
                        <button
                          onClick={handleCreateOpenModal(business)}
                          className="btn btn-secondary"
                          variant="primary"
                        >
                          Add to events
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
      <div className={styles.cards}>
        <Row className="g-4 justify-content-center">
          {business &&
            business.businesses?.map((business) => (
              <Col key={business.id}>
                <Card
                  style={{
                    width: "19rem",
                    height: "430px",
                    marginLeft: "35px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={business.image_url}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Card.Title>{business.name}</Card.Title>
                    <Card.Text>
                      {business.location.address1},{business.location.address3}{" "}
                      {business.location.city}, {business.location.zip_code},{" "}
                      {business.location.country}, {business.location.state}
                    </Card.Text>
                    <div style={{ height: "60px" }}>
                      <a
                        href={business.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="btn btn-secondary" variant="primary">
                          Get details
                        </button>
                      </a>
                      {tokenData ? (
                        <button
                          onClick={handleCreateOpenModal(business)}
                          className="btn btn-secondary"
                          variant="primary"
                        >
                          Add to events
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
      <div className="cloudVideo">
        <video
          style={{
            position: "fixed",
            zIndex: -1,
            width: "100%",
            height: "100%",
          }}
          src={summer_vacay_2}
          autoPlay
          loop
          muted
        />
      </div>
    </>
  );
}
