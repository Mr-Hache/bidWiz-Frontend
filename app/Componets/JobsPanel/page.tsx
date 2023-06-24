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
    updateJobReviewDto: "", //'In Progress' | 'Finished'
  });
  const [jobReview, setJobReview] = useState({
    jobId: "",
    clientId: "648e17f0c8489b5c103ee650",
    updateJobReviewDto: 1, //DEL 1 AL 5
  });

  // Acceder a los resultados de la consulta
  const { data: jobsByWorker, isLoading: isLoadingJobsByWorker, isError: isErrorJobsByWorker } = getJobsByWorkerQuery;
  const { data: jobsByClient, isLoading: isLoadingJobsByClient, isError: isErrorJobsByClient } = getJobsByClientQuery;

  console.log(jobsByWorker)
  console.log(jobsByClient)
  ////////////////////////////////////////////////////////////
  const onChangeReview = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: number = Number(event.target.value);
    setJobReview(() => ({
      ...jobReview,
      updateJobReviewDto: value ,
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
      // Realiza algo con la respuesta, como redirigir o mostrar un mensaje de éxito.
    } catch (error) {
      console.error(error);
      // Maneja el error aquí
    }
  }
  ////////////////////////////////////////////////////////////
    return (
      <div>
        WORK:
        <select>
          {jobsByWorker?.map((job)  => {return(<option>{job.description}</option>)}  )}
        </select>
        Work status:
        <select>
          <option>Select status</option>
          <option>In Progress</option>
          <option>Finished</option>
        </select>
        <button>Update Work</button>
        <br></br>
        CLIENT:
        <select name="" onChange={onChangeReviewJobId}>
          {jobsByClient?.map((job)  => {return(<option value={job._id}>{job.description}</option>)}  )}
        </select>
        Work status:
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



  // updateJobReview: builder.mutation<Job, { jobId: string; clientId: string; updateJobReviewDto: UpdateJobReviewDto }>({
  //   query: ({ jobId, clientId, updateJobReviewDto }) => ({
  //     url: `jobs/review/${jobId}/${clientId}`,
  //     method: "PATCH",
  //     body: updateJobReviewDto,
  //   }),
  // }),

