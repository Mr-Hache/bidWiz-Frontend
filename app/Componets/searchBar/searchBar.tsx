"use client"
import styles from "./searchBar.module.scss";
import { useState } from 'react';
import {useRouter} from "next/navigation"




export default function searchBar() {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");

   
  

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
         
          router.push(`/detail/${search}`)
        } else {
          alert('Wizard not found')
          setSearch("")
        }
      } catch (error) {
        console.error(error);
       
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
    
        <button className={styles.button} onClick={handleSearchClick}>
          <div className={styles.lupa}>🔍︎</div>
        </button>
      
    </div>
  );
}

