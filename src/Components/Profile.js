import { React, useContext, useState, useEffect } from "react";
import AppContext from "../Context/AppContext";

import { auth, profileUpdate } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import ProfilePicture from "./Semi-components/ProfilePicture";

import img from "../tweet.png";
import UserProfileInfo from "./Semi-components/UserProfileInfo";


var dateCreated = "";

export default function Profile() {
  const appContext = useContext(AppContext);

  // checking if there's a user
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      return;
    }
    //if yes redirecting to home page and loading current user data
    if (user) {
      appContext.setCurrentUser(user);
      const fullDateCreated = user.metadata.creationTime.slice(0, 16);
      dateCreated = fullDateCreated.slice(4);
      if (user.photoURL) {
        setURL(user.photoURL);
      }
    }

    //if not redirecting to login
    if (!user) {
      history.replace("/login");
      appContext.setCurrentUser(false);
    }
  }, [user, loading]);

  const [URL, setURL] = useState("");

  return (
    <div className="profile-wrapper">
      <div className="header-profile">Profile</div>
      <div className="profile-and-picture-wrapper">
        <UserProfileInfo dateCreated={dateCreated}/>
        <ProfilePicture img={img} URL={URL} setURL={setURL}/>
      </div>
    </div>
  );
}
