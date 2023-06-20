import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);
const auth = getAuth();

export { app, analytics, auth };

