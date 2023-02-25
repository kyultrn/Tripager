import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeTripModal, openTripModal } from "./TripModalReducer";
import { selectFormData, updateFormData } from "./FormSlice";
import { useCreateTripMutation } from "../store/TripsApi";

function ModalForm() {
  const [createTrip, result] = useCreateTripMutation()

  const isModalOpen = useSelector((state) => state.tripModal.isModalOpen);

  const formData = useSelector(selectFormData);
  // console.log(formData, "********")

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ name, value }));
  };

  const handleCloseModal = () => {
    dispatch(closeTripModal())
    dispatch(
      updateFormData({
        name: "",
        city: "",
        state: "",
        start_date: "",
        end_date: "",
      })
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    createTrip(formData)
    handleCloseModal()

  };



  return (
    <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={handleCloseModal}></div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Start Date:
            <input
              type="text"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
            />
          </label>
          <label>
            End Date:
            <input
              type="text"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={handleCloseModal}
      ></button>
    </div>
  );
}

export default ModalForm;
