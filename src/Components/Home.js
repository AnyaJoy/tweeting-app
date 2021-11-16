import "../App.css";
import Form from "./Form";
import TweetList from "./TweetList";
import { useContext, useState, useEffect } from "react";
import AppContext from "../Context/AppContext";

function Home() {
  const appContext = useContext(AppContext);

  return (
    <>
      <div className="App">
        <Form />
        <div className="tweets-wrapper">
          <TweetList />
        </div>
      </div>
    </>
  );
}

export default Home;
