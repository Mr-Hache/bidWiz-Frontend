"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../redux/services/themeSlice";
import { RootState } from "../../redux/store";
import { BsSun } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";

export default function darkToggle() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useDispatch();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  console.log(darkMode);

  return (
    <button onClick={handleToggleDarkMode}>
      {darkMode ? <BsSun /> : <BsMoon />}
    </button>
  );
}
