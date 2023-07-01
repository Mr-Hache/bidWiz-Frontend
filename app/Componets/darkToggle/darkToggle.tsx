"use client";

import React from "react";
import { BsSunFill } from "react-icons/bs";
import { BsMoonFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import styles from "./darkToggle.module.scss";
import { useEffect} from "react";

export default function darkToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => setMounted(true), []);


  const handleToggleTheme = () => {
    // Si el tema actual es 'dark', cambia a 'light'. Si es 'light', cambia a 'dark'.
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;
  return (
    <button className={styles.button} onClick={handleToggleTheme}>
      {theme === "dark" ? (
        <BsSunFill className={styles.sun} title="Ligth Mode" />
      ) : (
        <BsMoonFill className={styles.moon} title="Dark Mode" />
      )}
    </button>
  );
}
