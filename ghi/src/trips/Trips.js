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
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
// import "../CSS/Style.css";



export default function Trips() {
  const { data, isLoading } = useGetTripsQuery();
  const { data: tokenData, isLoading: tokenLoading } = useGetTokenQuery();
  const [deleteTrip, { deleteError }] = useDeleteTripMutation();
  const [updateTrip, { updateError }] = useUpdateTripMutation();

  const dispatch = useDispatch();
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

  const handleDeleteTrip = async (tripId) => {
    try {
      const response = await deleteTrip(tripId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  };


  console.log("this is tripsData: ****" + JSON.stringify(data));

  if (tokenLoading && isLoading) {
    return (
      <>
        <progress className="progress is-primary" max="100"></progress>
      </>
    );
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
                  <td>{formatDate(trip.start_date)}</td>
                  <td>{formatDate(trip.end_date)}</td>
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
                      variant="btn-sm m-1"
                      className="btn-red btn-sm text-right"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#bb7e74",
                          cancelButtonColor: "#808080",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDeleteTrip(trip.id);
                            Swal.fire(
                              "Deleted!",
                              "Your room has been deleted.",
                              "success"
                            );
                          }
                        });
                      }}
                    >
                      Delete
                    </i>
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
