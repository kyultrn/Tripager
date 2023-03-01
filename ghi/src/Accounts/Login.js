// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useUserLoginMutation, useGetTokenQuery } from "../store/tripsApi";
// import { updateFormData } from "../store/accountsSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { loginModal, showModal, signupModal } from "../store/accountsSlice";

// export default function Login() {
//   const dispatch = useDispatch();

//   const isLoggedIn = useSelector((state) => state.accounts.isLoggedIn);

//   const handleLoginClick = () => {
//     dispatch(showModal(loginModal));
//   };

//   const handleSignupClick = () => {
//     dispatch(showModal(signupModal));
//   };

//   const handleLogoutClick = () => {
//     dispatch(logout());
//   };

//   return (
//     <div className="row">
//       <div className="p-3">
//         <h1>Login</h1>
//         <br />
//         <form onSubmit={handleSubmit}>
//           <div className="form-floating mb-3">
//             <input
//               onChange={handleInputChange}
//               value={email}
//               placeholder="Enter your email"
//               required
//               type="text"
//               name="email"
//               id="login_email"
//               className="form-control"
//             />
//             <label htmlFor="email">Email</label>
//           </div>
//           <div className="form-floating mb-3">
//             <input
//               onChange={handleInputChange}
//               value={password}
//               placeholder="Enter your password"
//               required
//               type="password"
//               name="password"
//               id="login_password"
//               className="form-control"
//             />
//             <label htmlFor="password">Password</label>
//           </div>
//           <button type="submit" className="btn btn-green">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
