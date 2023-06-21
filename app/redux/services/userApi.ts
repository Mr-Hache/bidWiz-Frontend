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
  image: string;
  isDisabled: boolean;
  role: ["admin", "user"];
};

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnFocus: true, // when the window is refocused, refetch the data
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bidwiz-backend-production-db77.up.railway.app/",
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
    
    updateWizardStatus: builder.mutation<User, { _id: string }>({
      query: ({ _id }) => ({
        url: `users/${_id}/wizard`,
        method: "PATCH",
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
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useDisableUserMutation,
  useUpdateWizardStatusMutation,
  useGetWizardsQuery,
} = userApi;
