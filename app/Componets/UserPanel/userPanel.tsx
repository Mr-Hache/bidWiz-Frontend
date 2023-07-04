"use client"

import styles from "./userPanel.module.scss";
import { useGetJobsByClientQuery, useUpdateJobReviewMutation, Job } from "@/app/redux/services/userApi";
import { useEffect, useState } from "react";
import {useAppSelector} from "../../redux/hooks"


interface JobReview {
  jobId: string;
  clientId: string;
  updateJobReviewDto: number; // Actualizado a number | null
}
interface JobViews {
  language: string;
  numClasses: number;
  price: number;
  status: string;
  subject: string;
}

export default function UserPanel() {
  const [jobReview, setJobReview] = useState({
    jobId: "",
    clientId: "",
    updateJobReviewDto: {rating: 1}, //DEL 1 AL 5
  });

  const localUid = useAppSelector((state) => state.userAuth.uid)
  const [userId, setUserId] = useState('');
  const fetchUserData = async () => {
    await fetch(`https://bidwiz-backend-production-db77.up.railway.app/users/user/${localUid}`)
    .then(response => response.json())
    .then(data => {
    setUserId(data._id)
})
    .catch(error => console.error(error));
}
console.log(userId)

const getJobsByClientQuery = useGetJobsByClientQuery({ clientId:userId });

const [updateJobReviewMutation] = useUpdateJobReviewMutation();

const { data: unableJobsByClient, isLoading: isLoadingJobsByClient, isError: isErrorJobsByClient } = getJobsByClientQuery;

const [jobsByClient, setJobsByClient] = useState<Job[]>([]);


useEffect( () => {
  fetchUserData(); 
  setJobReview(() => ({
    ...jobReview,
    clientId: userId,
  }));
}, [userId]);

  ////////////////////////////////////////////////////////////
  const onChangeReview = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: number = Number(event.target.value);
    setJobReview(() => ({
      ...jobReview,
      updateJobReviewDto: {rating:value} ,
    }));
    console.log(jobReview)
    checkButton()
  };
  const checkButton = () =>{
    if (jobReview.updateJobReviewDto.rating === 0){
      setButtonDisabled(true)
    }
    else{
      setButtonDisabled(false)
    }}
  const onChangeReviewJobId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = event.target.value;
    setJobReview(() => ({
      ...jobReview,
      jobId: value ,
    }));
    setClientInReviewViews((prevState: JobViews) => {
      return jobsByClient?.find((objeto: any) => objeto._id === value) || prevState;
    });
    checkButton()
  };
  const onClickHandlerReview = async () => {
    console.log(jobReview)
    try {
      await updateJobReviewMutation({jobId: jobReview.jobId, clientId: jobReview.clientId, updateJobReviewDto: jobReview.updateJobReviewDto });

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (unableJobsByClient) {
      setJobsByClient(unableJobsByClient);
    }
  }, [unableJobsByClient]);

  const onChangeInProgressClient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = event.target.value;
    setClientInProgressViews((prevState: JobViews) => {
      return jobsByClient?.find((objeto: any) => objeto._id === value) || prevState;
    });
  };
  /////////////////////////////////////////////////
  const [clientInProgressViews, setClientInProgressViews] = useState<JobViews>({
    language: '',
    numClasses: 0,
    price: 0,
    status: '',
    subject: '',
  });
  const [clientInReviewViews, setClientInReviewViews] = useState<JobViews>({
    language: '',
    numClasses: 0,
    price: 0,
    status: '',
    subject: '',
  });
const [buttonDisabled, setButtonDisabled] = useState(false)

    return (
<div className={styles.div}>
      
  <h1>Pending Classes</h1>
  <select name="" onChange={onChangeInProgressClient}>
    <option>Select</option>
    {jobsByClient?.map((job) => {
      if (job.status === 'In Progress') {
        return <option value={job._id} key={job._id}>{job.description}</option>;
      }
    })}
  </select>
  {clientInProgressViews && (
    <div className={styles.paneljobs}>
      <div >Language: {clientInProgressViews.language}</div>
      <div >NumClasses: {clientInProgressViews.numClasses}</div>
      <div >Price: {clientInProgressViews.price}</div>
      <div >Status: {clientInProgressViews.status}</div>
      <div >Subject: {clientInProgressViews.subject}</div>
    </div>
  )}
  <h1>Class Feedback</h1>
  <div className={styles.reviewContainer}>
  <select name="" onChange={onChangeReviewJobId}>
    <option>Select</option>
    {jobsByClient?.map((job) => {
      if (Object.keys(job).length == 11 ) {
        return <option value={job._id} key={job._id}>{job.description}</option>;
      }
    })}
  </select>
  </div>
  <select name="" onChange={onChangeReview} className={styles.reviewNumber}>
    <option value="0">Select Points</option>
    <option value="1">⭐</option>
    <option value="2">⭐⭐</option>
    <option value="3">⭐⭐⭐</option>
    <option value="4">⭐⭐⭐⭐</option>
    <option value="5">⭐⭐⭐⭐⭐</option>
  </select>
  
  {clientInReviewViews && (
    <div className={styles.paneljobs}>
      <div >Language: {clientInReviewViews.language}</div>
      <div >NumClasses: {clientInReviewViews.numClasses}</div>
      <div >Price: {clientInReviewViews.price}</div>
      <div >Status: {clientInReviewViews.status}</div>
      <div >Subject: {clientInReviewViews.subject}</div>
    </div>
  )}
  <button onClick={onClickHandlerReview} disabled={buttonDisabled}>Give Review</button>
  <div className={styles.block}></div>
</div>


    );
  }


  
