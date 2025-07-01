// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCFk17iPiyZUjyyZR9uKS8VlD7Mh8-K5s",
  authDomain: "infoyieldx-2d17d.firebaseapp.com",
  projectId: "infoyieldx-2d17d",
  storageBucket: "infoyieldx-2d17d.appspot.com",
  messagingSenderId: "944679613259",
  appId: "1:944679613259:web:28dc2232fd66cc1434eece",
  measurementId: "G-2WPK9QTWXC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
