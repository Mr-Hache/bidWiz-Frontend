import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  id: number;
  username: string;
  name: string;
  lastName: string;
  email: string;
  // ... cualquier otro campo que pertenezca al tipo de usuario
};

type Wizard = {
  // define el tipo de objeto Wizard aquí
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
    getWizards: builder.query<Wizard[], null>({
      query: () => "users/wizards",
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
