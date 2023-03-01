import { useGetTripsQuery } from "../store/ApiSlice";
import { useNavigate, Link } from "react-router-dom";
import { openCreateTripModal, openUpdateTripModal } from "../store/tripModalSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import ModalForm from "./CreateTripModal";
import UpdateTripModal from "./UpdateTripModal";
import CreateTripModal from "./CreateTripModal";
import { useGetTokenQuery } from "../store/ApiSlice";
import { store } from "../store/store";

export function Trips() {
  const { data, isLoading } = useGetTripsQuery();
  const { data: tokenData, isLoading: tokenLoading } = useGetTokenQuery();
  if (tokenData) {
    console.log(tokenData);
  }
  console.log(data);
  const dispatch = useDispatch();
  // const { data: trip, tripsError , isLoading: tripsLoading } = useGetTripQuery(id)

  const isCreateModalOpen = useSelector((state) => state.tripModal.isModalOpen.createModal);
  const isUpdateModalOpen = useSelector((state) => state.tripModal.isModalOpen.updateModal);

  const handleCreateOpenModal = () => {
    dispatch(openCreateTripModal());
  };
  const handleUpdateOpenModal = () => {
    console.log(isUpdateModalOpen)
    dispatch(openUpdateTripModal());
  };

  if (tokenLoading) {
    return (
      <>
        <progress className="progress is-primary" max="100"></progress>
      </>
    );
  }

  const handleDeleteTrip = () => {};

  const handleUpdateTrip = () => {};

  return (
    <div>
      <button className="btn btn-primary" onClick={handleCreateOpenModal}>
        Create a Trip
      </button>
      {isCreateModalOpen && <CreateTripModal />}
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
        {store.getState().loggedIn.logged ? (
          <>
          {data?.map((trip) => (
            <tr key={trip.id}>
              <td>
                <Link to={`/trips/${trip.id}/events`}>{trip.name}</Link>
              </td>
              <td>{trip.city}</td>
              <td>{trip.state}</td>
              <td>{trip.start_date}</td>
              <td>{trip.end_date}</td>
              <td>
                  <i
                    type='button'
                    onClick={handleUpdateOpenModal}
                    className="fa-solid fa-pen-to-square"
                  />
                {isUpdateModalOpen && <UpdateTripModal />}
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
          </>
        ) : (
          <div>No trips</div>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default Trips;
