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
import { openCreateEventModal } from "../store/eventModalSlice";
import { useGetEventsQuery } from "../store/ApiSlice";
import { useGetTripQuery, useGetTokenQuery } from "../store/ApiSlice";
import CreateYelpEventModal from "./CreateYelpEventModal";

export default ThingsToDo;

function ThingsToDo() {
  const [formData, setFormData] = useState({
    term: "",
    location: "",
  });

  const { data, isLoading } = useGetThingsToDoQuery(formData);
  console.log(data);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ term: formData.term, location: formData.location });
  };

  useEffect(() => {}, [formData]);

  ////// MODAL STUFF
  const dispatch = useDispatch();
  const { id: tripId } = useParams();
  const { data: events, error } = useGetEventsQuery(tripId);
  const { data: tokenData, isLoading: tokenLoading } = useGetTokenQuery();

  const { data: trip, isLoading: tripLoading } = useGetTripQuery(tripId);

  const isCreateModalOpen = useSelector(
    (state) => state.eventModal.isModalOpen.createModal
  );

  const handleCreateOpenModal = () => {
    dispatch(openCreateEventModal());
  };

  return (
    <>
      <div className="ThingsToDoPage">
        {isCreateModalOpen && <CreateYelpEventModal />}
        <form onSubmit={handleSubmit}>
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
        </form>

        <div className="searchbar">
          <Row className="g-4 justify-content-center">
            {data?.businesses.map((business) => (
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
                      <Button onClick={handleCreateOpenModal} variant="primary">
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
      </div>
    </>
  );
}
