import { useGetEventsQuery } from "../store/EventsApi";
import { tripsApi } from "../store/tripsApi";
import { useParams } from 'react-router-dom'

// GET LIST OF ALL EVENTS
export default function Events() {
  const { id } = useParams()
  const { data, error, isLoading } = useGetEventsQuery(id);
  // console.log(data);

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
              <td><Link to={`/trip/${trip.id}/events`}>{trip.name}</Link></td>
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
