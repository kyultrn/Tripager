// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { openSignUpModal, closeSignUpModal, selectSignUpFormData, updateSignUpFormData, resetSignUpFormData } from "../store/AccountsSlice"
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button, Modal, Form } from "react-bootstrap";
// import { useUserSignupMutation } from "../store/ApiSlice";
// import { useNavigate } from "react-router-dom";

// export default function SignUpModal() {
//   const isSignUpModalOpen = useSelector((state) => state.signUpModal.isSignUpModalOpen)
//   const formData = useSelector(selectSignUpFormData)
//   const dispatch = useDispatch()
//   const [signup] = useUserSignupMutation()
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     dispatch(updateSignUpFormData({ name, value }))
//   }

//   const handleCloseModal = () => {
//     dispatch(closeSignUpModal())
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     dispatch(resetSignUpFormData())
//     dispatch(closeSignUpModal())
//     signup(formData)
//     navigate('/')
//   }

//   return (
//      <div className={`modal ${isSignUpModalOpen ? "is-active" : ""}`}>
//       <Modal show={isSignUpModalOpen} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Sign Up</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="text"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//             <Modal.Footer>
//               <Button type="submit">Create</Button>
//             </Modal.Footer>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   )


// }
