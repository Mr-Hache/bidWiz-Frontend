import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBlzPhkSErym_sgwdh2A-n_rcJh2cDgPBg",
  authDomain: "bidwizusers.firebaseapp.com",
  projectId: "bidwizusers",
  storageBucket: "bidwizusers.appspot.com",
  messagingSenderId: "346917059665",
  appId: "1:346917059665:web:347f46c47587471f088c70",
  measurementId: "G-JR3S5EWC63"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();



export const loginWithGoogle =  () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider); 
}

export const createWithEmailAndPassword =  (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const userSignOut = () => {
  return signOut(auth);
}

export { app, auth };

