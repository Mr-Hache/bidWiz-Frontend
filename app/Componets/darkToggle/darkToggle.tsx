

import React, { useEffect, useState } from 'react';
import { BsSunFill } from 'react-icons/bs';
import { BsMoonFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import styles from './darkToggle.module.scss';

export default function DarkToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // No render the component until the component is mounted
  if (!mounted) return null;

  return (
    <button className={styles.button} onClick={handleToggleTheme}>
      {resolvedTheme === 'dark' ? (
        <BsSunFill className={styles.sun} title="Light Mode" />
      ) : (
        <BsMoonFill className={styles.moon} title="Dark Mode" />
      )}
    </button>
  );
}


