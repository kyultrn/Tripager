import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUserSignupMutation } from "../store/ApiSlice";
import {
  updateSignUpFormData,
  closeSignUpModal,
  resetSignUpFormData,
} from "../store/AccountsSlice";
import { useDispatch, useSelector } from "react-redux";
import mainhd from "./videos/mainhd.mp4";

const SignUp = () => {
  const [signUp, { isSuccess: signUpSuccess, error: signUpError }] =
    useUserSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.accountForm.signUpForm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateSignUpFormData({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (formData.name && formData.password && formData.email) {
    dispatch(resetSignUpFormData());
    dispatch(closeSignUpModal());
    signUp(formData);
    // }
  };

  useEffect(() => {
    if (signUpSuccess) {
      Swal.fire({
        icon: "success",
        title: "Account created successfully!",
        text: "You can now log in with your new account.",
      }).then(() => {
        dispatch(resetSignUpFormData());
        navigate("/");
      });
    }
  }, [signUpSuccess, dispatch, navigate]);

  useEffect(() => {
    if (signUpError) {
      Swal.fire({
        icon: "error",
        title: "Welp that's unfortunate",
        text:
          "An error occurred while creating your account. An account with that email " +
          "exists already or you did not enter both an email and a password.",
      }).then(() => {
        window.location.reload();
      });
    }
  }, [signUpError]);

  return (
    <React.Fragment>
      <div className="login-box">
        <h1>Create Account</h1>
        <form>
          <div className="user-box">
            <input
              onChange={handleInputChange}
              value={formData.name}
              placeholder={"Enter your name"}
              required
              type={"text"}
              name={"name"}
            />
            <input
              onChange={handleInputChange}
              value={formData.email}
              placeholder={"Enter your email"}
              required
              type={"email"}
              name={"email"}
            />
            <input
              onChange={handleInputChange}
              value={formData.password}
              placeholder="Enter your password"
              required
              type="password"
              name="password"
            />
          </div>
          <button
            className="btn loginButton"
            onClick={handleSubmit}
            style={{ marginLeft: "90px" }}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {"Sign Up"}
          </button>
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
};

export default SignUp;
