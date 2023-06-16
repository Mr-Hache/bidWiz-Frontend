import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  _id: string;
  username: string;
  name: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
  isWizard: boolean;
  languages: [
    "English",
    "Spanish",
    "Portuguese",
    "German",
    "French",
    "Chinese",
    "Japanese",
    "Russian",
    "Italian"
  ];
  subjects: [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Economics",
    "Business Administration",
    "Accounting",
    "Computer Science",
    "Music Theory",
    "Political Science",
    "Law",
    "Programming"
  ];
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
    getUserByUsername: builder.query<User, { username: string }>({
      query: ({ username }) => `users/${username}`,
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: `users`,
        method: "POST",
        body: newUser,
      }),
    }),
    disableUser: builder.mutation<void, { username: string }>({
      query: ({ username }) => ({
        url: `users/${username}`,
        method: "DELETE",
      }),
    }),
    updateUserPassword: builder.mutation<
      User,
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: `users/${username}/password`,
        method: "PATCH",
        body: { password },
      }),
    }),
    updateWizardStatus: builder.mutation<User, { username: string }>({
      query: ({ username }) => ({
        url: `users/${username}/wizard`,
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
      query: ({ subjects, languages, page = 1, limit = 3 }) => {
        let url = `users/wizards?page=${page}&limit=${limit}`;

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
  useGetUserByUsernameQuery,
  useCreateUserMutation,
  useDisableUserMutation,
  useUpdateUserPasswordMutation,
  useUpdateWizardStatusMutation,
  useGetWizardsQuery,
} = userApi;
