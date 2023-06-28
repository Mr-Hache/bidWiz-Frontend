"use client";

import { useState, ReactNode, useEffect } from "react";
import styles from "./accordion.module.scss";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export default function accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const closeAccordion = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.accordion}>
      <p
        className={`${styles.titleAccordion} ${isOpen ? styles.open : ""}`}
        onClick={toggleAccordion}
        style={{ position: "relative", zIndex: 2 }}
      >
        {title}
      </p>
      {isOpen && (
        <div
          className={styles.component}
          style={{ position: "relative", zIndex: 1 }}
        >
          {children}
          <button className={styles.buttonClosed} onClick={closeAccordion}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
