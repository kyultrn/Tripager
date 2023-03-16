import React from "react";
import styles from "./Events.module.css";
import clouds from "./videos/summer_vacay_2.mp4";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

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

export default function Events() {
  const { id: tripId } = useParams();
  const dispatch = useDispatch();

  const { data: events, error, isLoading } = useGetEventsQuery(tripId);
  const { data: tokenData, isLoading: tokenLoading } = useGetTokenQuery();
  const { data: trip, isLoading: tripLoading } = useGetTripQuery(tripId);
  const [deleteEvent, { deleteError }] = useDeleteEventMutation();

  const handleDeleteEvent = (tripId, eventId) => {
    deleteEvent({ tripId, eventId });
  };

  const isCreateModalOpen = useSelector(
    (state) => state.eventModal.isModalOpen.createModal
  );

  const isUpdateModalOpen = useSelector(
    (state) => state.eventModal.isModalOpen.updateModal
  );

  const handleCreateOpenModal = () => {
    dispatch(openCreateEventModal());
  };

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

  console.log(pages);

  return (
    <div className="eventsContainer">
      {isCreateModalOpen && <CreateEventModal />}
      <h1 className="eventsH1">Events for {trip.name}</h1>
      <Button
        className="createEventButton event-button1"
        variant="light"
        style={{marginRight: "750px"}}
        onClick={handleCreateOpenModal}
      >
        Create Event
      </Button>
      {tokenData && events.length > 0 ? (
        <Carousel interval={null}>
          {pages.map((page, index) => (
            <Carousel.Item key={index}>
              <main
                className={`d-flex justify-content-center ${styles["page-content"]}`}
              >
                {page.map((card) => (
                  <div
                    className={styles.card}
                    key={card.id}
                    style={{
                      backgroundImage: `url(${card.picture_url})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className={styles.content}>
                      <h2 className={styles.title}>{card.name}</h2>
                      <p className={styles.copy}>{card.description}</p>
                      <p
                        className={styles.copy}
                        style={{ marginTop: "0px", marginBottom: "0px" }}
                      >
                        {card.location}
                      </p>
                      <p
                        className={styles.copy}
                        style={{ marginTop: "0px", marginBottom: "0px" }}
                      >
                        {`Event Date: ${formatDate(card.date)}`}{" "}
                      </p>
                      <p
                        className={styles.copy}
                        style={{ marginTop: "0px", marginBottom: "0px" }}
                      >
                        {" "}
                        {`${formatTime(card.start_time)}`} to{" "}
                        {`${formatTime(card.end_time)}`}
                      </p>
                      <button
                        className={styles.btn}
                        onClick={() => handleUpdateOpenModal(card.id)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.btn}
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
                              handleDeleteEvent(tripId, card.id);
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
                      </button>
                    </div>
                  </div>
                ))}
              </main>
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
