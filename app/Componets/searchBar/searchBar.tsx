"use client"
import styles from "./searchBar.module.scss";
import { useState, useEffect } from 'react';
import {useRouter} from "next/navigation"
import { useGetUsersQuery, User } from "../../redux/services/userApi";



export default function searchBar() {
  const router = useRouter();

  const { data: users } = useGetUsersQuery(null);
  const [search, setSearch] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredUsers = users?.filter((user: User) =>
    user.name.toLowerCase().includes(search.toLowerCase()) && user.isWizard && !user.isDisabled
  );

  const handleUserClick = (userId: string) => {
    router.push(`/detail/${userId}`);
  };
      
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(filteredUsers?.length === 1) {
      handleUserClick(filteredUsers[0]._id);
    }
  };
  
  
  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Find your Wizard"
        value={search}
        onChange={handleSearch}
      />
      <button type="submit" className={styles.button} >
          <div className={styles.lupa}>🔍︎</div>
        </button>
      </form>

      <div className={styles.contResults}>
      {search && filteredUsers && filteredUsers.slice(0, 3).map((user: User) => (
        <div key={user._id} className={styles.userResult} onClick={() => handleUserClick(user._id)}>
         {user.name}          
        </div>
      ))}
      </div>   
      </div> 
    
  );
}

