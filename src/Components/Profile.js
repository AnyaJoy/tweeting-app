import React from "react";
import { useContext, useState, useEffect } from "react";
import AppContext from "../Context/AppContext";
import Loader_profile from "../Components/Loader_profile";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { auth } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import "firebase/storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import img from '../tweet.png';

const firebaseConfig = {
  apiKey: "AIzaSyBMjyU3LTizzmKymU0u5x_IDGBKVR2PDgw",
  authDomain: "react-project-2-anyajoy.firebaseapp.com",
  projectId: "react-project-2-anyajoy",
  storageBucket: "react-project-2-anyajoy.appspot.com",
  messagingSenderId: "571997512755",
  appId: "1:571997512755:web:48cbc30dbc1a0874f62f46",
  measurementId: "G-KZWMH65NEN",
};

export default function Profile() {
  const appContext = useContext(AppContext);

  const app = firebase.initializeApp(firebaseConfig);
  const auth = app.auth();
  const db = app.firestore();

  // checking if there's a user
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      return;
    }
    //if yes redirecting to home page and loading current user data
    if (user) {
      history.replace("/profile");
      appContext.setCurrentUser(user);

      firebase
        .firestore()
        .collection("users")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          let thisUser = data.filter((item) => {
            return item.id == user.uid;
          });
          appContext.setCurrentUser(thisUser[0]);
        });
    }

    //if not redirecting to login
    if (!user) {
      history.replace("/login");
      appContext.setCurrentUser(false);
    }
  }, [user, loading]);

  useEffect(() => {
    setURL(appContext.currentUser.photoUrl);
  }, [appContext.currentUser]);

  // uploading profile pjoto
  const [imageAsFile, setImageAsFile] = useState();
  const storage = getStorage();
  const storageRef = ref(storage, appContext.currentUser.uid);

  const [URL, setURL] = useState();
  const [isUrl, setisUrl] = useState(false);

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
        },[1000])
        db.collection("users").doc(appContext.currentUser.uid).update({
          photoUrl: url,
        });
        setTimeout(() => {
          setisUrl(false)
        },[5000])
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
              {appContext.currentUser.name}
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
              {appContext.currentUser.dateCreated}
            </span>
          </div>
        </div>
        <div className="photo-wrapper">
          <div className="profile-picture">{URL ? <img src={URL} /> : <img src={img} />}</div>
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
