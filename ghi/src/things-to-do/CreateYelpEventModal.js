import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  closeCreateEventModal,
  selectEventFormData,
  updateFormData,
  resetFormData,
} from "../store/eventModalSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useCreateEventMutation } from "../store/ApiSlice";
import { useGetTripsQuery } from "../store/ApiSlice";
import ThingsToDo from "./ThingsToDo";
import { setSelectedTripId } from "../store/tripModalSlice";

export default function CreateYelpEventModal() {
  const { data, isLoading: tripsLoading } = useGetTripsQuery();
  console.log(data);

  // const [tripId, setTripId] = useState('')

  const selectedBusiness = useSelector((state) => state.eventForm.selectedBusiness);
  console.log(selectedBusiness)
  const selectedTripId = useSelector((state) => state.tripForm.selectedTripId);
  const isCreateModalOpen = useSelector((state) => state.eventModal.isModalOpen.createModal);
  console.log("isCreateModalOpen:  ", isCreateModalOpen)

  const dispatch = useDispatch();

  const [createEvent, result] = useCreateEventMutation();
  const [formData, setFormData] = useState({
    name: selectedBusiness.name,
    description: "",
    picture_url: selectedBusiness.image_url,
    location: selectedBusiness.location.address1,
    date: "",
    start_time: "",
    end_time: "",
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  const handleCloseModal = () => {
    dispatch(closeCreateEventModal());
  };

  const handleTripChange = (e) => {
    dispatch(setSelectedTripId(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedTripId);
    dispatch(closeCreateEventModal());
    createEvent({ formData, selectedTripId });
    dispatch(resetFormData());
  };


  if ( isCreateModalOpen && tripsLoading && selectedBusiness) {
    return (
      <>
        <progress className="progress is-primary" max="100"></progress>
      </>
    );
  }


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
              // {business.image_url}
              onChange={handleInputChange}
            />
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              // {business.location.address1}
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
            <Form.Label>Choose a trip</Form.Label>
            <Form.Select name="trip" onChange={handleTripChange}>
              {tripsLoading ? (
                <option>Loading...</option>
              ) : (
                data.map((trip) => (
                  <option key={trip.id} value={trip.id}>
                    {trip.name}
                  </option>
                ))
              )}
            </Form.Select>
            <Modal.Footer>
              <Button type="submit">Create</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
