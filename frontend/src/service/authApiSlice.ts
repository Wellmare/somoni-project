import { apiSlice } from './index';

import { apiEndpoints } from '../constants/apiEndpoints';
import { IDataToLogin, IDataToRegister } from '../types/redux/auth/IDataTo';
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
        register: builder.mutation<IRegisterResponse, IDataToRegister>({
            query: ({ username, password, password2, email }) => ({
                url: apiEndpoints.register,
                method: 'POST',
                body: { username, password, password2, email },
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
