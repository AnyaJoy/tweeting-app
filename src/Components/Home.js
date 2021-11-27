import Form from "./Form";
import TweetList from "./TweetList";
import UserTweetList from "./UserTweetList"
// import { useContext } from "react";
// import AppContext from "../Context/AppContext";

function Home() {
  // const appContext = useContext(AppContext);

  return (
    <>
      <div className="App">
        <Form />
        <div className="tweets-wrapper">
          <TweetList />
          <UserTweetList />
        </div>
      </div>
    </>
  );
}

export default Home;
