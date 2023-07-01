"use client"

import styles from "./WizardPanel.module.scss";
import { useGetJobsByWorkerQuery, useUpdateJobWorkerMutation, Job } from "@/app/redux/services/userApi";
import { useEffect, useState } from "react";
import {useAppSelector} from "../../redux/hooks"


interface JobViews {
  language: string;
  numClasses: number;
  price: number;
  status: string;
  subject: string;
}

export default function WizardPanel() {
  var [jobsByWorkerInProgress, setJobsByWorkerInProgress] = useState<Job[]>([]);
  var [jobsByWorkerFinished, setJobsByWorkerFinished] = useState<Job[]>([]);
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



const { data: unableJobsByWorker, isLoading: isLoadingJobsByWorker, isError: isErrorJobsByWorker } = getJobsByWorkerQuery;

const [jobsByWorker, setJobsByWorker] = useState<Job[]>([]);

useEffect( () => {
  fetchUserData(); 
  setJobToChange(() => ({
    ...jobToChange,
    workerId: userId ,
  }));
}, [userId]);

  useEffect(() => {
    if (unableJobsByWorker) {
      setJobsByWorker(unableJobsByWorker);
      divideJobsByStatus(jobsByWorker)
    }
  }, [unableJobsByWorker]);


  const onChangeStatusJobId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    
    const value: string = event.target.value;
    console.log(jobToChange)
    setJobToChange(() => ({
      ...jobToChange,
      jobId: value ,
    }));
    setJobsByWorkerFinished(Finished)
    setJobsByWorkerInProgress(InProgress)
    setInProgessJobViews((prevState: JobViews) => {
      return jobsByWorker?.find((objeto: any) => objeto._id === value) || prevState;
    });

  };
  
  const onClickHandlerJobStatus = async () => {

    try {

      await updateJobWorkerMutation({jobId: jobToChange.jobId, workerId: jobToChange.workerId, updateJobWorkerDto: jobToChange.updateJobWorkerDto });
      setJobsByWorkerFinished(Finished)
      setJobsByWorkerInProgress(InProgress)
    } catch (error) {
      console.error(error);
    }
    if (unableJobsByWorker) {setJobsByWorker(unableJobsByWorker);}
  }
  const onChangeStatusJobIdFinished = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = event.target.value;
    setCompletedJobViews((prevState: JobViews) => {
      return jobsByWorker?.find((objeto: any) => objeto._id === value) || prevState;
    });
  };


    
  /////////////////////////////////////////////////
  const [InProgessJobViews, setInProgessJobViews] = useState<JobViews>({
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
  function divideJobsByStatus(jobsByWorker: Job[]): {
    InProgress: Job[];
    Finished: Job[];
  } {
    const InProgress: Job[] = [];
    const Finished: Job[] = [];
  
    jobsByWorker.forEach((job) => {
      if (job.status === "Finished") {
        Finished.push(job);
      } else {
        InProgress.push(job);
      }
    });

    return {
      InProgress,
      Finished,
    };
    
  }
  const { Finished, InProgress } = divideJobsByStatus(jobsByWorker);
    return (
<div className={styles.div}>


      <h1>Completed Jobs as Worker</h1>
      <select  name="" onChange={onChangeStatusJobIdFinished}>
        <option>Select</option>
        {jobsByWorkerFinished?.map((job) => {
            return <option value={job._id} key={job._id}>{job.description}</option>;
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
      <h1>In Progress Jobs</h1>
      <select name="" onChange={onChangeStatusJobId}>
        <option>Select</option>
        {
        jobsByWorkerInProgress?.map((job) => {
            return <option value={job._id} key={job._id}>{job.description}</option>;

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
      <div className={styles.block}></div>
      </div>
    );
  }


  

