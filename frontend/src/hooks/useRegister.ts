import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { useLogin } from './useLogin';

import { useRegisterMutation } from '../service/authApiSlice';
import { IDataToLogin } from '../types/redux/auth/IDataTo';
import { doAsyncFunc } from '../utils/doAsyncFunc';
import { isFetchBaseQueryError } from '../utils/isFetchBaseQueryError';

interface IUseRegisterResponse {
    registerUser: (formData: FormData, loginData: IDataToLogin) => void;
    isError: boolean;
    error: FetchBaseQueryError | null;
    isLoading: boolean;
    isSuccess: boolean;
}

export const useRegister = (): IUseRegisterResponse => {
    const [register, { error, isError, data, isSuccess, isLoading }] = useRegisterMutation();
    const { loginUser } = useLogin();

    const registerUser = (formData: FormData, loginData: IDataToLogin): void => {
        doAsyncFunc(async () => {
            try {
                const res = await register(formData).unwrap();
                await loginUser(loginData);
            } catch (e) {
                console.log(e);
            }
        });
    };

    return {
        registerUser,
        isError,
        isLoading,
        isSuccess,
        error: isFetchBaseQueryError(error) ? error : null,
    };
};
