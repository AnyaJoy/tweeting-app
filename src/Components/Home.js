import Form from "./Form";
import TweetList from "./TweetList";

function Home() {


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
