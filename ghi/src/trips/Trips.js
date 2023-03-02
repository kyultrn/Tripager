import { useNavigate, Link } from "react-router-dom";
import {
  openCreateTripModal,
  openUpdateTripModal,
  setSelectedTripId,
} from "../store/tripModalSlice";
import { useDispatch, useSelector } from "react-redux";
import UpdateTripModal from "./UpdateTripModal";
import CreateTripModal from "./CreateTripModal";
import {
  useGetTripsQuery,
  useGetTokenQuery,
  useDeleteTripMutation,
  useUpdateTripMutation,
} from "../store/ApiSlice";

export default function Trips() {
  const { data, isLoading } = useGetTripsQuery();
  const { data: tokenData, isLoading: tokenLoading } = useGetTokenQuery();
  const [deleteTrip, { deleteError }] = useDeleteTripMutation();
  const [updateTrip, { updateError }] = useUpdateTripMutation();

  if (tokenData) {
    console.log(tokenData);
  }
  console.log("this is tripsData: ****" + JSON.stringify(data));
  console.log(`this is tokenData: **** ${tokenData}`);
  const dispatch = useDispatch();
  // const { data: trip, tripsError , isLoading: tripsLoading } = useGetTripQuery(id)

  const isCreateModalOpen = useSelector(
    (state) => state.tripModal.isModalOpen.createModal
  );
  const isUpdateModalOpen = useSelector(
    (state) => state.tripModal.isModalOpen.updateModal
  );

  const handleCreateOpenModal = () => {
    dispatch(openCreateTripModal());
  };
  const handleUpdateOpenModal = (tripId) => {
    dispatch(openUpdateTripModal());
    dispatch(setSelectedTripId(tripId));
  };

  if (tokenLoading && isLoading) {
    return (
      <>
        <progress className="progress is-primary" max="100"></progress>
      </>
    );
  }

  const handleDeleteTrip = (tripId) => {
    deleteTrip(tripId);
  };

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
            <th></th>
            <th><button className="btn btn-primary" onClick={handleCreateOpenModal}>
              Create a Trip
            </button>
            {isCreateModalOpen && <CreateTripModal />}</th>
          </tr>
        </thead>
        <tbody>
          {tokenData ? (
            <>
              {data?.map((trip) => (
                <tr key={trip.id} className="table-row">
                  <td>
                    <Link to={`/trips/${trip.id}/events`}>{trip.name}</Link>
                  </td>
                  <td>{trip.city}</td>
                  <td>{trip.state}</td>
                  <td>{trip.start_date}</td>
                  <td>{trip.end_date}</td>
                  <td>
                    <i
                      type="button"
                      onClick={() => handleUpdateOpenModal(trip.id)}
                      className="fa-solid fa-pen-to-square"
                    />
                    {isUpdateModalOpen && <UpdateTripModal />}
                  </td>
                  <td>
                    <i
                      type="button"
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
