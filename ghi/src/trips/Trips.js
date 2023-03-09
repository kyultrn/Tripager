import { Link } from "react-router-dom";
import { useState } from "react";
import UpdateTripModal from "./UpdateTripModal";
import CreateTripModal from "./CreateTripModal";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import clouds from "./videos/clouds2.mp4"
import summer_vacay_2 from "./videos/summer_vacay_2.mp4"

import {
  openCreateTripModal,
  openUpdateTripModal,
  setSelectedTripId,
} from "../store/tripModalSlice";
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
    } catch (error) {
      return("Cannot delete trip")
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
  }

  if (tokenLoading && isLoading) {
    return (
      <>
        <progress className="progress is-primary" max="100"></progress>
      </>
    );
  }

  return (
    <div>
      <div>
        {isCreateModalOpen && <CreateTripModal />}
        <div>
          <div className="trip-container">
            <div className="TripManagerText">Trip Manager</div>
            <div className="col-sm-6 text-right">
              <Button
                className="btn createTripButton"
                variant="outline-dark"
                size="lg"
                onClick={handleCreateOpenModal}
              >
                Create a Trip
              </Button>
            </div>
          </div>
        </div>
        {tokenData ? (
          <div className="oldTRContainer" style={{ marginBottom: "60px" }}>
            {data?.map((trip) => (
              <div className="oldTR" key={trip.id}>
                <span className="oldTD">
                  <span>
                    <Link
                      className="btn"
                      to={`/trips/${trip.id}/events`}
                      onClick={() => dispatch(setSelectedTripId(trip.id))}
                    >
                      {trip.name}
                    </Link>
                  </span>
                  <div className="tripInfo">
                    <div>{`${trip.city}, ${trip.state}  `} </div>
                    <span>{`${formatDate(trip.start_date)} - ${formatDate(
                      trip.end_date
                    )}`}</span>
                    <button
                      type="button"
                      onClick={() => handleUpdateOpenModal(trip.id)}
                      className="btn btn-red btn-sm text-center"
                      style={{ marginLeft: "55%" }}
                    >
                      Edit
                    </button>{" "}
                    <button
                      variant="btn-sm m-1"
                      className="btn btn-red btn-sm text-right tripDeleteButton"
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
                              "Your Trip has been deleted.",
                              "success"
                            );
                          }
                        });
                      }}
                    >
                      Delete
                    </button>
                    {isUpdateModalOpen && <UpdateTripModal />}{" "}
                  </div>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div>No trips</div>
        )}
        {isCreateModalOpen && <CreateTripModal />}
      </div>
      <div className="cloudVideo">
        <video
          style={{
            position: "fixed",
            zIndex: -1,
            width: "100%",
            height: "100%",
          }}
          src={summer_vacay_2}
          autoPlay
          loop
          muted
        />
      </div>
    </div>
  );
}
