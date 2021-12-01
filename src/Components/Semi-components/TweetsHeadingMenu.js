import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import Dropdown from "../Semi-components/Dropdown";
import { React, useContext } from "react";
import AppContext from "../../Context/AppContext";

export default function TweetsHeadingMenu() {
  const appContext = useContext(AppContext);

  //drowdow menu (selects if to show all tweets or user tweets)
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);

  const handleSelectAllTweets = () => {
    appContext.setMyTweetsSelected(false);
    appContext.setAllTweetsSelected(true);
    appContext.setFavouritesSelected(false);
    setIsOpen(false);
  };

  const handleSelectMyTweets = () => {
    appContext.setMyTweetsSelected(true);
    appContext.setAllTweetsSelected(false);
    appContext.setFavouritesSelected(false);
    setIsOpen(false);
  };

  const handleFavouritesSelected = () => {
    appContext.setMyTweetsSelected(false);
    appContext.setAllTweetsSelected(false);
    appContext.setFavouritesSelected(true);
    setIsOpen(false);
  };

  return (
    <div className="header-menu-wrapper">
      <Dropdown
        handleSelectAllTweets={handleSelectAllTweets}
        handleSelectMyTweets={handleSelectMyTweets}
        handleFavouritesSelected={handleFavouritesSelected}
      />
    </div>
  );
}
