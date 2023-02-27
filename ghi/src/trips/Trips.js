import { useGetTripsQuery } from "../store/TripsApi";
import { useNavigate, Link } from "react-router-dom";
import { closeTripModal, openTripModal, tripModalSlice } from "./TripModalReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ModalForm from "./CreateTripModal";
import UpdateTripModal from "./UpdateTripModal";
import CreateTripModal from "./CreateTripModal";


export function Trips() {
  const { data, isLoading } = useGetTripsQuery();
  const dispatch = useDispatch();
  // const { data: trip, tripsError , isLoading: tripsLoading } = useGetTripQuery(id)

  const isModalOpen = useSelector((state) => state.tripModal.isModalOpen);

  const handleOpenModal = () => {
    dispatch(openTripModal())
  }

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  const handleDeleteTrip = () => {

  }

  const handleUpdateTrip = () => {

  }

  return (
    <div>
      <button onClick={handleOpenModal}>Create a Trip</button>
      {isModalOpen && <CreateTripModal />}
      <h1>Your Trips</h1>
      <table className="table is-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th></th>
            <th></th>
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
              <td>
              <i onClick={handleOpenModal}className="fa-solid fa-pen-to-square"
              />
              {isModalOpen && <UpdateTripModal />}
              </td>
              <td>
                <i
                  onClick={() => {
                    handleDeleteTrip(trip.id);
                  }}
                  className="fa fa-trash"
                  aria-hidden="true"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Trips;
