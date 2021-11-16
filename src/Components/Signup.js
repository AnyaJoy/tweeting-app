import React from "react";
import { useContext, useState, useEffect } from "react";
import AppContext from "../Context/AppContext";
import Loader from "./Loader";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./Firebase";

export default function Signup() {
  const appContext = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  // checking if there's a user
  const history = useHistory();
  useEffect(() => {
    console.log("running!");
    if (loading) {
      return;
    }
    //if yes redirecting to home page and loading current user data
    if (user) {
      history.replace("/");
      appContext.setCurrentUser(user);
    }
    if (!user) {
      appContext.setCurrentUser(false);
    }
  }, [user, loading]);

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };  

  return (
    <div className="login-wrapper">
      <span className="header-login">Sign Up</span>
      <span className="signup-wrapper">
        <span className="header-signup">Already signed-up? - </span>
        <span>
          <Link to="/login" className="header-signup-link">
            Login
          </Link>
        </span>
      </span>

      <div className="user-name-description">Name</div>
      <input
        // onKeyDown={submitOnEnter}
        className="user-name-input"
        placeholder="Alex"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <div className="user-name-description">E-mail</div>
      <input
        // onKeyDown={submitOnEnter}
        className="user-name-input"
        placeholder="best-alex-ever@mail.com"
        value={appContext.email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <div className="user-name-description">Password</div>
      <input
        // onKeyDown={submitOnEnter}
        type="password"
        className="user-name-input"
        placeholder="********"
        value={appContext.password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      {/* <div className="user-name-description">Confirm password</div>
      <input
        // onKeyDown={submitOnEnter}
        type="password"
        className="user-name-input"
        placeholder="********"
        // onChange={handleChangeUserName}
        // value={appContext.userNameInput}
      ></input> */}

      {appContext.isLoading ? (
        <Loader />
      ) : (
        <div className="signup-buttons">
          <button
            onClick={register}
            // disabled={!appContext.isInput}
            disabled={false}
            className={`signup-button-${true}`}
          >
            Sign Up
          </button>
          <button className="signup-button-google" onClick={signInWithGoogle}>
            Sign up with Google
          </button>
        </div>
      )}

      {/* <div className={`notification-submit-${appContext.isSubmit}`}>Saved!</div> */}
    </div>
  );
}
