"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { BsSun } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";
import { useTheme } from "next-themes";

export default function darkToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    // Si el tema actual es 'dark', cambia a 'light'. Si es 'light', cambia a 'dark'.
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={handleToggleTheme}>
      {theme === "dark" ? <BsSun /> : <BsMoon />}
    </button>
  );
}
