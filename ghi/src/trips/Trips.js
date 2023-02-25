import { useGetTripsQuery } from "../store/TripsApi";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import CreateTripModal from "./CreateTripModal";
import { openTripModal, setFormData } from "./TripModalReducer"
import { useDispatch } from "react-redux";
import { setAutoFreeze } from "immer";
// export const trip_id = ''

// GET LIST OF ALL TRIPS
function Trips() {
  const { data, isLoading } = useGetTripsQuery();
  const dispatch = useDispatch()
  const handleOpenModal = () => {
    dispatch(openTripModal())
    dispatch(setFormData({ name: "", city: "", state: "", start_date: "", end_date: "" }))
  };

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div>
      <button onClick={handleOpenModal}>Create a Trip</button>
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
                <Link to={`/trips/${trip.id}/events`}>{trip.name}</Link>
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

export default Trips;
