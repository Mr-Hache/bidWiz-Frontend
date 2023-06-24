import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type User = {
  _id: string;
  name: string;
  uidFireBase: string;
  email: string;
  isWizard: boolean;
  languages: string [];
  subjects:  string [];
  experience: {
    title: string;
    origin: string;
    expJobs: number;
  };
  pricePerOne: number;
  pricePerTwo: number;
  pricePerThree: number;
  aboutMe: string;
  image: string;
  reviews: number;
  isDisabled: boolean;
  role: ["admin", "user"];
};

export type Job = {
  _id: string;
  status: string;
  description: string;
  price: number;
  numClasses: number;
  clientId: string;
  workerId: string;
  language: string;
  subject: string;
  result: string;
}

export type UpdateUserWizardDto = {
  isWizard?: boolean;
  languages?: string[];
  subjects?: string[];
  experience?: {
    title?: string;
    origin?: string;
  };
  image?: string;
  aboutMe?: string;
  pricePerOne?: number;
  pricePerTwo?: number;
  pricePerThree?: number;
};

export type JobStatus = 'In Progress' | 'Finished'

export type UpdateJobWorkerDto = {
  status: JobStatus;
};

export type UpdateJobReviewDto = {
  rating: number;
};

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnFocus: true, // when the window is refocused, refetch the data
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bidwiz-backend-production-db77.up.railway.app",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], null>({
      query: () => "users",
    }),
    getUserById: builder.query<User, { _id: string }>({
      query: ({ _id }) => `users/wizard/${_id}`,
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: `users`,
        method: "POST",
        body: newUser,
      }),
    }),
    disableUser: builder.mutation<void, { _id: string }>({
      query: ({ _id }) => ({
        url: `users/${_id}`,
        method: "DELETE",
      }),
    }),
    
    updateWizardStatus: builder.mutation<User, { _id: string; updateUserWizardDto: UpdateUserWizardDto }>({
      query: ({ _id, updateUserWizardDto }) => ({
        url: `users/${_id}/wizard`,
        method: "PATCH",
        body: updateUserWizardDto,
      }),
    }),
    getWizards: builder.query<
      User[],
      {
        subjects?: string[];
        languages?: string[];
        page?: number;
        limit?: number;
      }
    >({
      query: ({ subjects, languages, page = 1, limit =  9 }) => {
        let url = `users/wizards?page=${page}&size=${limit}`;

        if (subjects) {
          url += `&subjects=${subjects}`;
        }

        if (languages) {
          url += `&languages=${languages}`;
        }

        return url;
      },
    }),
    createJob: builder.mutation<Job, Partial<Job>>({
      query: (newJob) => ({
        url: `jobs`,
        method: "POST",
        body: newJob,
      }),
    }),
    updateJobWorker: builder.mutation<Job, { jobId: string; workerId: string; updateJobWorkerDto: UpdateJobWorkerDto }>({
      query: ({ jobId, workerId, updateJobWorkerDto }) => ({
        url: `jobs/finish/${jobId}/${workerId}`,
        method: "PATCH",
        body: updateJobWorkerDto,
      }),
    }),

    updateJobReview: builder.mutation<Job, { jobId: string; clientId: string; updateJobReviewDto: UpdateJobReviewDto }>({
      query: ({ jobId, clientId, updateJobReviewDto }) => ({
        url: `jobs/review/${jobId}/${clientId}`,
        method: "PATCH",
        body: updateJobReviewDto,
      }),
    }),

    getJobsByWorker: builder.query<Job[], { workerId: string }>({
      query: ({ workerId }) => `jobs/worker/${workerId}`,
    }),

    getJobsByClient: builder.query<Job[], { clientId: string }>({
      query: ({ clientId }) => `jobs/client/${clientId}`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useDisableUserMutation,
  useUpdateWizardStatusMutation,
  useGetWizardsQuery,
  useCreateJobMutation,
  useGetJobsByWorkerQuery,
  useGetJobsByClientQuery,
  useUpdateJobWorkerMutation,
  useUpdateJobReviewMutation,
} = userApi;
