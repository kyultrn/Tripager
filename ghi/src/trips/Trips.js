import { useGetTripsQuery } from "../store/TripsApi";


export default Trips;

// GET LIST OF ALL TRIPS
function Trips() {
  const { data, error, isLoading } = useGetTripsQuery();
  console.log(data);

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div>
      <h1>Your Trips</h1>
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
          {data.map((trip) => (
            <tr key={trip.id}>
              <td>
                {" "}
                <a href={"trips/trip.id/events"}>{trip.name}</a>
              </td>
              <td>{trip.city}</td>
              <td>{trip.state}</td>
              <td>{trip.start_date}</td>
              <td>{trip.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
