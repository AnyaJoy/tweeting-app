import React from "react";
import { useContext, useState, useEffect } from "react";
import AppContext from "../Context/AppContext";

import { auth, profileUpdate } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";

import "firebase/storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import img from "../tweet.png";

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

  // uploading profile pjoto
  const [imageAsFile, setImageAsFile] = useState();
  const storage = getStorage();
  const storageRef = ref(storage, appContext.currentUser.uid);

  const [URL, setURL] = useState();
  const [isUrl, setisUrl] = useState(false);

  // profile image update
  useEffect(() => {
    if (imageAsFile) {
      setisUrl(true);
      //sending the photo to storage, recieving the url and updating user's profile
      uploadBytes(storageRef, imageAsFile).then((snapshot) => {
          getDownloadURL(storageRef).then((url) => {
            console.log(url)
          setURL(url);
          profileUpdate(url, user.uid);
          setTimeout(() => {
            setisUrl(false);
          }, [2000]);
        });

        //updating database profile
        



        // db.collection("users").doc(appContext.currentUser.uid).update({
        //   photoUrl: url,
        // });

        // setTimeout(() => {
        //   setisUrl(false)
        // },[5000])
      });
    }
  }, [imageAsFile]);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  return (
    <div className="profile-wrapper">
      <div className="header-profile">Profile</div>
      <div className="profile-and-picture-wrapper">
        <div className="profile-info">
          <div>
            <span>User name: </span>
            <span className="profile-info-fetched">
              {appContext.currentUser.displayName}
            </span>
          </div>
          <div>
            <span className="profile-email">E-mail: </span>
            <span className="profile-info-fetched">
              {appContext.currentUser.email}
            </span>
          </div>
          <div>
            <span className="profile-createdAt">Registered at: </span>
            <span className="profile-info-fetched">{dateCreated}</span>
          </div>
        </div>
        <div className="photo-wrapper">
          <div className="profile-picture">
            {URL ? <img src={URL} /> : <img src={img} />}
          </div>
          <div className="update-picture-button">
            Update photo
            <input
              type="file"
              className="upload-photo"
              name="photo"
              onChange={handleImageAsFile}
            ></input>
          </div>
          <div className={`notification-submit-${isUrl}`}>Saving...</div>
        </div>
      </div>
    </div>
  );
}
