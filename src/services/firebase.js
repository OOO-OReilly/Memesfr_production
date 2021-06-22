import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAe_UlaDUOKGyFJUwnTl7u3JwY8P_XHrAE",
  authDomain: "memes-30d06.firebaseapp.com",
  projectId: "memes-30d06",
  storageBucket: "memes-30d06.appspot.com",
  messagingSenderId: "679186451315",
  appId: "1:679186451315:web:05e4836805ab929032d306",
  measurementId: "G-H62166RXZQ",
});

export const auth = app.auth();
export const db = app.firestore();
export const storage = app.storage();
export default app;
