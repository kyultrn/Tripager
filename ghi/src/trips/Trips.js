import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  
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

  if (tokenData) {
    console.log(tokenData);
  }
  console.log("this is tripsData: ****" + JSON.stringify(data));
  console.log(`this is tokenData: **** ${tokenData}`);

  if (tokenLoading && isLoading) {
    return (
      <>
        <progress className="progress is-primary" max="100"></progress>
      </>
    );
  }

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
