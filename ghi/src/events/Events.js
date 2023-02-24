import { useGetEventsQuery } from "../store/EventsApi";
import { useGetTripQuery } from "../store/TripsApi";
import { tripsApi } from "../store/TripsApi";
import { useParams } from "react-router-dom";

// GET LIST OF ALL EVENTS
export default function Events() {
  const { id } = useParams();

  const { data: events, error, isLoading } = useGetEventsQuery(id);
  const { data: trips } = useGetTripQuery(id);

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div>
      <h1>{trips.name} Events</h1>
      <table className="table is-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}