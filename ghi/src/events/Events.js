import { useGetEventsQuery } from "../store/ApiSlice";
import { useGetTripQuery, useGetTokenQuery } from "../store/ApiSlice";
import { tripsApi } from "../store/ApiSlice";
import { useParams } from "react-router-dom";
import { openCreateEventModal, openUpdateEventModal, setSelectedEventId } from "../store/eventModalSlice";
import { useDispatch, useSelector } from "react-redux";
import UpdateEventModal from "./UpdateEventModal";

export default function Events() {
  const { id } = useParams();
  const dispatch = useDispatch()

  const { data: events, error, isLoading } = useGetEventsQuery(id);
  const { data: tokenData, isLoading: tokenLoading } = useGetTokenQuery();
  const {
    data: trip,
    isLoading: tripLoading,
  } = useGetTripQuery(id);

  const isUpdateModalOpen = useSelector( state => state.eventModal.isModalOpen.updateModal)

  const handleUpdateOpenModal = (eventId) => {
    dispatch(openUpdateEventModal())
    dispatch(setSelectedEventId(eventId))
  }


  if (isLoading || tripLoading || tokenLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }
  return (
    <div>
      <h1>
        Events for {trip.name}
      </h1>
      <table className="table is-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Picture</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {tokenData ? (
            <>
              {events?.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.description}</td>
                  <td>{event.location}</td>
                  <td>{event.picture_url}</td>
                  <td>{event.location}</td>
                  <td>{event.start_time}</td>
                  <td>{event.end_time}</td>
                  <td>
                    <i
                      type="button"
                      onClick={() => handleUpdateOpenModal(event.id)}
                      className="fa-solid fa-pen-to-square"
                    />
                    {isUpdateModalOpen && <UpdateEventModal />}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <div>No Events</div>
              )}
        </tbody>
      </table>
    </div>
  );

}
