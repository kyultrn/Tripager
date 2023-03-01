import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeTripModal, openTripModal } from "../store/tripModalSlice";
import {
  selectFormData,
  updateFormData,
  resetFormData,
  closeUpdateTripModal,
} from "../store/tripModalSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useUpdateTripMutation } from "../store/ApiSlice";

function UpdateTripModal() {
  const isUpdateModalOpen = useSelector((state) => state.tripModal.isModalOpen.updateModal);

  const formData = useSelector(selectFormData);

  const dispatch = useDispatch();
  const [updateTrip, result] = useUpdateTripMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ name, value }));
  };

  const handleCloseModal = () => {
    dispatch(closeUpdateTripModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTrip(formData);
    dispatch(closeUpdateTripModal());
  };

  return (
    <div className={`modal ${isUpdateModalOpen ? "is-active" : ""}`}>
      <Modal show={isUpdateModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Trip</Modal.Title>
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

export default UpdateTripModal;
