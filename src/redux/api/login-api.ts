import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginService = createApi({
  reducerPath: "loginService",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    login: build.mutation<LoginApi.ResponseLogin, LoginApi.PayloadLogin>({
      query: (payload) => ({
        url: "posts",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginService;
