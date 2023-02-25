import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeTripModal, openTripModal } from "./TripModalReducer";
import { selectFormData, updateFormData } from "./FormSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";


function ModalForm() {
  console.log("form is woorking")
  const isModalOpen = useSelector((state) => state.tripModal.isModalOpen);
  const formData = useSelector(selectFormData);
  console.log(formData)
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ name, value }));
  };

  const handleCloseModal = () => {
    dispatch(closeTripModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch an action to submit the form data
    // e.g. dispatch(submitFormData(formData))
  };

  return (
    <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' name='name' value={formData.name} onChange={handleInputChange} />
            <Form.Label>City</Form.Label>
            <Form.Control type='text' name='city' value={formData.city} onChange={handleInputChange} />
            <Form.Label>State</Form.Label>
            <Form.Control type='text' name='state' value={formData.state} onChange={handleInputChange} />
            <Form.Label>Start Date</Form.Label>
            <Form.Control type='text' name='start date' value={formData.start_date} onChange={handleInputChange} />
            <Form.Label>End Date</Form.Label>
            <Form.Control type='text' name='end date' value={formData.end_date} onChange={handleInputChange} />
            <Modal.Footer>
              <Button onClick={handleCloseModal}>Create</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Start Date:
            <input
              type="text"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
            />
          </label>
          <label>
            End Date:
            <input
              type="text"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={handleCloseModal}
      ></button> */}
    </div>
  );
}

export default ModalForm;
