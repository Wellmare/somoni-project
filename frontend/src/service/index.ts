import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import { url } from '../constants/api';
import { apiEndpoints } from '../constants/apiEndpoints';
import { logout, setAuthTokens } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';
import { ITokens } from '../types/redux/auth/ITokens';
import { isTokenExpired } from '../utils/isTokenExpired';

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
    const result = await baseQuery(args, api, extraOptions);
    const authTokens = (api.getState() as RootState).auth?.authTokens;

    console.log('authTokens', authTokens);

    if (authTokens === null) return result;

    if (!isTokenExpired(authTokens.access)) {
        return result;
    }

    // const isAuth = (api.getState() as RootState).auth.isAuth;
    // const authTokens = getAuthTokensFromLocalStorage();

    // console.log('isAuth', isAuth);
    // console.log('authTokens from state', authTokens);
    //
    // if (!isAuth) return result;

    // if (result.error != null && result.error.status === 401 && authTokens !== null && authTokens.refresh !== '') {
    //     // console.log('not auth');
    //     // try to get a new token
    //     console.log('try auth');
    const refreshResult = await baseQuery(
        {
            url: apiEndpoints.refreshToken,
            method: 'POST',
            body: {
                refresh: authTokens.refresh,
            },
        },
        api,
        extraOptions,
    );
    if (refreshResult.data !== null) {
        // store the new token
        console.log(refreshResult);
        const newTokens = refreshResult.data as ITokens;

        if (newTokens === undefined || !('refresh' in newTokens) || !('access' in newTokens)) {
            console.log('Tokens is undefined!');
            return result;
        }

        // setAuthTokensToLocalStorage(newTokens);

        api.dispatch(setAuthTokens(refreshResult.data as ITokens));
        // retry the initial query

        console.log('set auth');
        // noinspection ES6RedundantAwait
        return await baseQuery(args, api, extraOptions);
    } else {
        console.log('no data');
        api.dispatch(logout());
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Post', 'Single Post', 'Comments', 'Profile', 'Auth'],
    endpoints: (builder) => ({}),
});
