import axios, { AxiosInstance } from 'axios';

import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from './reduxHooks';

import { url } from '../constants/api';
import { setAuthTokens } from '../redux/slices/authSlice';
import { baseAxiosInstance } from '../service/api';
import { loginApi } from '../service/login.api';
// import { IUserJWTDecodeResponse } from '../types/login.types';

export const useWithAuth = (): [boolean, AxiosInstance] => {
    const dispatch = useAppDispatch();
    const { isAuth, authTokens, user } = useAppSelector((state) => state.auth);

    if (!isAuth || authTokens === null || user == null) return [false, baseAxiosInstance];

    const axiosInstance = axios.create({
        baseURL: url,
        headers: { Authorization: `Bearer ${authTokens.access}`, 'Content-type': 'application/json' },
    });

    axiosInstance.interceptors.request.use(async (req) => {
        // const user: IUserJWTDecodeResponse = jwtDecode(authTokens.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if (!isExpired) return req;

        try {
            const response = await loginApi.refreshToken(authTokens.refresh);
            dispatch(setAuthTokens(response.data));

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            req.headers.Authorization = `Bearer ${response.data.access}`;
        } catch (e) {
            console.log(e);
        }
        return req;
    });

    return [true, axiosInstance];
};

export default useWithAuth;
