"use client";

import React from "react";
import styles from "./loggedin.module.scss";
import Link from "next/link";
import { useRef, useState } from "react";

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
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleDropdown = (state: boolean) => {
    setOpen(!state);
  };
  const handleClickDropdown = (event: MouseEvent) => {
    if (open && !dropdownRef.current?.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  window.addEventListener("click", handleClickDropdown);

  return (
    <div className={styles.selectorProfile}>
      <h2>Hi, {userName.split(/[ .]/)[0]}!</h2>

      <div className={styles.dropdown} ref={dropdownRef}>
        <div className={styles.dropdownToggle}>
          <a
            onClick={(event) => handleDropdown(open)}
            style={{ display: "inline-block" }}
          >
            <img src={userImage} alt={userName} width="35" height="35" />
          </a>
        </div>
      </div>
      {open && (
        <div>
          <h3 className={styles.log}>
            <Link href="/profile" passHref>
              <div className={styles.profileLink}>My profile</div>
            </Link>
          </h3>
          {isAdmin && (
            <h3 className={styles.log}>
              <Link href="/admin" passHref>
                <div className={styles.profileLink}>Dashboard</div>
              </Link>
            </h3>
          )}
          <h3 className={styles.log}>
            <button onClick={handleSignOut}>Sign Out</button>
          </h3>
        </div>
      )}
    </div>
  );
}
