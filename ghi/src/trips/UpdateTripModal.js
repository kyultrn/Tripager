import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeTripModal, openTripModal } from "../store/tripModalSlice";
import {
  selectTripFormData,
  updateFormData,
  resetFormData,
  closeUpdateTripModal,
} from "../store/tripModalSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useUpdateTripMutation, useGetTripQuery } from "../store/ApiSlice";

function UpdateTripModal() {
  const isUpdateModalOpen = useSelector((state) => state.tripModal.isModalOpen.updateModal);
  const selectedTripId = useSelector(state => state.tripForm.selectedTripId);
  const formData = useSelector(selectTripFormData);
  console.log(selectedTripId)
  const { data: trip, isLoading: tripLoading } = useGetTripQuery(selectedTripId)
  console.log('this is the trip data:', trip)
  const dispatch = useDispatch();
  const [updateTrip, result] = useUpdateTripMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ name, value }));
  };

  const handleCloseModal = () => {
    dispatch(closeUpdateTripModal());
  };
  console.log()
  const handleSubmit = (e) => {
    e.preventDefault();
    updateTrip({formData, selectedTripId});
    dispatch(resetFormData())
    // console.log("this is the object of data on update *********", {formData, selectedTripId})
    dispatch(closeUpdateTripModal());
  };

  if (tripLoading) {
      return (
        <>
          <progress className="progress is-primary" max="100"></progress>
        </>
      );
    }

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
              value={formData.name || trip.name}
              onChange={handleInputChange}
            />
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city || trip.city}
              onChange={handleInputChange}
            />
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.state || trip.state}
              onChange={handleInputChange}
            />
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="start_date"
              value={formData.start_date || trip.start_date}
              onChange={handleInputChange}
            />
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="end_date"
              value={formData.end_date || trip.end_date}
              onChange={handleInputChange}
            />
            <Modal.Footer>
              <Button type="submit">Update</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateTripModal;
