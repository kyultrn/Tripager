import { useSelector, useDispatch } from "react-redux"
import { closeUpdateEventModal } from "../store/eventModalSlice"
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form } from "react-bootstrap"
import { useUpdateEventMutation, useGetEventQuery } from "../store/ApiSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import summer_vacay_2 from "./videos/summer_vacay_2.mp4";

export default function UpdateEventModal() {
    const isUpdateModalOpen = useSelector(state => state.eventModal.isModalOpen.updateModal)
    const selectedEventId = useSelector(state => state.eventForm.selectedEventId)
    const { id: tripId } = useParams();
    const { data: event, isLoading: eventLoading } = useGetEventQuery({selectedEventId, tripId})

    // const selectedBusiness = useSelector(state => state.eventForm.selectedBusiness)


    const [formData, setFormData] = useState()
    const dispatch = useDispatch()
    const [updateEvent] = useUpdateEventMutation()

    const handleInputChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
    });
    };


    const handleCloseModal = () => {
        dispatch(closeUpdateEventModal())
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateEvent({formData, selectedEventId, tripId})
        dispatch(closeUpdateEventModal())
    }

    useEffect(() => {
        if(!formData && event){
            setFormData({
                "name": event.name,
                "description": event.description,
                "picture_url": event.picture_url,
                "location": event.location,
                "date": event.date,
                "start_time": event.start_time,
                "end_time": event.end_time,
        })
        }
    }, [event])

    if (!formData || eventLoading ) {
        return (
            <>
                <progress className="progress is-primary" max="100"></progress>
            </>
        )
    }

    return (
      <div className={`modal ${isUpdateModalOpen ? "is-active" : ""}`}>
        <Modal show={isUpdateModalOpen} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Event</Modal.Title>
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
              <Form.Label htmlFor="exampleFormControlTextarea1">
                Description
              </Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <Form.Label>Picture Url</Form.Label>
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
              <Form.Label>End time</Form.Label>
              <Form.Control
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleInputChange}
              />
              <Modal.Footer>
                <button className="btn btn-secondary" type="submit">
                  Update
                </button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
}
