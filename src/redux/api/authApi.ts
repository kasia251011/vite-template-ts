import { ActivateAccountSchema, LoginSchema } from "@/types/user";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ accessToken: string }, LoginSchema>({
      query: (data) => ({
        method: "POST",
        url: "/auth/login",
        body: data,
      }),
      invalidatesTags: ["me"],
    }),
    activateAccount: builder.mutation<
      { accessToken: string },
      ActivateAccountSchema
    >({
      query: (data) => ({
        method: "PUT",
        url: "/auth/profile/activate",
        body: data,
      }),
      invalidatesTags: ["me"],
    }),
  }),
});

export const { useLoginMutation, useActivateAccountMutation } = authApi;
