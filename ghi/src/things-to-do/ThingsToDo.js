import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
// import { useGetThingsToDoQuery } from "../store/ApiSlice";
import ExcursRoulette from "../ExcursRoulette";
import { useDispatch, useSelector } from "react-redux";
import {
  openCreateEventModal,
  setSelectedBusiness,
} from "../store/eventModalSlice";
import CreateYelpEventModal from "./CreateYelpEventModal";
import styles from "./ThingsToDo.module.css";
import summer_vacay_2 from "./videos/summer_vacay_2.mp4";

export default function ThingsToDo() {
  const [formData, setFormData] = useState({
    term: "",
    location: "",
  });

  const [businesses, setBusiness] = useState([]);
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
      setBusiness(data);
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
      `http://localhost:8000/api/businesses?${params.toString()}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setBusiness(data);
    }
  };

  return (
    <>
      <div>
        <h1 className={styles.title_ttd}>Things to do</h1>
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
          <Button className="btn-secondary" type="submit">
            Submit
          </Button>
        </form>
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
                        <Button className="btn btn-secondary" variant="primary">
                          Get details
                        </Button>
                      </a>
                      <Button
                        onClick={handleCreateOpenModal(business)}
                        className="btn btn-secondary"
                        variant="primary"
                      >
                        Add to events
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>

      <div>
        <div>
          <h1 className={styles.excurs_words_container}>
            Don't know what to do? Play Excursion Roulette!
          </h1>
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
              <Button
                onClick={handleRouletteSubmit}
                className="btn btn-secondary"
                variant="primary"
              >
                I'm feeling lucky
              </Button>
            </form>
          </div>
        </div>
      </div>
      {/* <ExcursRoulette /> */}

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
