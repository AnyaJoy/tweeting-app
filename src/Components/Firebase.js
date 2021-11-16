import firebase from "firebase/compat/app";
import moment from "moment";

const firebaseConfig = {
  apiKey: "AIzaSyBMjyU3LTizzmKymU0u5x_IDGBKVR2PDgw",
  authDomain: "react-project-2-anyajoy.firebaseapp.com",
  projectId: "react-project-2-anyajoy",
  storageBucket: "react-project-2-anyajoy.appspot.com",
  messagingSenderId: "571997512755",
  appId: "1:571997512755:web:48cbc30dbc1a0874f62f46",
  measurementId: "G-KZWMH65NEN",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      let dateNow = new Date();
      let dateFormatted = moment(dateNow).format("ddd DD MMM, HH:mm");
      await db.collection("users").doc(user.uid).set({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        dateCreated: dateFormatted,
      });
    }
    console.log("signed in with google!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    console.log("signed in!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    let dateNow = new Date();
    let dateFormatted = moment(dateNow).format("ddd DD MMM, HH:mm");
    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      dateCreated: dateFormatted,
    });
    console.log("registered!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
  console.log("logged out!");
};


export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
