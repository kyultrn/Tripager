import React from "react";
import { connect } from "react-redux";
import { closeModal } from "./modalSlice";
import Modal from "./Modal";

const TripModalContainer = ({ isOpen, closeModal }) => {
  return <Modal isOpen={isOpen} closeModal={closeModal} />;
};

const mapStateToProps = (state) => ({
  isOpen: state.modal.isOpen,
});

const mapDispatchToProps = {
  closeModal,
};



export default connect(mapStateToProps, mapDispatchToProps)(TripModalContainer);
