// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//
// import { apiEndpoints } from '../constants/apiEndpoints';
//
// const serverUrl = 'https://jsonplaceholder.typicode.com';
//
// export const api = createApi({
//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({
//         baseUrl: serverUrl,
//     }),
//     endpoints: (builder) => ({
//         getIsLogin: builder.query<{ test: string }, undefined>({
//             query: () => apiEndpoints.getJWTToken,
//         }),
//     }),
// });
//
// export const { useGetIsLoginQuery } = api;
// export default api;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

import { url } from '../constants/api';
import { apiEndpoints } from '../constants/apiEndpoints';
import { IDataToLogin, ILoginResponse } from '../types/api.types';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<ILoginResponse, IDataToLogin>({
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
    }),
});

export const { useLoginUserMutation } = api;
export default api;
