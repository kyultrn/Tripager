import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  closeTripModal,
  openTripModal,
  selectFormData,
  updateFormData,
  resetFormData,
  closeCreateTripModal,
} from "../store/tripModalSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useCreateTripMutation } from "../store/ApiSlice";

export default function CreateTripModal() {
  const isCreateModalOpen = useSelector((state) => state.tripModal.isModalOpen.createModal);

  const formData = useSelector(selectFormData);

  const dispatch = useDispatch();
  const [createTrip, result] = useCreateTripMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ name, value }));
  };

  const handleCloseModal = () => {
    dispatch(closeCreateTripModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(closeCreateTripModal());
    createTrip(formData);
    dispatch(resetFormData());
    console.log(formData)
  };

  return (
    <div className={`modal ${isCreateModalOpen ? "is-active" : ""}`}>
      <Modal show={isCreateModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Trip</Modal.Title>
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
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
            />
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
            />
            <Modal.Footer>
              <Button type="submit">Create</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
