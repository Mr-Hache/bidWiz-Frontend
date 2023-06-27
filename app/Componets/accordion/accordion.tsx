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
      <h1
        className={`${styles.title} ${isOpen ? styles.open : ""}`}
        onClick={toggleAccordion}
      >
        {title}
      </h1>
      {isOpen && (
        <div>
          {children}
          <button className={styles.closeButton} onClick={closeAccordion}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
