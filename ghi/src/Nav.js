import { NavLink } from "react-router-dom";
import { useGetTokenQuery, useLogOutMutation } from "./store/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showModal, SIGN_UP_MODAL, LOG_IN_MODAL } from "./store/accountsSlice";
import LoginModal from "./accounts/LoginModal";
import SignupModal from "./accounts/SignupModal";
import { useEffect } from "react";

function LoginButtons(props) {
  const dispatch = useDispatch();
  const classNames = `buttons ${props.show ? "" : "is-hidden"}`;

  return (
    <div className={classNames}>
      <button
        onClick={() => dispatch(showModal(SIGN_UP_MODAL))}
        className="button is-primary"
      >
        <strong>Sign up</strong>
      </button>
      <button
        onClick={() => dispatch(showModal(LOG_IN_MODAL))}
        className="button is-light"
      >
        Log in
      </button>
    </div>
  );
}

function LogoutButton() {
  const navigate = useNavigate();
  const [logOut, { data }] = useLogOutMutation();

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <div className="buttons">
      <button onClick={logOut} className="button is-light">
        Log out
      </button>
    </div>
  );
}



function Nav() {
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const {
    account: { roles = [] },
  } = token || { account: {} };

  return (
    <>
      <nav
        className="navbar is-link is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/"></NavLink>

          <button
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <NavLink className="tripager">Tripager</NavLink>
            <NavLink className="trips" to="trips">
              Trips
            </NavLink>
            <NavLink className="navbar-brand" to="/thingstodo">
              <span className="things-to-do">Things to do</span>
            </NavLink>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {tokenLoading ? (
                <LoginButtons show={false} />
              ) : token ? (
                <LogoutButton />
              ) : (
                <LoginButtons show={true} />
              )}
            </div>
          </div>
        </div>
      </nav>
      <LoginModal />
      <SignupModal />
    </>
  );
}

export default Nav;
