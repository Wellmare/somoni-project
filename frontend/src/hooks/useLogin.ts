import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from './reduxHooks';

import { setAuthTokens } from '../redux/slices/authSlice';
import { useLoginMutation } from '../service/authApiSlice';
import { PathsToNavigate } from '../types/Paths';
import { IDataToLogin } from '../types/redux/auth/IDataTo';
import { doAsyncFunc } from '../utils/doAsyncFunc';
import { isFetchBaseQueryError } from '../utils/isFetchBaseQueryError';

interface IUseLoginResponse {
    loginUser: (data: IDataToLogin) => void;
    isLoading: boolean;
    isError: boolean;
    error: FetchBaseQueryError | null;
}

export const useLogin = (): IUseLoginResponse => {
    const [login, { error, isError, data, isLoading, isSuccess }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginUser = ({ username, password }: IDataToLogin): void => {
        doAsyncFunc(async () => {
            try {
                const response = await login({ username, password }).unwrap();
                dispatch(setAuthTokens(response));
                navigate(PathsToNavigate.MAIN);
            } catch (e) {
                console.log(e);
            }
        });
    };

    return {
        loginUser,
        isLoading,
        isError,
        error: isFetchBaseQueryError(error) ? error : null,
    };
};
