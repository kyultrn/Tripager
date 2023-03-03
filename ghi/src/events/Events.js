import { useGetEventsQuery } from "../store/ApiSlice";
import { useGetTripQuery, useGetTokenQuery } from "../store/ApiSlice";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeleteEventMutation } from "../store/ApiSlice";
import CreateEventModal from "./CreateEventModal";
import { useDispatch, useSelector } from "react-redux";
import { openCreateEventModal, openUpdateEventModal, setSelectedEventId } from "../store/eventModalSlice";
import UpdateEventModal from "./UpdateEventModal";
import Image from "react-bootstrap/Image";

export default function Events() {
  const [deleteEvent, { deleteError }] = useDeleteEventMutation();
  const { id: tripId } = useParams();

  const dispatch = useDispatch()

  const { data: events, error, isLoading } = useGetEventsQuery(tripId);
  const { data: tokenData, isLoading: tokenLoading } = useGetTokenQuery();

  const {
    data: trip,
    isLoading: tripLoading,
  } = useGetTripQuery(tripId);

  const handleDeleteEvent = (tripId, eventId) => {
    deleteEvent({tripId,eventId});
  }

  const isCreateModalOpen = useSelector(
    (state) => state.eventModal.isModalOpen.createModal
  );


  const handleCreateOpenModal = () => {
    dispatch(openCreateEventModal());
  };

  const isUpdateModalOpen = useSelector( state => state.eventModal.isModalOpen.updateModal)

  const handleUpdateOpenModal = (eventId) => {
    dispatch(openUpdateEventModal())
    dispatch(setSelectedEventId(eventId))
  }


  if (isLoading || tripLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }
  return (
    <div>
      <button className="btn btn-primary" onClick={handleCreateOpenModal}>
        Create a Event
      </button>
      {isCreateModalOpen && <CreateEventModal />}
      <h1>Events for {trip.name}</h1>
      <table className="table is-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {tokenData ? (
            <>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.description}</td>
                  <td>{event.location}</td>
                  <td>{event.date}</td>
                  <td>{event.start_time}</td>
                  <td>{event.end_time}</td>
                  <td>
                    <Image className="event-picture" rounded thumbnail src={event.picture_url} />
                  </td>
                  <td>
                    <i
                      type="button"
                      onClick={() => handleUpdateOpenModal(event.id)}
                      className="fa-solid fa-pen-to-square"
                    />
                    {isUpdateModalOpen && <UpdateEventModal />}
                  </td>
                  <td>
                    <i
                      variant="btn-sm m-1"
                      className="btn-red btn-sm text-right"
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
                    </i>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <div>No events</div>
          )}
        </tbody>
      </table>
    </div>
  );
}
