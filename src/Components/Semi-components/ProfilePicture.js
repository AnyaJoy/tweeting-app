import { React, useContext, useState, useEffect } from "react";
import "firebase/storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { profileUpdate } from "../Firebase";
import AppContext from "../../Context/AppContext";

export default function ProfilePicture(props) {
    const {img, URL, setURL} = props;
    const appContext = useContext(AppContext);
  // uploading profile pjoto
  const [imageAsFile, setImageAsFile] = useState();
  const storage = getStorage();
  const storageRef = ref(storage, appContext.currentUser.uid);

  const [isUrl, setisUrl] = useState(false);

  // profile image update
  useEffect(() => {
    if (imageAsFile) {
      setisUrl(true);
      //sending the photo to storage, recieving the url and updating user's profile
      uploadBytes(storageRef, imageAsFile).then((snapshot) => {
        getDownloadURL(storageRef).then((url) => {
          setURL(url);
          profileUpdate(url, appContext.currentUser.uid);
          setisUrl(false);
        });
      });
    }
  }, [imageAsFile]);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  return (
    <div className="photo-wrapper">
      <div className="profile-picture">
        {URL ? <img src={URL} /> : <img src={img} />}
      </div>
      <div className="update-button">
        Update photo
        <input
          type="file"
          className="upload-photo"
          name="photo"
          onChange={handleImageAsFile}
        ></input>
      </div>
      <div className={`notification-submit-${isUrl}`}>Saving...</div>
    </div>
  );
}
