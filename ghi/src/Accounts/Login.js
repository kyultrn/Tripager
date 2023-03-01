import { useToken } from "./Authenticator";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserLoginMutation, useGetTokenQuery } from "../store/ApiSlice";
import { updateLoginFormData, resetLoginFormData, openSignUpModal } from "../store/AccountsSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "../store/AccountsSlice";
import SignUpModal from "./SignupModal";

export default function Login() {
  // const { login } = useToken();
  const { data: token, isLoading } = useGetTokenQuery();
  const navigate = useNavigate();
  const email = useSelector((state) => state.accountForm.loginForm.email);
  const password = useSelector((state) => state.accountForm.loginForm.password);
  const isSignUpModalOpen = useSelector((state) => state.signUpModal.isSignUpModalOpen)
  const [login, { data }] = useUserLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ login });
    login({ email, password });
    dispatch(resetLoginFormData());
  };

  useEffect(() => {
    if (data) {
      navigate('/')
    }
  }, [data, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateLoginFormData({ name, value }));
  };

  const handleSignUpOpenModal = () => {
    dispatch(openSignUpModal())
  }

  return (
    <div className="row">
      <div className="p-3">
        <h1>Login</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              onChange={handleInputChange}
              value={email}
              placeholder="Enter your email"
              required
              type="text"
              name="email"
              id="login_email"
              className="form-control"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleInputChange}
              value={password}
              placeholder="Enter your password"
              required
              type="password"
              name="password"
              id="login_password"
              className="form-control"
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="btn btn-green">
            Login
          </button>
        </form>
        <button className="btn btn-primary" onClick={handleSignUpOpenModal}>
          Sign Up!
        </button>
        {isSignUpModalOpen && <SignUpModal />}
      </div>
    </div>
  );
}
