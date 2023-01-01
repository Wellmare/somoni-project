// import api from './api';
//
// import { apiEndpoints } from '../constants/apiEndpoints';
// import { IDataToLogin, IDataToRegister, ILoginResponse, IRegisterResponse } from '../types/login.types';
//
// const loginApi = api.injectEndpoints({
//     endpoints: (build) => ({
//         loginUser: build.mutation<ILoginResponse, IDataToLogin>({
//             query: ({ username, password }) => ({
//                 url: apiEndpoints.login,
//                 method: 'POST',
//                 body: {
//                     username,
//                     password,
//                 },
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }),
//         }),
//
//         registerUser: build.mutation<IRegisterResponse, IDataToRegister>({
//             query: ({ username, password, password2, email }) => ({
//                 url: apiEndpoints.register,
//                 method: 'POST',
//                 body: {
//                     username,
//                     password,
//                     password2,
//                     email,
//                 },
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }),
//         }),
//     }),
// });
//
// export const { useLoginUserMutation, useRegisterUserMutation } = loginA

import { AxiosResponse } from 'axios';

import { baseAxiosInstance } from './api';

import { apiEndpoints } from '../constants/apiEndpoints';
import { IDataToLogin, IDataToRegister, ILoginResponse, IRegisterResponse, ITokens } from '../types/login.types';

// const axiosInstance = axios.create({
//     url,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

const loginUser = async ({ username, password }: IDataToLogin): Promise<AxiosResponse<ILoginResponse>> => {
    return await baseAxiosInstance.post<IDataToLogin, AxiosResponse<ITokens>>(
        apiEndpoints.login,
        {
            username,
            password,
        },
        {},
    );
};
const registerUser = async ({
    username,
    password,
    password2,
    email,
}: IDataToRegister): Promise<AxiosResponse<IRegisterResponse>> => {
    return await baseAxiosInstance.post(apiEndpoints.register, {
        username,
        password,
        password2,
        email,
    });
};

export const loginApi = {
    login: loginUser,
    register: registerUser,
};
