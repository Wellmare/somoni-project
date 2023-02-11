import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import { Mutex } from 'async-mutex';

import { url } from '../constants/api';
import { apiEndpoints } from '../constants/apiEndpoints';
import { logout, setAuthTokens } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';
import { ITokens } from '../types/redux/auth/ITokens';
import { isTokenExpired } from '../utils/isTokenExpired';

// create a new mutex
const mutex = new Mutex();

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
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);
    const authTokens = (api.getState() as RootState).auth?.authTokens;

    // console.log('authTokens', authTokens);

    if (authTokens === null) return result;

    if (!isTokenExpired(authTokens.access)) {
        return result;
    }

    if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
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
                // console.log(refreshResult);
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
                await api.dispatch(logout());
            }
        } catch (e) {
            console.log(e);
            api.dispatch(logout());
        } finally {
            // release must be called once the mutex should be released again.
            release();
        }
    } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Post', 'Single Post', 'Comments', 'Profile', 'Auth'],
    endpoints: (builder) => ({}),
});
