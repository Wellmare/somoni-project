import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import { url } from 'app/constants/api';
import { apiEndpoints } from 'app/constants/apiEndpoints';
import { Mutex } from 'async-mutex';
import { logout, setAuthTokens } from 'shared/store/slices/authSlice';
import { RootState } from 'shared/store/store';
import { ITokens } from 'shared/types/auth/ITokens';

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
    // const release = (): void => mutex.release();

    let result = await baseQuery(args, api, extraOptions);
    console.log('result >> ', JSON.stringify({ error: result.error, meta: result.meta }));
    const authTokens = (api.getState() as RootState).auth?.authTokens;
    console.log('authTokens >> ', JSON.stringify(authTokens));

    if (authTokens === null || authTokens.access === '' || authTokens.refresh === '') {
        console.log('auth tokens null');
        return result;
    }

    // console.log('isTokenExpired', isTokenExpired(authTokens.access));
    // const tokenIsExpired = isTokenExpired(authTokens.access);

    // if (!tokenIsExpired && result.error === undefined) {
    //     return result;
    // }

    let resultData: { code: string } | null = null;
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (result.error?.data != null && 'code' in result?.error?.data) {
            resultData = result.error.data as { code: string };
        }
    } catch (e) {
        console.log(e);
    }

    if (resultData?.code != null) {
        const code = resultData.code;
        if (code === 'user_not_found') {
            console.log('! user not found !');
            api.dispatch(logout());
            return result;
        }
        // console.log('code', code);
    }

    // console.log('mutex.isLocked', mutex.isLocked());

    if (result.error != null && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                console.log('TRY REFRESH FETCH');
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
                // const refreshResult = await axiosBQ.post<ITokens>(apiEndpoints.refreshToken, {
                //     refresh: authTokens.refresh,
                // });

                console.log(JSON.stringify(refreshResult));
                // if ('error' in refreshResult) {
                //     throw new Error('Fetch error');
                // }
                if (refreshResult.data !== null) {
                    // store the new token
                    // console.log(refreshResult);
                    const newTokens = refreshResult.data as ITokens;

                    if (newTokens === undefined || !('refresh' in newTokens) || !('access' in newTokens)) {
                        console.log('Tokens is undefined!');
                        return result;
                    }

                    // setAuthTokensToLocalStorage(newTokens);

                    api.dispatch(setAuthTokens(newTokens));
                    // retry the initial query

                    console.log('set auth');
                    // noinspection ES6RedundantAwait
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    console.log('no data');
                    console.log('logout state');
                    await api.dispatch(logout());
                }
            } catch (e) {
                console.log('refresh error', JSON.stringify(e));
                console.log('logout state');
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
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Post', 'Single Post', 'Comments', 'Profile', 'Auth'],
    endpoints: (builder) => ({}),
});