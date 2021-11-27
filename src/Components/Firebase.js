import firebase from "firebase/compat/app";
import uniqid from "uniqid";
// import moment from "moment";
import { initializeApp } from "firebase/app";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   getDocs,
//   doc,
//   setDoc,
// } from "firebase/firestore";

import {
  getDatabase,
  ref,
  set,
  child,
  get,
  onValue,
  query,
  orderByChild,
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
// const db = getFirestore(app); //firestore
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

      set(ref(ddb, "users/" + user.uid), {
        username: name,
        email: email,
        dateCreated: dateFormatted,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

const profileUpdate = (name, URL) => {
  updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: URL,
  })
    .then(() => {
      // Profile updated!
      console.log("name updated", name);
    })
    .catch((error) => {
      // An error occurred
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
      const docRef = addDoc(collection(db, "users"), {
        uid: user.uid,
        displayName: user.displayName,
        authProvider: "google",
        email: user.email,
        dateCreated: dateFormatted,
      });
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

//get data from rl database
const getTweetFirestore = () => {
  const allTweets = query(ref(db, "tweets"), orderByChild("dateCreated"));
  console.log(allTweets);
  // const starCountRef = ref(db, 'posts/' + postId + '/starCount');
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   updateStarCount(postElement, data);
  // });
};

//add data to rt databasw
const sendTweetFirestore = (input, name, dateFormatted) => {
  set(ref(db, "tweets/" + uniqid()), {
    content: input,
    userName: name,
    date: dateFormatted,
  });
};

export {
  register,
  signIn,
  auth,
  provider,
  signInWithGoogle,
  logout,
  sendTweetFirestore,
  getTweetFirestore,
  db,
  firebaseConfig,
  profileUpdate,
  query,
  orderByChild,
  ref,
  onValue,
};
