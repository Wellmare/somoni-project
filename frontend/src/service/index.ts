import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import { url } from '../constants/api';
import { apiEndpoints } from '../constants/apiEndpoints';
import { logout, setAuthTokens } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';
import { ITokens } from '../types/redux/auth/ITokens';

const baseQuery = fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers, api) => {
        const tokens = (api.getState() as RootState).auth.authTokens;
        if (tokens === null) return headers;
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
    console.log('result', JSON.stringify(result));

    // if (!(api.getState() as RootState).auth.isAuth) {
    //     console.log('already auth');
    //     return result;
    // }

    if (result.error != null && result.error.status === 401) {
        console.log('not auth');
        // try to get a new token
        try {
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
            console.log('refreshResult', JSON.stringify(refreshResult));
            if ('error' in refreshResult) {
                throw new Error('refresh error');
            }
            if (refreshResult.data !== null) {
                // store the new token
                console.log('set auth tokens');
                api.dispatch(setAuthTokens(refreshResult.data as ITokens));
                // retry the initial query
                result = await baseQuery(args, api, extraOptions);
                // console.log('set auth');
            } else {
                console.log('no data');
                api.dispatch(logout());
            }
        } catch (e) {
            console.log('catch error', e);
            api.dispatch(logout());
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Post', 'Single Post', 'Comments', 'Profile', 'Auth'],
    endpoints: (builder) => ({}),
});
