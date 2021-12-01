import React from "react";
import { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import moment from "moment";
import AppContext from "../Context/AppContext";
import { auth, sendTweetDatabase, db, ref, onValue, loadLikedTweets } from "./Firebase";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

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
      // loadLikedTweets(user.uid, appContext.setLikedTweets)
      appContext.setCurrentUser(user);
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

    // emptying the input field and storage
    appContext.setInput("");

    //sending to the server
    setTimeout(() => {
      if (appContext.input !== "") {
        sendTweetDatabase(
          appContext.input,
          appContext.currentUser.displayName,
          dateFormatted
        );
        appContext.setIsLoading(false);
      }
    }, [500]);
  }

  // recieving tweets from db
  useEffect(() => {
    onValue(ref(db, "tweets"), (snapshot) => {
      var tweetsArray = [];

      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        tweetsArray.push(data);
      });
      appContext.setTweetStorage(tweetsArray.reverse());
      //HERE
      loadLikedTweets(appContext.currentUser.uid, appContext.setLikedTweets)
    });
  }, []);

  // //recieving likes from db
  // const loadLikedTweets = (userId) => {
  //   onValue(
  //     ref(db, "users/" + userId + "/likedTweets"),
  //     (snapshot) => {
  //       var likedTweetsArray = [];

  //       snapshot.forEach((childSnapshot) => {
  //         const data = childSnapshot.val();
  //         likedTweetsArray.push(data);
  //       });
  //       console.log(likedTweetsArray);
  //       appContext.setLikedTweets(likedTweetsArray)
  //     }
  //   );
  // }

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
          <Loader classname={"loader1"} />
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
