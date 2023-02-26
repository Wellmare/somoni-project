import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { useRegisterMutation } from 'shared/api/auth/authApiSlice';
import { IDataToLogin } from 'shared/api/auth/types';
import { useLogin } from 'shared/hooks/useLogin';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { isFetchBaseQueryError } from 'shared/lib/server/isFetchBaseQueryError';

interface IUseRegisterResponse {
    registerUser: (formData: FormData, loginData: IDataToLogin) => void;
    isError: boolean;
    error: FetchBaseQueryError | null;
    isLoading: boolean;
    isSuccess: boolean;
}

export const useRegister = (): IUseRegisterResponse => {
    const [register, { error, isError, data, isSuccess, isLoading }] = useRegisterMutation();
    const { loginUser } = useLogin(false);

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
