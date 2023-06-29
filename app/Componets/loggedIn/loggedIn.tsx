"use client";

import React from "react";
import styles from "./loggedin.module.scss";
import Link from "next/link";

interface LoggedInContentProps {
  userName: string;
  userImage: string;
  isAdmin: boolean;
  handleSignOut: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function loggedIn({
  userName,
  userImage,
  isAdmin,
  handleSignOut,
}: LoggedInContentProps) {
  return (
    <>
      <h2>Hi, {userName.split(/[ .]/)[0]}!</h2>
      <h3 className={styles.log}>
        <Link href="/profile" passHref>
          <div className={styles.profileLink}>
            <img src={userImage} alt={userName} width="35" height="35" />
          </div>
        </Link>
      </h3>
      {isAdmin ? (
        <h3 className={styles.log}>
          <Link href="/admin" passHref>
            <div className={styles.profileLink}>este es el nuevo</div>
          </Link>
        </h3>
      ) : null}
      <h3 className={styles.log}>
        <button onClick={handleSignOut}>Sign Out</button>
      </h3>
    </>
  );
}
