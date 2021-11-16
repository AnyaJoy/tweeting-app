import React from "react";
import { useContext, useState, useEffect } from "react";
import Loader from "./Loader";
import moment from "moment";
import AppContext from "../Context/AppContext";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";

// import { initializeApp } from "@firebase/app";
// import { getAnalytics } from "@firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBMjyU3LTizzmKymU0u5x_IDGBKVR2PDgw",
  authDomain: "react-project-2-anyajoy.firebaseapp.com",
  projectId: "react-project-2-anyajoy",
  storageBucket: "react-project-2-anyajoy.appspot.com",
  messagingSenderId: "571997512755",
  appId: "1:571997512755:web:48cbc30dbc1a0874f62f46",
  measurementId: "G-KZWMH65NEN",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default function Form(props) {
  const appContext = useContext(AppContext);

  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      history.replace("/");
      appContext.setCurrentUser(true);

      firebase
        .firestore()
        .collection("users")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(data);
          let thisUser = data.filter((item) => {
            return item.id == user.uid;
          });
          console.log(thisUser);
          appContext.setCurrentUser(thisUser[0]);
        });
    }
    if (!user) {
      history.replace("/login");
      appContext.setCurrentUser(false);
    }
  }, [user, loading]);

  //enabling the tweet button
  useEffect(() => {
    if (appContext.input) {
      appContext.setIsInput(true);
    } else {
      appContext.setIsInput(false);
    }
  }, [appContext.input]);

  //checking the input length
  useEffect(() => {
    if (appContext.charNumber > 140) {
      appContext.setCharNumberChecker(true);
      appContext.setIsInput(false);
    } else {
      appContext.setCharNumberChecker(false);
    }
  }, [appContext.charNumber]);

  //handling input submit
  function handleInput(e) {
    appContext.setInput(e.target.value);
    appContext.setCharNumber(e.target.value.length);
  }

  //submitting on enter
  function submitOnEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleTweet();
    }
  }

  //sending the tweet to the server
  function handleTweet(e) {
    appContext.setIsLoading(true);

    //capturing the date
    let dateNow = new Date();
    let dateFormatted = moment(dateNow).format("ddd DD MMM, HH:mm");

    //capturing timestamp
    const timestamp = firebase.firestore.FieldValue.serverTimestamp;

    // emptying the input field and storage
    appContext.setInput("");

    //sending to the server
    setTimeout(() => {
      if (appContext.input !== "") {
        firebase
          .firestore()
          .collection("tweets")
          .add({
            content: appContext.input,
            userName: appContext.currentUser.name,
            date: dateFormatted,
            createdAt: timestamp(),
          })
          .then((ref) => {
            console.log("Added doc with ID: ", ref.id);
          });
        appContext.setIsLoading(false);
      }
    }, [500]);
  }

  // recieving the tweets from server on pageload and on change
  useEffect(() => {
    firebase
      .firestore()
      .collection("tweets")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        let descendingArray = data.reverse();

        appContext.setTweetStorage(descendingArray);
      });
  }, []);

  return (
    <>
      <div className="input-button-wrapper">
        <textarea
          onChange={handleInput}
          onKeyDown={submitOnEnter}
          className="input"
          placeholder="What you have in mind..."
          value={appContext.input}
        />

        {appContext.isLoading ? (
          <Loader />
        ) : (
          <button
            onClick={handleTweet}
            disabled={!appContext.isInput}
            className={`input-${appContext.isInput}`}
          >
            Tweet
          </button>
        )}

        <div className={`alert-${!appContext.charNumberChecker}`}>
          The tweet can't contain more then 140 chars.
        </div>
      </div>
    </>
  );
}
