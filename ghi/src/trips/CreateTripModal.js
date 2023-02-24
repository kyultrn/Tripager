import React from "react";
import { render, useState } from "react-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import showStore from "../store/Store";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";


export default CreateTripModal;

function CreateTripModal() {
  const dispatch = useDispatch()
  const showModal = useSelector((state) => state.tripModal.isOpen);
  const formData = useSelector((state) => state.tripModal.formData)
  

  const handleShow = () => {
    showStore.dispatch({ type: "SHOW" });
  };

  const handleClose = () => {
    showStore.dispatch({ type: "HIDE" });
  };

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
              <Button onClick={handleClose}>Create Trip</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
