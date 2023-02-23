import { useGetEventsQuery } from "../store/EventsApi";
import { tripsApi } from "../store/TripsApi";

export default Events;

// GET LIST OF ALL EVENTS
function Events() {
  const { data, error, isLoading } = useGetEventsQuery(3);
  console.log(data);

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div>
      <h1>{} Events</h1>
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
          {data.map((event) => (
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
