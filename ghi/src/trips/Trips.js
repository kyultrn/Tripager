import { useGetTripsQuery } from "../store/tripsApi";
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react'

// export const trip_id = ''

// GET LIST OF ALL TRIPS
function Trips() {
  const { data, error, isLoading } = useGetTripsQuery();
  console.log(data);
  // const {trip_id, setTripId} = useState('')

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  // const setTripId = (id) => {
  //   const trip_id = id
  //   return trip_id
  // }

  // const handleTripId = (id) => {
  //   setTripId(id)
  // };

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
              <td><Link to ={`/trips/${trip.id}/events`}>{trip.name}</Link></td>
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

export default Trips;
