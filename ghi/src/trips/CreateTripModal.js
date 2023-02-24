import React from "react";
import { useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import showStore from "../store/Store";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import { openTripModal, closeTripModal, setFormData, clearFormData } from './TripModalReducer'
import { useCreateTripMutation } from "../store/TripsApi";
import { useNavigate } from "react-router-dom";

export default CreateTripModal;

function CreateTripModal() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const showModal = useSelector((state) => state.tripModal.isOpen);
  const formData = useSelector((state) => state.tripModal.formData)
  const [name, setName] = useState(formData.name || '')
  const [city, setCity] = useState(formData.city || '')
  const [state, setState] = useState(formData.state || '')
  const [start_date, setStartDate] = useState(formData.start_date || '')
  const [end_date, setEndDate] = useState(formData.end_date || '')
  const [createTrip, result] = useCreateTripMutation()
  const [error, setError] = useState('')

  const handleShow = () => {
    dispatch(showModal());
    dispatch(setFormData({ name: "", city: "", state: "", start_date: "", end_date: ""}))
  };

  const handleClose = () => {
    dispatch(closeTripModal())
    dispatch(clearFormData())
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    createTrip({name, city, state, start_date, end_date})
  }
  if (result.isSuccess){
    navigate('/api/trips')
  } else if (result.isError) {
    setError(result.error)
  }


  return (
    <div>
      <Button onClick={handleShow}>Show modal</Button>
      // Changed to use const declared above
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Trip</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="John's Bachelor Party" />
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Las Vegas" />
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="Nevada" />
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" placeholder="" />
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" placeholder="" />

            <Modal.Footer>
              <Button onClick={handleSubmit}>Create Trip</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
