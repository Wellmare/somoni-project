import { apiSlice } from './index';

import { apiEndpoints } from '../constants/apiEndpoints';
import { IDataToLogin, IDataToLogout, IDataToChangePassword } from '../types/redux/auth/IDataTo';
import { ILoginResponse } from '../types/redux/auth/ILoginResponse';
import { IRegisterResponse } from '../types/redux/auth/IRegisterResponse';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, IDataToLogin>({
            query: ({ username, password }) => ({
                url: apiEndpoints.login,
                method: 'POST',
                body: {
                    username,
                    password,
                },
            }),
            invalidatesTags: ['Auth'],
        }),
        register: builder.mutation<IRegisterResponse, FormData>({
            query: (formData) => ({
                url: apiEndpoints.register,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Auth'],
        }),
        logout: builder.mutation<undefined, IDataToLogout>({
            query: ({ refresh }) => ({
                url: apiEndpoints.logout,
                method: 'POST',
                body: { refresh },
            }),
            invalidatesTags: ['Auth'],
        }),
        changePassword: builder.mutation<undefined, IDataToChangePassword>({
            query: ({ refresh, password, password2, oldPassword }) => ({
                url: apiEndpoints.changePassword,
                method: 'PUT',
                body: { refresh, password, password2, old_password: oldPassword },
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useChangePasswordMutation } = authApiSlice;
