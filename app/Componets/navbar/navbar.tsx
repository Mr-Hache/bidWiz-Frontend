"use client";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { FaHatWizard } from "react-icons/fa";

import SearchBar from "../searchBar/searchBar";
import SelectorNavbar from "../selectorsNavbar/selectorNavbar";
import DarkToggle from "../darkToggle/darkToggle";
import LoggedIn from "../loggedIn/loggedIn";
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
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
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
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = userName === "bidwiz.admin";

  const handleSignOut = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    try {
      await userSignOut();
      router.push("/");
    } catch (error) {}
  };

  return (
    <div
      className={`${styles.navCont} ${
        theme === "dark" ? styles.navContDark : styles.navContLight
      }`}
    >
      <div className={styles.icons}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className={styles.iconsLink}>
            <FaHatWizard className={styles.logoN} />
            <h1>BidWiz</h1>
          </div>
        </Link>
      </div>
      <div className={styles.links}>
        <SelectorNavbar />
        <SearchBar />
      </div>
      <div className={styles.buttons}>
        {isLoggedIn ? (
          <LoggedIn
            userName={userName}
            userImage={userImage}
            isAdmin={isAdmin}
            handleSignOut={handleSignOut}
          />
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
      <div className={styles.darkToggle}>
        <DarkToggle />
      </div>
    </div>
  );
}
