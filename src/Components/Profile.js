import React from "react";
import { useContext, useState, useEffect } from "react";
import AppContext from "../Context/AppContext";

import { auth } from "./Firebase";
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
    }

    //if not redirecting to login
    if (!user) {
      history.replace("/login");
      appContext.setCurrentUser(false);
    }
  }, [user, loading]);

  // useEffect(() => {
  //   setURL(appContext.currentUser.photoUrl);
  // }, [appContext.currentUser]);

  // uploading profile pjoto
  const [imageAsFile, setImageAsFile] = useState();
  const storage = getStorage();
  const storageRef = ref(storage, appContext.currentUser.uid);

  const [URL, setURL] = useState();
  const [isUrl, setisUrl] = useState(false);

  // useEffect(() => {
  //   if (imageAsFile) {
  //     console.log("start of upload");

  //     //sending the photo to storage
  //     uploadBytes(storageRef, imageAsFile).then((snapshot) => {
  //       console.log("Uploaded a blob or file!");
  //     });

  //     //getting back a url and updating the user doc in firestore
  //     getDownloadURL(storageRef).then((url) => {
  //       console.log(url);
  //       setURL(url);
  //       setTimeout(() => {
  //         setisUrl(true)
  //       },[1000])

  //       db.collection("users").doc(appContext.currentUser.uid).update({
  //         photoUrl: url,
  //       });

  //       setTimeout(() => {
  //         setisUrl(false)
  //       },[5000])
  //     });
  //   }
  // }, [imageAsFile]);

  useEffect(() => {
    if (imageAsFile) {
      console.log("start of upload");

      //sending the photo to storage
      uploadBytes(storageRef, imageAsFile).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });

      //getting back a url and updating the user doc in firestore
      getDownloadURL(storageRef).then((url) => {
        console.log(url);
        setURL(url);
        setTimeout(() => {
          setisUrl(true)
        },[])

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
            <span className="profile-createdAt">Created at: </span>
            <span className="profile-info-fetched">
              {dateCreated}
            </span>
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
          <div className={`notification-submit-${isUrl}`}>
            Saved! Reload the page for update.
          </div>
        </div>
      </div>
    </div>
  );
}
