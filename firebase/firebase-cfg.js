import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDCf0lBfptw1NN8IogMXzM7QcOFJJNL6JI",
  authDomain: "meepdb.firebaseapp.com",
  projectId: "meepdb",
  storageBucket: "meepdb.appspot.com",
  messagingSenderId: "753012879896",
  appId: "1:753012879896:web:1413f1b27629c04033c96d"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

//login and set Online Status to True
const logInWithEmailAndPassword = async (email, password) => {
  try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
}
catch (err) {
      console.log(err);
      alert('Please try again');
    }
  };

//Register function with setDoc
const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", res.user.uid), {
      uid: user.uid,
      authProvider: "local",
      email,
      gender: "Gender",
      firstName: "First Name",
      lastName: "Last Name",
      dob: 0,
      localisation: "N/A",
      longitude: 0,
      latitude: 0,
      description: "Description",
      categories: ['N/A'],
      interests: ['N/A'],
      university: "N/A",
      isOnline: true,
    });
  } catch (err) {
      console.log(err);
      alert('Please try again');
  }
};

//reset link
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.log(err);
    alert('Error! Try again');
  }
};

//Logging out and setting Online Status to false
const logout = async () => {
  try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        isOnline: false,
      });
      signOut(auth);
}
catch (err) {
      console.log(err);
      alert('Please try again');
    }
};


export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  storage,
};
