"use client";

import React from "react";
import styles from "./loggedin.module.scss";
import Link from "next/link";
import { useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { VscGraph } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";

interface LoggedInContentProps {
  userName: string;
  userImage: string;
  isAdmin: boolean;
  handleSignOut: (event: React.MouseEvent<HTMLAnchorElement>) => void;
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
      <h4>{userName ? `Hi, ${userName.split(/[ .]/)[0]}!` : ""}</h4>
      <div>
        <div className={styles.dropdown} ref={dropdownRef}>
          <div className={styles.dropdownToggle}>
            <a
              onClick={(event) => handleDropdown(open)}
              style={{ display: "inline-block" }}
            >
              {userImage ? (
                <img src={userImage} alt={userName} width="35" height="35" />
              ) : (
                <AiOutlineUser className={styles.squeletorImg} />
              )}
            </a>
          </div>
        </div>
        {open && (
          <div className={styles.containerLink}>
            <Link href="/profile" passHref>
              <div className={styles.link}>
                <AiOutlineUser className={styles.icons} />
                My profile
              </div>
            </Link>
            <br />
            {isAdmin && (
              <Link href="/admin" passHref>
                <div className={styles.link}>
                  <VscGraph className={styles.icons} /> Dashboard
                </div>
              </Link>
            )}
            <br />{" "}
            <a onClick={handleSignOut}>
              <div className={styles.link2}>
                <FiLogOut className={styles.icons2} /> <p>Sign Out</p>
              </div>
            </a>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
