import styles from "./searchBar.module.scss";
import { useGetUserByUsernameQuery } from '@/app/redux/services/userApi';
import { useState } from 'react';
import Link from 'next/link';

export default function searchBar() {
  
  const [search, setSearch] = useState<string>('');
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const { data: user, isLoading, isError } = useGetUserByUsernameQuery({ username: search }, { skip: !shouldFetch }); 

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  const handleSearchClick = () => {
    setShouldFetch(true);
  }
  
  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        placeholder="Find your Wizard"
        value={search}
        onChange={handleSearch}
      />
      <Link href={`/detail/${search}`} passHref>
        <button className={styles.button} onClick={handleSearchClick}>
          <div className={styles.lupa}>🔍︎</div>
        </button>
      </Link>
      {isError && <div>Wizard with username "{search}" not found</div>}
    </div>
  );
}
