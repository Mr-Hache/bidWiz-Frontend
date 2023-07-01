"use client";
import {useState, useEffect} from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { usePathname } from "next/navigation";
import { User, useGetUserByIdQuery } from "@/app/redux/services/userApi";
import Navbar from "@/app/Componets/navbar/navbar";
import styles from "./detail.module.scss";
import { useCreateJobMutation } from "@/app/redux/services/userApi";
import {useAppSelector} from "../../redux/hooks"
import Flag from "react-world-flags";
import { flags, subjectsIcons } from "@/app/utils/flagsAndObjectsIcons";
import {  FaBook,  FaMicroscope,  FaBriefcase,  FaVial,  FaCode,  FaRegChartBar,  FaBalanceScale,  FaCalculator,  FaMusic,  FaAtom,  FaUserGraduate,  FaLaptopCode,} from 'react-icons/fa';
import { IconType } from 'react-icons';
import  FaIconName  from 'react-icons/fa';
import CalendarUpdate from "@/app/Componets/calendarUpdate/calendarUpdate";
import Swal from "sweetalert2";
import Loading from "@/app/Componets/Loading/Loading";

interface LanguageFlag {
  name: string;
  flag: string | null;
}


function detail() {
  const localUid = useAppSelector((state) => state.userAuth.uid)
  initMercadoPago('TEST-f290c78e-5208-406e-8395-17f2f78dfc23');
  const [preferenceId, setPreferenceId] = useState("")
  const [createJobDto, setCreateJobDto] = useState({});
  const [buyerId, setBuyerId] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClasses, setSelectedClasses] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null); 
  const [buyerName, setBuyerName] = useState("")
  const [availability, setAvailability] = useState<{ day: string; hour: string }[]>([]);


  const [createJob, { data: job, }] = useCreateJobMutation();
  const pathname = usePathname(); 
  const _id = pathname.split("/")[2];

  const fetchUserData = () => {
    fetch(`https://bidwiz-backend-production-db77.up.railway.app/users/user/${localUid}`)
    .then(response => response.json())
    .then(data => {
      setBuyerId(data._id)
      setBuyerName(data.name)
    })
    .catch(error => console.error(error));
}
  useEffect(() => {
    fetchUserData(); 
  }, [localUid]);
  

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
      Swal.fire("Need to login or wrong select")
      console.error(error);
    }
  };

  useEffect(() => {
    setCreateJobDto({
      ...createJobDto,
      status: "In Progress",
      description: `Class: ${selectedSubject} in ${selectedLanguage}. Client name: ${buyerName}. Client ID: ${buyerId}. Wizard name: ${user?.name}. Wizard ID: ${_id}. Price: $${(selectedClasses || 0) * (selectedPrice || 0)} USD.`,
      price: selectedPrice,
      numClasses: selectedClasses,
      clientId: buyerId,
      workerId: _id,
      language: selectedLanguage,
      subject: selectedSubject,
      result: "default",
      availability: availability
    });
    console.log(createJobDto); 
  }, [selectedLanguage, selectedSubject, selectedClasses, _id, selectedPrice, buyerId]);

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery({ _id});

  if (isLoading) return <Loading />;
  if (isError || !user) return <div>User not found</div>;


  const mappedLanguages: (string | null)[] = user.languages.map((language: string | null) => {
    const flagObject = flags.find((flag: LanguageFlag) => flag.name === language);
    return flagObject ? flagObject.flag : null;
  })

  const getSubjectIcon = (iconName: string): IconType | null => {
    switch (iconName) {
      case "FaBook":
        return FaBook;
      case "FaMicroscope":
        return FaMicroscope;
      case "FaBriefcase":
        return FaBriefcase;
      case "FaVial":
        return FaVial;
      case "FaCode":
        return FaCode;
      case "FaRegChartBar":
        return FaRegChartBar;
      case "FaBalanceScale":
        return FaBalanceScale;
      case "FaCalculator":
        return FaCalculator;
      case "FaMusic":
        return FaMusic;
      case "FaAtom":
        return FaAtom;
      case "FaUserGraduate":
        return FaUserGraduate;
      case "FaLaptopCode":
        return FaLaptopCode;
      default:
        return null;
    }
  };  

  const renderStars = (numStars: number) => {
    const stars = '⭐';
    return stars.repeat(Math.round(numStars));
  };

  

  const handleSelectedTimeslots = (timeslots: {day: string, hour: string}[]) => {
    setCreateJobDto((prevCreateJobDto) => ({
      ...prevCreateJobDto,
      availability: timeslots,
    }));
  };

  return (    
    <div>
      <Navbar/>
      <div className={styles.block}></div>
      <div className={styles.detail}>
      <div className={styles.sidebar}>
        <h2 className={styles.name}>{`${user.name} `}</h2>
        <img src={user.image} alt="" width={200} height={200} className={styles.imagen} />
        <div className={styles.secondCont}>
        <h2>{user.experience.title}</h2>      
        <p>{renderStars(user.reviews)}</p>   
        <hr />
              
        <h3>Available Languages</h3>      

        <div className={styles.flags}>
              {mappedLanguages
                .slice() 
                .sort((a, b) => (a && b ? a.localeCompare(b) : 0))          
                .map((language, index) => (
                  <div key={index} className={styles.language}>
                    {language && (
                      <Flag
                        height={20}
                        width={30}
                        code={language.slice(0, 2).toLowerCase()}                                          
                      />
                    )}
                    <span >{language}</span>
                  </div>
                ))}
                </div>
                <hr />
                <h3>Available Subjects</h3>
                <div className={styles.subjects} >
            {user.subjects
              .slice() 
              .sort((a, b) => a.localeCompare(b)) 
              .map((subject, index) => {
                const subjectIcon = subjectsIcons.find((item) => item.name === subject);
                const Icon = subjectIcon ? getSubjectIcon(subjectIcon.icon) : null;
                const colors = ['#E81DF1 ', '#00FF00', '#0000FF', '#DD963B', '#0E18F1' ]; 
                //const colors = ['#470457' ];
                const iconColor = colors[index % colors.length]; 

                return (
                  <div key={index} className={styles.subject}>
                    {Icon && <Icon style={{ color: iconColor }} />}
                    <span className={styles.siglas}>{subject}</span>
                  </div>
                );
              })}
          </div>         
        </div>          
        </div>                       
        <div className={styles.righbar}>
          <br /><br />
          
          <div className={styles.contAbout}>
          <h1>About Me</h1>
          <h2>{user.aboutMe}</h2>
          </div>          
          <table>
    <tbody>      

      <div className={styles.contSelect}>
        <h4>Choose your language</h4>
         <select value={selectedLanguage} onChange={handleLanguageChange} className={styles.chooseLang}>      
          <option value="">Choose one</option>
           {user.languages.map((language) => (
          <option value={language}>{language}</option>
        ))}
         </select>

          <h4>Choose your subject</h4>
          <select value={selectedSubject} onChange={handleSubjectChange} className={styles.chooseSubj}>
            <option value="">Choose one</option>
            {user.subjects.map((subject) => (
              <option value={subject}>{subject}</option>
            ))}
          </select>
      </div>

      <div className={styles.contInputs}>
      <hr />
      
<input
  type="radio"
  name="classes"
  value={1}
  checked={selectedClasses === 1}
  onChange={handleClassesChange}
/>
<label htmlFor="">Price per one class {user.pricePerOne} USD</label>
<hr />

<input
  type="radio"
  name="classes"
  value={2}
  checked={selectedClasses === 2}
  onChange={handleClassesChange}
/>
<label htmlFor="">Price per two classes {user.pricePerTwo*2} USD</label>

<hr />
<input
  type="radio"
  name="classes"
  value={3}
  checked={selectedClasses === 3}
  onChange={handleClassesChange}
/>
<label htmlFor="">Price per three classes {user.pricePerThree*3} USD</label>
<hr />
      </div>
    </tbody>
  </table>
      {selectedClasses === null 
      ? <p>Select your classes</p>
      : selectedClasses === 0 
        ? <p>Select your classes</p> 
        : <p>Please select {selectedClasses} {selectedClasses > 1 ? 'classes' : 'class'}</p>
      }
      <CalendarUpdate calendarData={user.calendar} numberClasses={selectedClasses || 0} onSelectedTimeslots={handleSelectedTimeslots} />
      
                <button onClick={handleClick} disabled={!selectedLanguage || !selectedSubject || !selectedClasses}>CONFIRM</button> 
                {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
          </div>
      </div>
    </div>
  );
}

export default detail;
