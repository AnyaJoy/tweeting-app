import { React, useContext, useState, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { profileUpdateName } from "../Firebase";

export default function UserProfileInfo(props) {
  const appContext = useContext(AppContext);
  const { dateCreated } = props;

  const [newUserName, setNewUserName] = useState(appContext.currentUser.displayName);
  const [newEmail, setNewEmail] = useState(appContext.currentUser.email);
  const [newPassword, setNewPassword] = useState();

  useEffect(() => {
    console.log(newEmail);
  }, [newEmail]);

  const updateProfile = () => {
      if (newUserName != appContext.currentUser.displayName) {
        profileUpdateName(appContext.currentUser.uid, newUserName)
      }
      if (newEmail != appContext.currentUser.email) {
        profileUpdateName(appContext.currentUser.uid, newEmail)
      }
  };

  return (
    <div className="profile-info">
      <div className="profile-textarea-wrapper">
        <span>User name: </span>
        <textarea
          className="profile-textarea"
          defaultValue={appContext.currentUser.displayName}
          onChange={(e) => setNewUserName(e.target.value)}
        ></textarea>
      </div>
      <div className="profile-textarea-wrapper">
        <span>E-mail: </span>
        <textarea
          className="profile-textarea"
          defaultValue={appContext.currentUser.email}
          onChange={(e) => setNewEmail(e.target.value)}
        ></textarea>
      </div>
      <div className="profile-textarea-wrapper">
        <span>Change Password: </span>
        <textarea
          className="profile-textarea"
          defaultValue="*******"
          onChange={(e) => setNewPassword(e.target.value)}
        ></textarea>
      </div>
      <div className="profile-textarea-wrapper">
        <span>Registered at: </span>
        <span className="registration-date">{dateCreated}</span>
      </div>
      <div onClick={updateProfile} className="update-button-info">
        Update info
      </div>
    </div>
  );
}
