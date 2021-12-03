import "./App.css";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Search from "./Components/Search";
import { useState, useEffect } from "react";
import AppContext from "./Context/AppContext";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function App() {
  //server storage
  const [serverData, setServerData] = useState([]);
  //location checkers
  const [homeActive, setHomeActive] = useState(true);
  const [profileActive, setProfileActive] = useState(false);
  const [loginActive, setLoginActive] = useState(false);
  // const [signupActive, setSignupActive] = useState(false);
  //input length
  const [charNumber, setCharNumber] = useState();
  const [charNumberChecker, setCharNumberChecker] = useState(false);
  //input checker
  const [isInput, setIsInput] = useState(false);
  const [input, setInput] = useState();
  //loader checker
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  //tweet storage
  const [tweetStorage, setTweetStorage] = useState([]);
  //current page location
  const [location, setLocation] = useState("");
  const [redirect, setRedirect] = useState();
  //user
  const [currentUser, setCurrentUser] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  //search
  const [searchByTweet, setSearchByTweet] = useState(true);
  const [searchByUser, setSearchByUser] = useState(false);

  const [likedTweets, setLikedTweets] = useState([]);

  const [myTweetsSelected, setMyTweetsSelected] = useState(false);
  const [allTweetsSelected, setAllTweetsSelected] = useState(true);
  const [favouritesSelected, setFavouritesSelected] = useState(false);


  return (
    <AppContext.Provider
      value={{
        serverData: serverData,
        setServerData: setServerData,
        isInput: isInput,
        setIsInput: setIsInput,
        input: input,
        setInput: setInput,
        charNumber: charNumber,
        setCharNumber: setCharNumber,
        charNumberChecker: charNumberChecker,
        setCharNumberChecker: setCharNumberChecker,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        homeActive: homeActive,
        setHomeActive: setHomeActive,
        profileActive: profileActive,
        setProfileActive: setProfileActive,
        loginActive: loginActive,
        setLoginActive: setLoginActive,
        isSubmit: isSubmit,
        setIsSubmit: setIsSubmit,
        tweetStorage: tweetStorage,
        setTweetStorage: setTweetStorage,
        location: location,
        setLocation: setLocation,
        redirect: redirect,
        setRedirect: setRedirect,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        searchInput: searchInput,
        setSearchInput: setSearchInput,
        searchByTweet: searchByTweet,
        setSearchByTweet: setSearchByTweet,
        searchByUser: searchByUser,
        setSearchByUser: setSearchByUser,
        likedTweets: likedTweets,
        setLikedTweets: setLikedTweets,
        myTweetsSelected: myTweetsSelected,
        setMyTweetsSelected: setMyTweetsSelected,
        allTweetsSelected: allTweetsSelected,
        setAllTweetsSelected: setAllTweetsSelected,
        favouritesSelected: favouritesSelected,
        setFavouritesSelected: setFavouritesSelected,
      }}
    >
      <div className="content-wrapper">
        <Router>
          {redirect && <Redirect to={redirect} />}
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/search" component={Search} />
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
