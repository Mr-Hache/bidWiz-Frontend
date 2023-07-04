"use client"

import styles from "./WizardPanel.module.scss";
import { useGetJobsByWorkerQuery, useUpdateJobWorkerMutation, Job } from "@/app/redux/services/userApi";
import { useEffect, useState } from "react";
import {useAppSelector} from "../../redux/hooks"
import Swal from "sweetalert2";


interface JobViews {
  language: string;
  numClasses: number;
  price: number;
  status: string;
  subject: string;
}

export default function WizardPanel() {
  
  const [jobToChange, setJobToChange] = useState({
    jobId: "",
    workerId: "",
    updateJobWorkerDto: {status: 'Finished'}, //'In Progress' | 'Finished'
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

const getJobsByWorkerQuery = useGetJobsByWorkerQuery({ workerId:userId });


const [updateJobWorkerMutation] = useUpdateJobWorkerMutation();

const { data: allJobsByWorker, isLoading: isLoadingJobsByWorker, isError: isErrorJobsByWorker, refetch } = getJobsByWorkerQuery;

const [jobsByWorker, setJobsByWorker] = useState<{inProgress: Job[], completed: Job[] | undefined}>({
  inProgress: [],
  completed: []
});

useEffect( () => {
  fetchUserData(); 
  setJobToChange(() => ({
    ...jobToChange,
    workerId: userId ,
  }));
}, [userId]);


useEffect(() => {
  if (allJobsByWorker) {
    const inProgressJobs = allJobsByWorker.filter(job => job.status === 'In Progress');
    const completedJobs = allJobsByWorker.filter(job => job.status === 'Finished');

    setJobsByWorker({
      inProgress: inProgressJobs,
      completed: completedJobs,
    });
  }
}, [allJobsByWorker]);


const onChangeStatusJobId = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const value: string = event.target.value;
  setInProgressJobViews((prevState: JobViews) => {
    const selectedJob = jobsByWorker.inProgress?.find((objeto: any) => objeto._id === value) || prevState;

    setJobToChange(prevState => ({ ...prevState, jobId: value }));

    return selectedJob;
  });
};

  
  const onClickHandlerJobStatus = async () => {
    try {
      await updateJobWorkerMutation({jobId: jobToChange.jobId, workerId: jobToChange.workerId, updateJobWorkerDto: jobToChange.updateJobWorkerDto });
      refetch(); 
      setInProgressJobViews({
        language: '',
        numClasses: 0,
        price: 0,
        status: '',
        subject: '',
      });
      Swal.fire("Job status updated", "", "success")

    } catch (error) {
      console.error(error);
    }
  }

  const onChangeStatusJobIdFinished = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = event.target.value;
    setCompletedJobViews((prevState: JobViews) => {
      return jobsByWorker.completed?.find((object: any) => object._id === value) || prevState;
    });
  };

    
  /////////////////////////////////////////////////
  const [InProgressJobViews, setInProgressJobViews] = useState<JobViews>({
    language: '',
    numClasses: 0,
    price: 0,
    status: '',
    subject: '',
  });
  const [completedJobViews, setCompletedJobViews] = useState<JobViews>({
    language: '',
    numClasses: 0,
    price: 0,
    status: '',
    subject: '',
  });


    return (
<div className={styles.div}>


<h1>Completed Jobs History</h1>
      <select name="" onChange={onChangeStatusJobIdFinished}>
        <option>Select</option>
        {jobsByWorker.completed?.map((job) => {
          return <option value={job._id} key={job._id}>{job.description}</option>;
        })}
      </select>
      <div>
        {completedJobViews && (
          <div className={styles.paneljobs}>
            <div >Language: {completedJobViews.language}</div>
            <div >NumClasses: {completedJobViews.numClasses}</div>
            <div >Price: {completedJobViews.price} USD each</div>
            <div >Status: {completedJobViews.status}</div>
            <div >Subject: {completedJobViews.subject}</div>
          </div>
        )}
      </div>
      <h1>In-Progress Jobs</h1>
      <select name="" onChange={onChangeStatusJobId}>
        <option>Select</option>
        {jobsByWorker.inProgress?.map((job) => {
          return <option value={job._id} key={job._id}>{job.description}</option>;
        })}
      </select>
      {InProgressJobViews && (
        <div className={styles.paneljobs}>
          <div>Language: {InProgressJobViews.language}</div>
          <div>NumClasses: {InProgressJobViews.numClasses}</div>
          <div >Price: {InProgressJobViews.price} USD each</div>
          <div >Status: {InProgressJobViews.status}</div>
          <div >Subject: {InProgressJobViews.subject}</div>
        </div>
      )}
      <button  onClick={onClickHandlerJobStatus}>Complete Job</button>
      <div className={styles.block}></div>
      </div>
    );
  }


  

