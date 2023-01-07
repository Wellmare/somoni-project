import { apiSlice } from './index';

import { apiEndpoints } from '../constants/apiEndpoints';
import { IDataToLogin } from '../types/redux/auth/IDataTo';
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
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
