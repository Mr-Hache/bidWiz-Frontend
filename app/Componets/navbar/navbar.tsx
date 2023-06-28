"use client";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { FaHatWizard } from "react-icons/fa";
import SearchBar from "../searchBar/searchBar";
import SelectorNavbar from "../selectorsNavbar/selectorNavbar";
import { useState, useEffect } from "react";
import { userSignOut } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import {
  setUser,
  setAuth,
  setEmail,
  setUid,
} from "../../redux/services/userAuthSlice";
import { useAppDispatch } from "../../redux/hooks";

export default function Navbar() {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
      
        console.log({
          name: user.displayName,
          email: user.email,
          uidFireBase: user.uid,
        });
        setIsLoggedIn(true);
        dispatch(setUser(user.displayName));
        dispatch(setAuth(true));
        dispatch(setEmail(user.email));
        dispatch(setUid(user.uid));
        fetch(
          `https://bidwiz-backend-production-db77.up.railway.app/users/user/${user.uid}`
        )
          .then((response) => response.json())
          .then((data) => {
            setUserImage(data.image);
            setUserName(data.name);
          })
          .catch((error) => console.error(error));
 
      } else {
        console.log("no hay usuario");
        setIsLoggedIn(false);

      }
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = userName === "bidwiz.admin";

  const handleSignOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await userSignOut();
      console.log("usuario deslogeado");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.navCont}>
      <div className={styles.icons}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className={styles.iconsLink}>
            <FaHatWizard className={styles.logoN} />
            <h1>BidWiz</h1>
          </div>
        </Link>
      </div>
      <div className={styles.links}>
        <SelectorNavbar filter="languages" />
        <SelectorNavbar filter="subjects" />
        <SearchBar />
      </div>
      <div className={styles.buttons}>
        {isLoggedIn ? (
          <>
            <h3 className={styles.log}>
              <Link href="/profile" passHref>
                <div className={styles.profileLink}>
                  <img src={userImage} alt={userName} width="35" height="35" />
                  My Profile
                </div>
              </Link>
            </h3>
            {isAdmin ? (
              <h3 className={styles.log}>
                <Link href="/admin" passHref>
                  <div className={styles.profileLink}>Dashboard</div>
                </Link>
              </h3>
            ) : null}
            <button onClick={handleSignOut} className={styles.button2}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <h3 className={styles.log}>
              <Link href="/login" passHref>
                Login
              </Link>
            </h3>
            <button className={styles.button2}>
              <Link href="/register" passHref>
                Sign Up
              </Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
