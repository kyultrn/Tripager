import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useUserLoginMutation, useGetTokenQuery } from "../store/ApiSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  updateLoginFormData,
  resetLoginFormData,
} from "../store/AccountsSlice";
import mainhd from "./videos/mainhd.mp4";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.accountForm.loginForm.email);
  const password = useSelector((state) => state.accountForm.loginForm.password);
  const [login, { data, error: loginError }] = useUserLoginMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateLoginFormData({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
    dispatch(resetLoginFormData());
  };

  const handleSignUpButton = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  useEffect(() => {
    if (loginError && loginError.status == 422) {
      Swal.fire({
        icon: "error",
        title: "There's an empty field my friend",
        text: "Please enter both a password and an email",
      }).then(() => {
        window.location.reload();
      });
    } else if (loginError) {
      Swal.fire({
        icon: "error",
        title: "Welp that's unfortunate",
        text: "Incorrect password or email, or Account does not exist",
      }).then(() => {
        window.location.reload();
      });
    }
  }, [loginError]);

  return (
    <React.Fragment>
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input
              onChange={handleInputChange}
              value={email}
              placeholder={"Enter your email"}
              required
              type={"email"}
              name={"email"}
              className="form-control"
            ></input>
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
          <a className="loginButton" href="#" onClick={handleSubmit}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {"Log in"}
          </a>
          <a
            className="loginButton"
            onClick={handleSignUpButton}
            style={{ marginLeft: "70px" }}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {"Sign Up"}
          </a>
          {loginError && (
            <div className="error-message">
              {loginError.status == 401
                ? "Invalid email or password"
                : "Something went wrong. Please try again later."}
            </div>
          )}
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
