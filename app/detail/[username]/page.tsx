"use client";
import {useState, useEffect} from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { usePathname } from "next/navigation";
import { useGetUserByIdQuery } from "@/app/redux/services/userApi";
import Navbar from "@/app/Componets/navbar/navbar";
import styles from "./detail.module.scss";
import { useCreateJobMutation } from "@/app/redux/services/userApi";

function detail() {
  initMercadoPago('TEST-f290c78e-5208-406e-8395-17f2f78dfc23');
  const [preferenceId, setPreferenceId] = useState("")
  const [createJobDto, setCreateJobDto] = useState({});

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClasses, setSelectedClasses] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null); 

  const [createJob, { data: job, }] = useCreateJobMutation();
  const pathname = usePathname(); 
  const _id = pathname.split("/")[2];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
  };

  const handleClassesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedNumber = parseInt(e.target.value);
    setSelectedClasses(selectedNumber);
    if (user){
    switch(selectedNumber){
      case 1: 
        setSelectedPrice(user.pricePerOne);
        break;
      case 2:
        setSelectedPrice(user.pricePerTwo);
        break;
      case 3:
        setSelectedPrice(user.pricePerThree);
        break;
      default:
        setSelectedPrice(null);
    }
    }
  };

  const handleClick = async () => {
    try {
      console.log(createJobDto)
      const newJob = await createJob(createJobDto).unwrap();
      setPreferenceId(newJob.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCreateJobDto({
      ...createJobDto,
      status: "In Progress",
      description: `Class: ${selectedSubject} in ${selectedLanguage}. Client: ${_id}. Tutor: ${_id}. Price: $${(selectedClasses || 0) * (selectedPrice || 0)} USD.`,
      price: selectedPrice,
      numClasses: selectedClasses,
      clientId: "648e17f0c8489b5c103ee650",
      workerId: _id,
      language: selectedLanguage,
      subject: selectedSubject,
      result: "default"
    });
    console.log(createJobDto); 
  }, [selectedLanguage, selectedSubject, selectedClasses, _id, selectedPrice]);

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery({ _id});

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
        <p>{user.reviews}</p>
        <h4>{user.experience.expJobs} Reviews</h4>
        <h3>{user.languages.join(' - ')}</h3>
        <h3>{user.subjects.join(' - ')}</h3>
        </div>
        <div className={styles.righbar}>
          <h1>About Me</h1>
          <h2>{user.aboutMe}</h2>
          <table>
    <tbody>
    <select value={selectedLanguage} onChange={handleLanguageChange}>
  <option value="">Choose one</option>
  {user.languages.map((language) => (
    <option value={language}>{language}</option>
  ))}
</select>

<select value={selectedSubject} onChange={handleSubjectChange}>
  <option value="">Choose one</option>
  {user.subjects.map((subject) => (
    <option value={subject}>{subject}</option>
  ))}
</select>
<br />
<label htmlFor="">Price per one class {user.pricePerOne} USD</label>
<input
  type="radio"
  name="classes"
  value={1}
  checked={selectedClasses === 1}
  onChange={handleClassesChange}
/>
<br />
<label htmlFor="">Price per two classes {user.pricePerTwo*2} USD</label>
<input
  type="radio"
  name="classes"
  value={2}
  checked={selectedClasses === 2}
  onChange={handleClassesChange}
/>
<br />
<label htmlFor="">Price per three classes {user.pricePerThree*3} USD</label>
<input
  type="radio"
  name="classes"
  value={3}
  checked={selectedClasses === 3}
  onChange={handleClassesChange}
/>
    </tbody>
  </table>
  <button onClick={handleClick} disabled={!selectedLanguage || !selectedSubject || !selectedClasses}>CONFIRM</button> 
  {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
        </div>
    </div>
    </div>
  );
}

export default detail;
