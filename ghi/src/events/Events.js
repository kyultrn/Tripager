import { useGetEventsQuery } from "../store/ApiSlice";
import { useGetTripQuery } from "../store/ApiSlice";
import { tripsApi } from "../store/ApiSlice";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeleteEventMutation } from "../store/ApiSlice";

export default function Events() {
  const [deleteEvent, { deleteError }] = useDeleteEventMutation();
  const { id } = useParams();
  const {
    data: trip,
    tripsError,
    isLoading: tripsLoading,
  } = useGetTripQuery(id);
  const { data: events, error, isLoading } = useGetEventsQuery(id);
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

  if (isLoading || tripLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  } else {
    return (
      <div>
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
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>{event.picture_url}</td>
                <td>{event.location}</td>
                <td>{event.start_time}</td>
                <td>{event.end_time}</td>
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
                        handleDeleteEvent(trip.id);
                        Swal.fire(
                          "Deleted!",
                          "Your room has been deleted.",
                          "success"
                        );
                      }
                    });
                  }}
                >
                  Delete
                </i>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
