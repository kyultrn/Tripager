import { useGetTripsQuery } from "../store/TripsApi";
import { useNavigate, Link } from "react-router-dom";
import { openTripModal, tripModalSlice } from "./TripModalReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ModalForm from "./CreateTripModal";
// export const trip_id = ''

// GET LIST OF ALL TRIPS
export function Trips() {
  const { data, isLoading } = useGetTripsQuery();
  const dispatch = useDispatch();

  const isModalOpen = useSelector((state) => state.tripModal.isModalOpen);

  const handleOpenModal = () => {
    console.log("handleopenmodal is working");
    dispatch(openTripModal());
  };

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  
  return (
    <div>
      <button onClick={handleOpenModal}>Create a Trip</button>
      {isModalOpen && <ModalForm />}
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
