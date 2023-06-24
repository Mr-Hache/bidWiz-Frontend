"use client"

import { useGetJobsByWorkerQuery, useGetJobsByClientQuery, useUpdateJobWorkerMutation, useUpdateJobReviewMutation } from "@/app/redux/services/userApi";
import { useState } from "react";

interface JobReview {
  jobId: string;
  clientId: string;
  updateJobReviewDto: number; // Actualizado a number | null
}

export default function JobsPanel() {

  
  const clientId = "648e17f0c8489b5c103ee650"
  const workerId = "648e1817c8489b5c103ee67a"

  const getJobsByWorkerQuery = useGetJobsByWorkerQuery({ workerId });

  const getJobsByClientQuery = useGetJobsByClientQuery({ clientId });

  const [updateJobWorkerMutation] = useUpdateJobWorkerMutation();

  const [updateJobReviewMutation] = useUpdateJobReviewMutation();

  const [jobToChange, setJobToChange] = useState({
    jobId: "",
    workerId: "648e1817c8489b5c103ee67a",
    updateJobWorkerDto: {status: 'Finished'}, //'In Progress' | 'Finished'
  });
  const [jobReview, setJobReview] = useState({
    jobId: "",
    clientId: "648e17f0c8489b5c103ee650",
    updateJobReviewDto: {rating: 1}, //DEL 1 AL 5
  });

  // Acceder a los resultados de la consulta
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
  };
  const onClickHandlerJobStatus = async () => {
    console.log(jobToChange)
    try {
      await updateJobWorkerMutation({jobId: jobToChange.jobId, workerId: jobToChange.workerId, updateJobWorkerDto: jobToChange.updateJobWorkerDto });
    } catch (error) {
      console.error(error);
    }
  }
    return (
      <div>
        WORKER/// WORK IN PROGRESS:
        <select name="" onChange={onChangeStatusJobId}>
          {jobsByWorker?.map((job)  => {if (job.status ==='In Progress') {return(<option value={job._id}>{job.description}</option>)}}  )}
        </select>
        <button onClick={onClickHandlerJobStatus}>Complete Job</button>
        <select name="">
          {jobsByWorker?.map((job)  => {if (job.status ==="Finished") {return(<option value={job._id}>{job.description}</option>)}}  )}
        </select>
        <br></br>
        CLIENT/// jobs in progress:
        <select name="">
          {jobsByClient?.map((job)  => {if (job.status ==='In Progress') {return(<option value={job._id}>{job.description}</option>)}}  )}
        </select>
        <br></br>
        CLIENT/// jobs to review:
        <select name="" onChange={onChangeReviewJobId}>
          {jobsByClient?.map((job)  => {if (job.status ==="Finished") {return(<option value={job._id}>{job.description}</option>)}}  )}
        </select>
        CLIENT/// Work Rating:
        <select name="" onChange={onChangeReview}>
        <option value="1">Select Points</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
        <button onClick={onClickHandlerReview}>give review</button>
      </div>
    );
  }



