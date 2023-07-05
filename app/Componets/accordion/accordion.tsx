"use client";

import { useState, ReactNode, useEffect, useRef } from "react";
import styles from "./accordion.module.scss";
import { HiChevronUp } from "react-icons/hi";
import { HiChevronDown } from "react-icons/hi";
import { useTheme } from "next-themes";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const accordionRef = useRef<HTMLDivElement>(null);
  const down = <HiChevronDown />;
  const up = <HiChevronUp />;

  const toggleAccordion = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const closeAccordion = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      accordionRef.current &&
      !accordionRef.current.contains(event.target as Node)
    ) {
      closeAccordion();
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.accordion} ref={accordionRef}>
      <p
        className={`${styles.titleAccordion} ${isOpen && styles.open}`}
        onClick={toggleAccordion}
        style={{ position: "relative", zIndex: 2 }}
      >
        <span>{title}</span>
        <span style={{ marginLeft: "8px" }}>{isOpen ? up : down}</span>
      </p>

      {isOpen && (
        <div
          className={styles.component}
          style={{ position: "relative", zIndex: 1 }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
