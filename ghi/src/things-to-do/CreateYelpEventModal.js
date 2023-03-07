import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  openCreateEventModal,
  closeCreateEventModal,
  selectEventFormData,
  updateFormData,
  resetFormData,
} from "../store/eventModalSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useCreateEventMutation } from "../store/ApiSlice";
import { useGetTripsQuery } from "../store/ApiSlice";

export default function CreateYelpEventModal() {
  const { data, isLoading } = useGetTripsQuery();

  const isCreateModalOpen = useSelector(
    (state) => state.eventModal.isModalOpen.createModal
  );

  const formData = useSelector(selectEventFormData);
  const dispatch = useDispatch();

  const [createEvent, result] = useCreateEventMutation();
  const { id: tripId } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ name, value }));
  };

  const handleCloseModal = () => {
    dispatch(closeCreateEventModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(closeCreateEventModal());
    createEvent({ formData, tripId });
    dispatch(resetFormData());
  };

  return (
    <div className={`modal ${isCreateModalOpen ? "is-active" : ""}`}>
      <Modal show={isCreateModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <Form.Label>Picture</Form.Label>
            <Form.Control
              type="text"
              name="picture_url"
              value={formData.picture_url}
              onChange={handleInputChange}
            />
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
            />
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleInputChange}
            />
            <div>
              <Form.Label>Choose a trip</Form.Label>
              <Form.Select
                name="trip"
                value={formData.tripId}
                onChange={handleInputChange}
              >
                {data.map((trip) => (
                  <option key={trip.id} value={trip.id}>
                    {trip.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <Modal.Footer>
              <Button type="submit">Create</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
