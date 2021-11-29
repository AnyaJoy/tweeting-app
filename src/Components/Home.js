import Form from "./Form";
import TweetList from "./TweetList";
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
        </div>
      </div>
    </>
  );
}

export default Home;
