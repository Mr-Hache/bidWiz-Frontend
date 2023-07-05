"use client"

import styles from "./userPanel.module.scss";
import { useGetJobsByClientQuery, useUpdateJobReviewMutation, Job, useGetUserByIdQuery } from "@/app/redux/services/userApi";
import { useEffect, useState, useRef } from "react";
import {useAppSelector} from "../../redux/hooks"
import emailjs from 'emailjs-com';
import Swal from "sweetalert2";


interface JobReview {
  jobId: string;
  clientId: string;
  updateJobReviewDto: {
    rating: number;
  };
}
interface JobViews {
  language: string;
  numClasses: number;
  price: number;
  status: string;
  subject: string;
}

export default function UserPanel() {
  const [jobReview, setJobReview] = useState<JobReview>({
    jobId: "",
    clientId: "",
    updateJobReviewDto: {rating: 0},
  });

  const localUid = useAppSelector((state) => state.userAuth.uid)
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedWizard, setSelectedWizard] = useState('');
 

const getJobsByClientQuery = useGetJobsByClientQuery({ clientId:userId });

const [updateJobReviewMutation, {isSuccess: isUpdateReviewSuccess, isError: isUpdateReviewError}] = useUpdateJobReviewMutation();

const { data: unableJobsByClient, isLoading: isLoadingJobsByClient, isError: isErrorJobsByClient, refetch } = useGetJobsByClientQuery({ clientId: userId });

const jobReviewRef = useRef<HTMLSelectElement>(null);
const reviewValueRef = useRef<HTMLSelectElement>(null);

const [jobsByClient, setJobsByClient] = useState<Job[]>([]);

function sendEmail(templateParams: {message: string, to_email: string | undefined}) {      
  emailjs.send("service_09m33gr","template_zdim09n", templateParams, 'UGYQRFU0vkqoRXNx0')
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (error) => {
      console.error('FAILED...', error);
    });
}

const [isUserLoading, setIsUserLoading] = useState(true);

const fetchUserData = async () => {
  setIsUserLoading(true);
  await fetch(`https://bidwiz-backend-production-db77.up.railway.app/users/user/${localUid}`)
    .then(response => response.json())
    .then(data => {
      setUserId(data._id);
      setUserName(data.name);
      setIsUserLoading(false);
    })
    .catch(error => {
      console.error(error);
      setIsUserLoading(false);
    });
}

useEffect( () => {
  fetchUserData();
}, [localUid]); 


useEffect( () => {
  if (isUserLoading) {
    return;
  }

  setJobReview(() => ({
    ...jobReview,
    clientId: userId,
  }));
}, [userId, isUserLoading]);

  ////////////////////////////////////////////////////////////
  const onChangeReview = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: number = Number(event.target.value);
    setJobReview((currentJobReview) => ({
      ...currentJobReview,
      updateJobReviewDto: {rating:value},
    }));
  };



  const onChangeReviewJobId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = event.target.value;
    setJobReview((currentJobReview) => ({
      ...currentJobReview,
      jobId: value ,
    }));
  
    setClientInReviewViews((prevState: JobViews) => {
      return jobsByClient?.find((objeto: any) => objeto._id === value) || prevState;
    });
  };
  

  useEffect(() => {
    const selectedJob = jobsByClient?.find(job => job._id === jobReview.jobId) as any;
    if (selectedJob) {
      setSelectedWizard(selectedJob.worker);
    }
  }, [jobReview.jobId, jobsByClient]);
  
  const { data: wizardDetails, isLoading: isWizardDetailsLoading, isError: isWizardDetailsError } = useGetUserByIdQuery({_id: selectedWizard});


  const onClickHandlerReview = async () => {
    console.log(jobReview)
    try {
      if(jobReview.updateJobReviewDto.rating === 0 || jobReview.jobId === '') {
        Swal.fire("Please select a class and review", "", "error");
        return;
      }
      // let templateParams = {
      //   message: `${userName} has rated your ${clientInReviewViews.subject} class in ${clientInReviewViews.language} just got a ${jobReview.updateJobReviewDto.rating} rating.`,
      //   to_email: wizardDetails?.email,
      // };
      await updateJobReviewMutation({jobId: jobReview.jobId, clientId: jobReview.clientId, updateJobReviewDto: jobReview.updateJobReviewDto });
      if (wizardDetails && wizardDetails.email) {
        // sendEmail(templateParams)
      }
    } catch (error) {
      Swal.fire("Error updating review", "", "error");
      console.error(error);
    }
  }
  useEffect(() => {
    if (unableJobsByClient) {
      setJobsByClient(unableJobsByClient);
    }
  }, [unableJobsByClient]);

  useEffect(() => {
    if (isUpdateReviewSuccess) {
      Swal.fire("Updated review", "", "success");
      refetch();
      setJobReview({
        jobId: "",
        clientId: "",
        updateJobReviewDto: {rating: 0}, 
      });
      setClientInReviewViews({
        language: '',
        numClasses: 0,
        price: 0,
        status: '',
        subject: '',
      });
      if (jobReviewRef.current && reviewValueRef.current) {
        jobReviewRef.current.value = '';
        reviewValueRef.current.value = '0';
      }
    }
  }, [isUpdateReviewSuccess]);
  

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
  <select ref={jobReviewRef} name="" onChange={onChangeReviewJobId}>
    <option>Select</option>
    {jobsByClient?.map((job) => {
      if (job.status === "Finished" && !job.rating) {
        return <option value={job._id} key={job._id}>{job.description}</option>;
      }
    })}
  </select>
  </div>
  <select ref={reviewValueRef} name="" onChange={onChangeReview} className={styles.reviewNumber}>
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
  <button onClick={onClickHandlerReview} disabled={jobReview.updateJobReviewDto.rating === 0 || jobReview.jobId === ''}>Give Review</button>
  <div className={styles.block}></div>
</div>


    );
  }


  
