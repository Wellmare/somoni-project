import api from './api';

import { apiEndpoints } from '../constants/apiEndpoints';
import { IDataToLogin, IDataToRegister, ILoginResponse, IRegisterResponse } from '../types/login.types';

const loginApi = api.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation<ILoginResponse, IDataToLogin>({
            query: ({ username, password }) => ({
                url: apiEndpoints.login,
                method: 'POST',
                body: {
                    username,
                    password,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),

        registerUser: build.mutation<IRegisterResponse, IDataToRegister>({
            query: ({ username, password, password2, email }) => ({
                url: apiEndpoints.register,
                method: 'POST',
                body: {
                    username,
                    password,
                    password2,
                    email,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = loginApi;
