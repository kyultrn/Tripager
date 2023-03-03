import { useToken } from "./Authenticator";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useUserLoginMutation, useGetTokenQuery } from "../store/ApiSlice";
import {
  updateLoginFormData,
  resetLoginFormData,
  openSignUpModal,
} from "../store/AccountsSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "../store/AccountsSlice";
import SignUpModal from "./SignupModal";
import {
  selectSignUpFormData,
  updateSignUpFormData,
  resetSignUpFormData,
  closeSignUpModal,
} from "../store/AccountsSlice";
import { useUserSignupMutation } from "../store/ApiSlice";

export default function Login() {
  // const { login } = useToken();
  const { data: token, isLoading } = useGetTokenQuery();
  const navigate = useNavigate();
  const email = useSelector((state) => state.accountForm.loginForm.email);
  const password = useSelector((state) => state.accountForm.loginForm.password);
  const isSignUpModalOpen = useSelector(
    (state) => state.signUpModal.isSignUpModalOpen
  );
  const [login, { data }] = useUserLoginMutation();
  const dispatch = useDispatch();
  const formData = useSelector(selectSignUpFormData);
  const [signup] = useUserSignupMutation();

  const [fadeIn, setFadeIn] = useState("");

  const handleSubmit = (e) => {
    if (!isSignUpModalOpen) {
      e.preventDefault();
      // console.log({ login });
      login({ email, password });
      dispatch(resetLoginFormData());
    } else {
      // dispatch(closeSignUpModal());
      window.location.reload();
    }
  };

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    dispatch(updateSignUpFormData({ name, value }));
  };

  const handleSubmit2 = (e) => {
    if (formData.name && formData.password && formData.email) {
      e.preventDefault();
      // dispatch(resetSignUpFormData());
      dispatch(resetSignUpFormData());
      dispatch(closeSignUpModal());

      signup(formData);

      navigate("/");
      console.log("this is the account data:", formData);
    }
  };

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateLoginFormData({ name, value }));
  };

  const handleSignUpOpenModal = () => {
    if (isSignUpModalOpen) {
      handleSubmit2();
    } else {
      setFadeIn("fadeIn");

      dispatch(openSignUpModal());
    }
  };

  return (
    <React.Fragment>
      {!isSignUpModalOpen ? (
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="user-box">
              <input
                onChange={handleInputChange}
                value={email}
                placeholder="Enter your email"
                required
                type="text"
                name="email"
                id="login_email"
                className="form-control"
              ></input>
            </div>
            <div className="user-box">
              <input
                onChange={handleInputChange}
                value={password}
                placeholder="Enter your password"
                required
                type="password"
                name="password"
                id="login_password"
                className="form-control"
              ></input>
            </div>
            <a href="#" onClick={handleSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Log in
            </a>
            <a
              className="signUpButton"
              href="#"
              onClick={handleSignUpOpenModal}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Sign Up!
            </a>
          </form>

          {/* {isSignUpModalOpen && <SignUpModal />} */}
        </div>
      ) : (
        <div className={`signup-box`}>
          <h2>Sign Up!</h2>
          <form>
            <div className="user-box">
              <input
                onChange={handleInputChange2}
                value={formData.name}
                placeholder="Enter your name"
                required
                type="text"
                name="name"
                className="form-control"
              ></input>

              <input
                onChange={handleInputChange2}
                placeholder="Enter your email"
                required
                type="email"
                name="email"
                value={formData.email}
                id="login_email"
                className="form-control"
              ></input>
            </div>
            <div className="user-box">
              <input
                onChange={handleInputChange2}
                value={formData.password}
                placeholder="Enter your password"
                required
                type="text"
                name="password"
                id="login_password"
                className="form-control"
              ></input>
            </div>
            <a href="#" onClick={handleSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Log in
            </a>
            <a className="signUpButton" href="#" onClick={handleSubmit2}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Sign Up!
            </a>
          </form>
        </div>
      )}
    </React.Fragment>
  );
}
