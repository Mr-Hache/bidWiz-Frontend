"use client"
import styles from "./searchBar.module.scss";
import { useState } from 'react';
import Link from 'next/link';
import {useRouter} from "next/navigation"




export default function searchBar() {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [userNotFound, setUserNotFound] = useState<boolean>(false)

   
  

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(
      
      event.target.value
      
    );
  }

  const handleSearchClick = async () => {
    if (search !== '') {
      try {
        const response = await fetch(`https://bidwiz-backend-production-db77.up.railway.app/users/wizard/${search}`);
        if (response.ok) {
         
          setUserNotFound(false);
          router.push(`/detail/${search}`)
        } else {
          setUserNotFound(true);
        }
      } catch (error) {
        console.error(error);
        setUserNotFound(true);
      }   
    }
  };


  
  
  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        placeholder="Find your Wizard"
        value={search}
        onChange={handleSearch}
      />
      {userNotFound? <span>User not found</span>: null}
        <button className={styles.button} onClick={handleSearchClick}>
          <div className={styles.lupa}>🔍︎</div>
        </button>
      
    </div>
  );
}

