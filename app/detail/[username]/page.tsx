"use client";
import {useState} from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { usePathname } from "next/navigation";
import { useGetUserByIdQuery } from "@/app/redux/services/userApi";
import Navbar from "@/app/Componets/navbar/navbar";
import styles from "./detail.module.scss";
import Link from "next/link";
import { useCreateJobMutation } from "@/app/redux/services/userApi";

function detail() {
  initMercadoPago('TEST-f290c78e-5208-406e-8395-17f2f78dfc23');
  const [preferenceId, setPreferenceId] = useState("")
  const [createJobDto, setCreateJobDto] = useState({
    status: "In Progress",
    description: "Test",
    price: 20,
    numClasses: 1,
    clientId: "648e17f0c8489b5c103ee650",
    workerId: "648e1817c8489b5c103ee67a",
    language: "English",
    subject: "Mathematics",
    result: "hola mundo"
  });

  const [createJob, { data: job, }] = useCreateJobMutation();
  const pathname = usePathname(); // imprime la ruta actual
  const _id = pathname.split("/")[2];
  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery({ _id});
  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>User not found</div>;

  

  const handleClick = async () => {
    try {
      const newJob = await createJob(createJobDto).unwrap();
      setPreferenceId(newJob.result);
    } catch (error) {
      console.error(error);
      // Aquí manejas el error.
    }
  };

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
  <button onClick={handleClick}>CONFIRM</button> 
  {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
        </div>
    </div>
    </div>
  );
}

export default detail;
