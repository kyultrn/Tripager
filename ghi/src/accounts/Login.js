import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  useUserLoginMutation,
  useGetTokenQuery,
  useUserSignupMutation,
} from "../store/ApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLoginFormData,
  resetLoginFormData,
  openSignUpModal,
  selectSignUpFormData,
  updateSignUpFormData,
  resetSignUpFormData,
  closeSignUpModal,
} from "../store/AccountsSlice";
import mainhd from "./videos/mainhd.mp4";

export default function Login() {
  const { data: token, isLoading } = useGetTokenQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector(selectSignUpFormData);
  const [login, { data }] = useUserLoginMutation();
  const [signup] = useUserSignupMutation();
  const [fadeIn, setFadeIn] = useState("");
  const email = useSelector((state) => state.accountForm.loginForm.email);
  const password = useSelector((state) => state.accountForm.loginForm.password);
  const isSignUpModalOpen = useSelector(
    (state) => state.signUpModal.isSignUpModalOpen
  );

  const handleInputChange = (e, isSignUpForm, isEmail = false) => {
    const { name, value } = e.target;
    dispatch(updateSignUpFormData({ name, value }));
    dispatch(updateLoginFormData({ name, value }));
  };

  const handleSubmit = (e, isSignUpForm, clickedLogin = false) => {
    if (clickedLogin && isSignUpForm) {
      window.location.reload();
    }
    e.preventDefault();
    if (isSignUpForm) {
      if (formData.name && formData.password && formData.email) {
        dispatch(resetSignUpFormData());
        dispatch(closeSignUpModal());
        signup(formData);
        navigate("/");
      }
    } else {
      login({ email, password });
      dispatch(resetLoginFormData());
    }
  };

  const handleSignUpOpenModal = () => {
    if (isSignUpModalOpen) {
      handleSubmit(null, true);
    } else {
      setFadeIn("fadeIn");
      dispatch(openSignUpModal());
    }
  };

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <React.Fragment>
      <div className={isSignUpModalOpen ? "login-box" : "login-box"}>
        <h2>{isSignUpModalOpen ? "Sign Up!" : "Login"}</h2>
        <form>
          <div className="user-box">
            {isSignUpModalOpen && (
              <input
                onChange={(e) => handleInputChange(e, isSignUpModalOpen)}
                value={formData.name}
                placeholder={"Enter your name"}
                required
                type={"text"}
                name={"name"}
                className="form-control"
              ></input>
            )}

            <input
              onChange={(e) => handleInputChange(e, isSignUpModalOpen)}
              value={email}
              placeholder={"Enter your email"}
              required
              type={"email"}
              name={"email"}
              className="form-control"
            ></input>

            <input
              onChange={(e) => handleInputChange(e)}
              value={password}
              placeholder="Enter your password"
              required
              type="password"
              name="password"
              id="login_password"
              className="form-control"
            ></input>
          </div>
          <a
            className="loginButton"
            href="#"
            onClick={(e) => handleSubmit(e, isSignUpModalOpen, true)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {"Log in"}
          </a>

          <a
            className="signUpButton"
            href="#"
            onClick={
              !isSignUpModalOpen
                ? handleSignUpOpenModal
                : (e) => handleSubmit(e, isSignUpModalOpen)
            }
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {"Sign Up!"}
          </a>
        </form>
      </div>
      <div className="cloudVideo">
        <video
          style={{
            position: "fixed",
            zIndex: -1,
            width: "100%",
            height: "100%",
          }}
          src={mainhd}
          autoPlay
          loop
          muted
        />
      </div>
    </React.Fragment>
  );
}
