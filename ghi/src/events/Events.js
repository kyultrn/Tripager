import { useGetEventsQuery } from "../store/ApiSlice";
import { useGetTripQuery, useGetTokenQuery } from "../store/ApiSlice";
import { tripsApi } from "../store/ApiSlice";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeleteEventMutation } from "../store/ApiSlice";
import CreateEventModal from "./CreateEventModal";
import { openCreateEventModal } from "../store/eventModalSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Events() {
  const [deleteEvent, { deleteError }] = useDeleteEventMutation();
  const { id } = useParams();
  const {
    data: trip,
    tripsError,
    isLoading: tripsLoading,
  } = useGetTripQuery(id);
  
  const { data: events, error, isLoading } = useGetEventsQuery(id);
  const { data: tokenData, isLoading: tokenLoading } = useGetTokenQuery();
  
  const {
    data: trips,
    tripError,
    isLoading: tripLoading,
  } = useGetTripQuery(id);

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await deleteEvent(eventId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const isCreateModalOpen = useSelector(
    (state) => state.eventModal.isModalOpen.createModal
  );

  const dispatch = useDispatch();

  const handleCreateOpenModal = () => {
    dispatch(openCreateEventModal())
  }
  

  if (isLoading || tripLoading || tokenLoading) {
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
            <th>City</th>
            <th>State</th>
            <th>Picture</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {tokenData ? (
            <>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.description}</td>
                  <td>{event.picture_url}</td>
                  <td>{event.location}</td>
                  <td>{event.start_time}</td>
                  <td>{event.end_time}</td>
                </tr>
              ))}
            </>
          ) : (
            <div>No trips</div>
          )}
        </tbody>
      </table>
    </div>
  );
}
