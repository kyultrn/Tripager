import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation } from "../store/authApi";
import { preventDefault } from "../store/utils";
import { showModal, updateField, LOG_IN_MODAL, SIGN_UP_MODAL } from "../store/accountsSlice";
import Notification from "../store/Notification";

function SignupModal() {
  const dispatch = useDispatch();
  const { show, username, password, name } = useSelector(
    (state) => state.account
  );
  const modalClass = `modal ${show === SIGN_UP_MODAL ? "is-active" : ""}`;
  const [signUp, { error, isLoading: signUpLoading }] = useSignUpMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );

  return (
    <div className={modalClass} key="signup-modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box content">
          <h3>Sign Up</h3>
          {error ? (
            <Notification type="danger">{error.data.detail}</Notification>
          ) : null}
          <form
            method="POST"
            onSubmit={preventDefault(signUp, () => ({
              email: username,
              password,
              name,
            }))}
          >
            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>
              <div className="control">
                <input
                  required
                  onChange={field}
                  value={username}
                  name="username"
                  className="input"
                  type="email"
                  placeholder="Johnny.Appleseed@Tripager.com"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  required
                  onChange={field}
                  value={password}
                  name="password"
                  className="input"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">First and last names</label>
              <div className="control">
                <input
                  required
                  onChange={field}
                  value={name}
                  name="name"
                  className="input"
                  type="text"
                  placeholder="Your Name"
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button disabled={signUpLoading} className="button is-primary">
                  Submit
                </button>
              </div>
              <div className="control">
                <button
                  type="button"
                  onClick={() => dispatch(showModal(null))}
                  className="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
