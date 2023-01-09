import { apiSlice } from './index';

import { apiEndpoints } from '../constants/apiEndpoints';
import { IDataToLogin, IDataToLogout } from '../types/redux/auth/IDataTo';
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
        }),
        register: builder.mutation<IRegisterResponse, FormData>({
            query: (formData) => ({
                url: apiEndpoints.register,
                method: 'POST',
                body: formData,
            }),
        }),
        logout: builder.mutation<undefined, IDataToLogout>({
            query: ({ refresh }) => ({
                url: apiEndpoints.logout,
                method: 'POST',
                body: { refresh },
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice;
