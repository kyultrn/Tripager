import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useGetThingsToDoQuery } from "../store/ApiSlice";
import ExcursRoulette from "../ExcursRoulette";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  openCreateEventModal,
  setSelectedBusiness,
} from "../store/eventModalSlice";
import { useGetEventsQuery } from "../store/ApiSlice";
import {
  useGetTripQuery,
  useGetTripsQuery,
  useGetTokenQuery,
} from "../store/ApiSlice";
import CreateYelpEventModal from "./CreateYelpEventModal";
import styles from "./ThingsToDo.module.css"

export default function ThingsToDo() {
  const [formData, setFormData] = useState({
    term: "",
    location: "",
  });

  const [businesses, setBusiness] = useState([])
  const dispatch = useDispatch();

  const isCreateModalOpen = useSelector(
    (state) => state.eventModal.isModalOpen.createModal
  );

  const handleCreateOpenModal = (business) => () => {
    if (business && business.name){
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
      setBusiness(data)

    }
  };

  return (
    <>
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
            placeholder="New York, 10011, Mars"
            required
            type="text"
            name="location"
            id="location"
            className="form-control"
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>

      <div className="searchbar">
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
                        <Button variant="primary">Get details</Button>
                      </a>
                      <Button
                        onClick={handleCreateOpenModal(business)}
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
      <ExcursRoulette />
    </>
  );
}
