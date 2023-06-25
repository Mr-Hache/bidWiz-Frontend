"use client"

import styles from "./jobsPanel.module.scss";
import { useGetJobsByWorkerQuery, useGetJobsByClientQuery, useUpdateJobWorkerMutation, useUpdateJobReviewMutation } from "@/app/redux/services/userApi";
import { useEffect, useState } from "react";
import {useAppSelector} from "../../redux/hooks"


interface JobReview {
  jobId: string;
  clientId: string;
  updateJobReviewDto: number; // Actualizado a number | null
}

export default function JobsPanel() {

  const [jobToChange, setJobToChange] = useState({
    jobId: "",
    workerId: "",
    updateJobWorkerDto: {status: 'Finished'}, //'In Progress' | 'Finished'
  });
  const [jobReview, setJobReview] = useState({
    jobId: "",
    clientId: "",
    updateJobReviewDto: {rating: 1}, //DEL 1 AL 5
  });

  const localUid = useAppSelector((state) => state.userAuth.uid)
  // const clientId = "648e17f0c8489b5c103ee650"
  // const workerId = "648e1817c8489b5c103ee67a"
  const [userId, setUserId] = useState('');
  const fetchUserData = async () => {
    await fetch(`https://bidwiz-backend-production-db77.up.railway.app/users/user/${localUid}`)
    .then(response => response.json())
    .then(data => {
    setUserId(data._id)
})
    .catch(error => console.error(error));
}
useEffect( () => {
  fetchUserData(); 
  setJobReview(() => ({
    ...jobReview,
    clientId: userId,
  }));
  setJobToChange(() => ({
    ...jobToChange,
    workerId: userId ,
  }));
}, [userId]);
  const getJobsByWorkerQuery = useGetJobsByWorkerQuery({ workerId:userId });

  const getJobsByClientQuery = useGetJobsByClientQuery({ clientId:userId });


  const [updateJobWorkerMutation] = useUpdateJobWorkerMutation();

  const [updateJobReviewMutation] = useUpdateJobReviewMutation();

  console.log(userId)

  const { data: jobsByWorker, isLoading: isLoadingJobsByWorker, isError: isErrorJobsByWorker } = getJobsByWorkerQuery;
  const { data: jobsByClient, isLoading: isLoadingJobsByClient, isError: isErrorJobsByClient } = getJobsByClientQuery;

  ////////////////////////////////////////////////////////////
  const onChangeReview = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: number = Number(event.target.value);
    setJobReview(() => ({
      ...jobReview,
      updateJobReviewDto: {rating:value} ,
    }));
    console.log(jobReview)
    
  };
  const onChangeReviewJobId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = event.target.value;
    setJobReview(() => ({
      ...jobReview,
      jobId: value ,
    }));
    setClientInReviewViews(() => jobsByClient?.find((objeto: any) => objeto._id === value));
  };
  const onClickHandlerReview = async () => {
    console.log(jobReview)
    try {
      await updateJobReviewMutation({jobId: jobReview.jobId, clientId: jobReview.clientId, updateJobReviewDto: jobReview.updateJobReviewDto });
    } catch (error) {
      console.error(error);
    }
  }
  ////////////////////////////////////////////////////////////

  const onChangeStatusJobId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    
    const value: string = event.target.value;
    console.log(jobToChange)
    setJobToChange(() => ({
      ...jobToChange,
      jobId: value ,
    }));
    setInProgessJobViews(() => jobsByWorker?.find((objeto: any) => objeto._id === value));
  };
  const onClickHandlerJobStatus = async () => {
    console.log(jobToChange)
    try {
      await updateJobWorkerMutation({jobId: jobToChange.jobId, workerId: jobToChange.workerId, updateJobWorkerDto: jobToChange.updateJobWorkerDto });
    } catch (error) {
      console.error(error);
    }
  }
  const onChangeStatusJobIdFinished = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = event.target.value;
    setCompletedJobViews(() => jobsByWorker?.find((objeto: any) => objeto._id === value));
  };

  const onChangeInProgressClient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = event.target.value;
    setClientInProgressViews(() => jobsByClient?.find((objeto: any) => objeto._id === value));
  };
  /////////////////////////////////////////////////
  const [InProgessJobViews, setInProgessJobViews] = useState({
    
  })
  const [completedJobViews, setCompletedJobViews] = useState({

  })
  const [clientInProgressViews, setClientInProgressViews] = useState({

  })
  const [clientInReviewViews, setClientInReviewViews] = useState({

  })
    return (
<div className={styles.div}>
      <h1>In Progress jobs:</h1>
      <select name="" onChange={onChangeStatusJobId}>
        <option>Select</option>
        {jobsByWorker?.map((job) => {
          if (job.status === 'In Progress') {
            return <option value={job._id}>{job.description}</option>;
          }
        })}
      </select>
      {InProgessJobViews && (
        <div className={styles.paneljobs}>
          <div>Language: {InProgessJobViews.language}</div>
          <div>NumClasses: {InProgessJobViews.numClasses}</div>
          <div >Price: {InProgessJobViews.price}</div>
          <div >Status: {InProgessJobViews.status}</div>
          <div >Subject: {InProgessJobViews.subject}</div>
        </div>
      )}
      <button  onClick={onClickHandlerJobStatus}>Complete Job</button>

      <h1>Completed:</h1>
      <select  name="" onChange={onChangeStatusJobIdFinished}>
        <option>Select</option>
        {jobsByWorker?.map((job) => {
          if (job.status === "Finished") {
            return <option value={job._id}>{job.description}</option>;
          }
        })}
      </select>
      <div>
        {completedJobViews && (
          <div className={styles.paneljobs}>
            <div >Language: {completedJobViews.language}</div>
            <div >NumClasses: {completedJobViews.numClasses}</div>
            <div >Price: {completedJobViews.price}</div>
            <div >Status: {completedJobViews.status}</div>
            <div >Subject: {completedJobViews.subject}</div>
          </div>
        )}
      </div>
  <h1>Jobs in progress:</h1>
  <select name="" onChange={onChangeInProgressClient}>
    <option>Select</option>
    {jobsByClient?.map((job) => {
      if (job.status === 'In Progress') {
        return <option value={job._id}>{job.description}</option>;
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
  <h1>Jobs to review:</h1>
  <select name="" onChange={onChangeReviewJobId}>
    <option>Select</option>
    {jobsByClient?.map((job) => {
      if (job.status === "Finished") {
        return <option value={job._id}>{job.description}</option>;
      }
    })}
  </select>
  <h2>Work Rating:</h2>
  <select name="" onChange={onChangeReview}>
    <option value="1">Select Points</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
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
  <button onClick={onClickHandlerReview}>Give Review</button>
</div>

    );
  }


  

