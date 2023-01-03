import axios, { AxiosInstance } from 'axios';

import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import { useContext } from 'react';

import { url } from '../constants/api';
import { AuthContext } from '../context/authContext';
import { baseAxiosInstance } from '../service/api';
import { loginApi } from '../service/login.api';
import { IUserJWTDecodeResponse } from '../types/login.types';

export const useWithAuth = (): [boolean, AxiosInstance] => {
    const context = useContext(AuthContext);
    if (AuthContext === null || context === null || context.authTokens === null) return [false, baseAxiosInstance];
    const { setUser, authTokens, setAuthTokens } = context;

    const axiosInstance = axios.create({
        baseURL: url,
        headers: { Authorization: `Bearer ${authTokens?.access}`, 'Content-type': 'application/json' },
    });

    axiosInstance.interceptors.request.use(
        async (req) => {
            const user: IUserJWTDecodeResponse = jwtDecode(authTokens.access);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

            if (!isExpired) return req;
            try {
                const response = await loginApi.refreshToken(authTokens?.refresh);
                localStorage.setItem('authTokens', JSON.stringify(response.data));

                setAuthTokens(response.data);
                setUser(jwtDecode(response.data.access));

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                req.headers.Authorization = `Bearer ${response.data.access}`;
            } catch (e) {
                console.log(e);
            }
            return req;
        },
        (error) => {
            console.log(error);
        },
    );

    return [true, axiosInstance];
};

export default useWithAuth;
