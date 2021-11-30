import firebase from "firebase/compat/app";
import uniqid from "uniqid";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  onValue,
  query,
  orderByChild,
  update,
  push
} from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3WsDVT-TTJIoxPP2KELDJ4WraiM-QVeo",
  authDomain: "tweet-out.firebaseapp.com",
  projectId: "tweet-out",
  storageBucket: "tweet-out.appspot.com",
  messagingSenderId: "639838059188",
  appId: "1:639838059188:web:621c781b36dbe6838435e1",
  measurementId: "G-7HKNRV20P1",
  databaseURL:
    "https://tweet-out-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app); //realtime database
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getDatabase();
const dbRef = ref(getDatabase());

// //checks if a user exists
// const checkUser = () => {
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     const uid = user.uid;
//     console.log('there is a user',user)
//   } else {
//     console.log("there's no user")
//   }
// });
// }

//create a user with email and password
const register = (auth, email, password, name) => {
  createUserWithEmailAndPassword(auth, email, password, name)
    .then((userCredential) => {
      //capturing the date
      var dateNow = new Date();
      var dateFormatted = moment(dateNow).format("ddd DD MMM, HH:mm");

      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: URL,
      });
      // Signed in
      const user = userCredential.user;

      set(ref(db, "users/" + user.uid), {
        displayName: name,
        email: email,
        dateCreated: dateFormatted,
        uid: user.uid,
        authProvider: "local",
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

//updates profile picture in auth and database
const profileUpdate = (URL, userId) => {
  updateProfile(auth.currentUser, {
    photoURL: URL,
  })
  update(ref(db, 'users/' + userId), {
        "photoURL": URL
      });
};

//saves liked tweets in user's profile in db
const saveLikedTweet = (tweetId, userId) => {
  var tid = uniqid()
  update(ref(db, 'users/' + userId + '/likedTweets/' + tweetId), {
    tweetId
      });
};

//deletes liked tweets in user's profile in db
const deleteLikedTweet = (tweetId, userId) => {
  var tid = uniqid()
  update(ref(db, 'users/' + userId + '/likedTweets/' + tweetId), {
    tweetId: null
      });
};

//sign in a user
const signIn = (auth, email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("user logged in", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

//sign in with google
const signInWithGoogle = (auth, provider) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      let dateNow = new Date();
      let dateFormatted = moment(dateNow).format("ddd DD MMM, HH:mm");

      set(ref(db, "users/" + user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        authProvider: "google",
        email: user.email,
        dateCreated: dateFormatted,
        photoURL: user.photoURL,
      });

      // const docRef = addDoc(collection(db, "users"), {
      //   uid: user.uid,
      //   displayName: user.displayName,
      //   authProvider: "google",
      //   email: user.email,
      //   dateCreated: dateFormatted,
      // });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

//signs the user out
const logout = () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

//add tweet to database
const sendTweetDatabase = (input, name, dateFormatted) => {
  var tweetId = uniqid()
  set(ref(db, "tweets/" + tweetId), {
    content: input,
    userName: name,
    date: dateFormatted,
    id: tweetId,
  });
};

 //recieving likes from db
 const loadLikedTweets = (userId, setStorage) => {
  onValue(
    ref(db, "users/" + userId + "/likedTweets"),
    (snapshot) => {
      var likedTweetsArray = [];

      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        likedTweetsArray.push(data);
      });
      setStorage(likedTweetsArray)
    }
  );
}

export {
  register,
  signIn,
  auth,
  provider,
  signInWithGoogle,
  logout,
  sendTweetDatabase,
  db,
  set,
  profileUpdate,
  query,
  orderByChild,
  ref,
  onValue,
  saveLikedTweet,
  loadLikedTweets,
  deleteLikedTweet,
};
