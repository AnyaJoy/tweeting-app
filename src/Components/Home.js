import Form from "./Form";
import TweetList from "./TweetList";
import MyTweetList from "./MyTweetList";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import { useState } from "react";
// import { useContext } from "react";
// import AppContext from "../Context/AppContext";

function Home() {
  // const appContext = useContext(AppContext);
  //user's tweets vs all tweets
  const [myTweetsSelected, setMyTweetsSelected] = useState(false);
  const [allTweetsSelected, setAllTweetsSelected] = useState(true);

  //drowdow menu (selects if to show all tweets or user tweets)
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);

  const handleSelectAllTweets = () => {
    setMyTweetsSelected(false);
    setAllTweetsSelected(true);
    setIsOpen(false);
  };

  const handleSelectMyTweets = () => {
    setMyTweetsSelected(true);
    setAllTweetsSelected(false);
    setIsOpen(false);
  };

  return (
    <>
      <div className="App">
        <Form />
        <div className="header-menu-wrapper">
        <span className="feed">Feed</span>
          <span className="dropdown-header">
            <div className="toggler">
              <span className="dropdown-option" className={`selected-${allTweetsSelected}`} onClick={handleSelectAllTweets}>
                All Tweets
              </span>
              <span className="div-line">|</span>
              <span className="dropdown-option" className={`selected-${myTweetsSelected}`} onClick={handleSelectMyTweets}>
                 My Tweets
              </span>
            </div>
          </span>
        </div>

        <div className="tweets-wrapper">
          {allTweetsSelected && (<TweetList />)}
          {myTweetsSelected && (<MyTweetList />)}
        </div>
      </div>
    </>
  );
}

export default Home;
