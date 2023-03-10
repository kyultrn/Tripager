import { useGetEventsQuery } from "../store/ApiSlice";
import { useGetTripQuery, useGetTokenQuery } from "../store/ApiSlice";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeleteEventMutation } from "../store/ApiSlice";
import CreateEventModal from "./CreateEventModal";
import { useDispatch, useSelector } from "react-redux";
import {
  openCreateEventModal,
  openUpdateEventModal,
  setSelectedEventId,
} from "../store/eventModalSlice";
import UpdateEventModal from "./UpdateEventModal";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import clouds from "./videos/summer_vacay_2.mp4";

export default function Events() {
  const [deleteEvent, { deleteError }] = useDeleteEventMutation();
  const { id: tripId } = useParams();

  const dispatch = useDispatch();

  const { data: events, error, isLoading } = useGetEventsQuery(tripId);
  const { data: tokenData, isLoading: tokenLoading } = useGetTokenQuery();

  const { data: trip, isLoading: tripLoading } = useGetTripQuery(tripId);

  const handleDeleteEvent = (tripId, eventId) => {
    deleteEvent({ tripId, eventId });
  };

  const isCreateModalOpen = useSelector(
    (state) => state.eventModal.isModalOpen.createModal
  );

  const handleCreateOpenModal = () => {
    dispatch(openCreateEventModal());
  };

  const isUpdateModalOpen = useSelector(
    (state) => state.eventModal.isModalOpen.updateModal
  );

  const handleUpdateOpenModal = (eventId) => {
    dispatch(openUpdateEventModal());
    dispatch(setSelectedEventId(eventId));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  function formatTime(timeString) {
    const timeArray = timeString.split(":");
    let hours = parseInt(timeArray[0]);
    const minutes = timeArray[1];
    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${suffix}`;
  }

  if (isLoading || tripLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  const pages = [];
  let page = [];

  if (events && events.length > 0) {
    events.forEach((event, index) => {
      if (index % 3 === 0 && index !== 0) {
        pages.push(page);
        page = [];
      }
      page.push(event);
    });
    pages.push(page);
  }

  return (
    <div className="eventsContainer">
      {isCreateModalOpen && <CreateEventModal />}
      <h1 className="eventsH1">Events for {trip.name}</h1>
      <Button
        className="createEventButton"
        variant="light"
        onClick={handleCreateOpenModal}
      >
        Create Event
      </Button>
      {tokenData && events.length > 0 ? (
        <Carousel interval={null}>
          {pages.map((page, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {page.map((event) => (
                  <Card key={event.id} className="mx-2">
                    <Card.Img
                      className="eventsCardImage"
                      variant="top"
                      src={event.picture_url}
                      alt={event.name}
                    />
                    <Card.Body className="eventsCardBody">
                      <Card.Title>{`${event.name}`}</Card.Title>
                      <Card.Text>{`Description: ${event.description}`}</Card.Text>
                      <Card.Text>{`Location: ${event.location}`}</Card.Text>
                      <Card.Text>{`Event Date: ${formatDate(
                        event.date
                      )}`}</Card.Text>
                      <Card.Text>{`Start time: ${formatTime(
                        event.start_time
                      )}`}</Card.Text>
                      <Card.Text>{`Endtime: ${formatTime(
                        event.end_time
                      )}`}</Card.Text>
                      <Button
                        className="editButtonEvents"
                        variant="secondary"
                        onClick={() => handleUpdateOpenModal(event.id)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        className="deleteButtonEvents"
                        variant="danger"
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#bb7e74",
                            cancelButtonColor: "#808080",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleDeleteEvent(tripId, event.id);
                              Swal.fire(
                                "Deleted!",
                                "Your event has been deleted.",
                                "success"
                              );
                            }
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div>No events</div>
      )}
      <div className="cloudVideo">
        <video
          style={{
            position: "fixed",
            zIndex: -1,
            width: "100%",
            height: "100%",
          }}
          src={clouds}
          autoPlay
          loop
          muted
        />
      </div>
      {isUpdateModalOpen && <UpdateEventModal />}
    </div>
  );
}
