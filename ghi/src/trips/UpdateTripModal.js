import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeUpdateTripModal } from "../store/tripModalSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useUpdateTripMutation, useGetTripQuery } from "../store/ApiSlice";

export default function UpdateTripModal({open, handleClose}) {

  const selectedTripId = useSelector((state) => state.tripForm.selectedTripId);
  const [formData, setFormData] = useState();
  const { data: trip, isLoading: tripLoading } =
    useGetTripQuery(selectedTripId);

  const dispatch = useDispatch();
  const [updateTrip] = useUpdateTripMutation();

  const handleInputChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  dispatch(closeUpdateTripModal());

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTrip({ formData, selectedTripId });
    handleClose();
  };

  useEffect(() => {
    if (!formData && trip) {
      setFormData({
        "name": trip.name,
        "city": trip.city,
        "state": trip.state,
        "start_date": trip.start_date,
        "end_date": trip.end_date,
      });
    }
  }, [trip, formData]);



  if (!formData || tripLoading) {
    return (
      <>
        <progress className="progress is-primary" max="100"></progress>
      </>
    );
  }

  return (
    <div className={`modal ${open ? "is-active" : ""}`}>
      <Modal show={open} onHide={handleClose}>
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
              <Button className="btn btn-secondary" type="submit">
                Update
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
