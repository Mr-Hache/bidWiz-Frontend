"use client";

import { usePathname } from "next/navigation";
import { useGetUserByUsernameQuery } from "@/app/redux/services/userApi";
import Navbar from "@/app/Componets/navbar/navbar";
import styles from "./detail.module.scss";
import Link from "next/link";


function detail() {
  const pathname = usePathname(); // imprime la ruta actual
  const username = pathname.split("/")[2];

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByUsernameQuery({ username });
  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>User not found</div>;

  return (
    
    <div>
      <Navbar/>
      <div className={styles.block}></div>
    <div className={styles.detail}>
      <div className={styles.sidebar}>
        <img src={user.image} alt="" width={200} height={200} />
        <h2>{`${user.name} `}</h2>
        <h2>{user.experience.title}</h2>
        <p>⭐⭐⭐⭐⭐</p>
        <h4>{user.experience.expJobs} Reviews</h4>
        <h3>{user.languages.join(' - ')}</h3>
        <h3>{user.subjects.join(' - ')}</h3>
        {/* <h3>{user.experience.origin}</h3> */}
        </div>
        <div className={styles.righbar}>
          <h1>About Me</h1>
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam corporis, cupiditate ex dolores omnis aliquid voluptate facere error sequi sapiente nam praesentium nemo, itaque veniam consequatur recusandae mollitia natus rerum?</h3>
          <table>
    <tbody>
      <tr>
        <td>1 Class</td>
        <td>30 USD</td>
      </tr>
      <tr>
        <td>3 Classes</td>
        <td>28 USD</td>
      </tr>
      <tr>
        <td>5 Classes</td>
        <td>25 USD</td>
      </tr>
    </tbody>
  </table>
  <Link href="/not-found" className={styles.link}>  <button>CONFIRM</button> </Link>
        </div>
    </div>
    </div>
  );
}

export default detail;
