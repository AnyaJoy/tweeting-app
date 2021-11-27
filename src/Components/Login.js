import React from "react";
import { useContext, useState, useEffect } from "react";
import AppContext from "../Context/AppContext";
import Loader from "./Loader";
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  auth,
  signIn,
  signInWithGoogle,
  provider,
} from "./Firebase";


export default function Login() {
  const appContext = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  // checking if there's a user
  const history = useHistory();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    console.log("running!")
    if (loading) {
      return;
    }
    //if yes redirecting to home page and loading current user data
    if (user) {
      history.replace("/")
      appContext.setCurrentUser(user)
    }
     //if not redirecting to login
    if (!user) {
      // history.replace("/login")
      appContext.setCurrentUser(false)
    }
  }, [user, loading])


  const handleLogIn = () => {
    signIn(auth, email, password);
    history.replace("/");
  }

  const handleSignInWithGoogle = () => {
    signInWithGoogle(auth, provider);
  }

  return (
    <div className="login-wrapper">
      <span className="header-login">Login</span>
      <span className="signup-wrapper">
        <span className="header-signup">First time here? - </span>
        <span>
          <Link to="/signup" className="header-signup-link">
            Sign Up
          </Link>
        </span>
      </span>

      <div className="user-name-description">E-mail</div>
      <input
        className="user-name-input"
        placeholder="best-alex-ever@mail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <div className="user-name-description">Password</div>
      <input
        type="password"
        className="user-name-input"
        placeholder="********"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>

      {appContext.isLoading ? (
        <Loader />
      ) : (
        <div className="login-buttons">
          <button
            onClick={handleLogIn}
            disabled={false}
            className={`login-button-${true}`}
          >
            Log in
          </button>
          <button 
          onClick={handleSignInWithGoogle} 
          className={`login-button-google`}>
            Login with Google
          </button>
         
        </div>
      )}
    </div>
  );
}
