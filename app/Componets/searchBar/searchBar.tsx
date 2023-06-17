import styles from "./searchBar.module.scss";
import { useGetUserByUsernameQuery } from '@/app/redux/services/userApi';
import {useState} from 'react'

export default function searchBar() {
  
  const [search, setSearch] = useState<string>('')
  

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }
  
    const { data: user, isLoading, isError } = useGetUserByUsernameQuery({username: search});
    //console.log(user);
    
  


  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        placeholder="Find your Wizards"
        value={search}
        onChange={handleSearch}
      />
      <button  className={styles.button} type="submit">
        <div className={styles.lupa}>🔍︎</div>
      </button>
    </div>
  );
}
