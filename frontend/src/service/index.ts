import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import { url } from '../constants/api';
import { apiEndpoints } from '../constants/apiEndpoints';
import { logout, setAuthTokens } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';
import { ITokens } from '../types/login.types';

const baseQuery = fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers, api) => {
        const tokens = (api.getState() as RootState).auth.authTokens;
        if (tokens === null) return headers;
        headers.set('Authorization', `Bearer ${tokens.access}`);
        return headers;
    },
});

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (!(api.getState() as RootState).auth.isAuth) return result;

    if (result.error != null && result.error.status === 401) {
        console.log('not auth');
        // try to get a new token
        console.log('try auth');
        const refreshResult = await baseQuery(
            {
                url: apiEndpoints.refreshToken,
                method: 'POST',
                body: {
                    refresh: (api.getState() as RootState).auth?.authTokens?.refresh,
                },
            },
            api,
            extraOptions,
        );
        if (refreshResult.data !== null) {
            // store the new token
            api.dispatch(setAuthTokens(refreshResult.data as ITokens));
            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
            console.log('set auth');
        } else {
            console.log('no data');
            api.dispatch(logout());
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Post'],
    endpoints: (builder) => ({}),
});
