import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { useRegisterMutation } from '../service/authApiSlice';
import { doAsyncFunc } from '../utils/doAsyncFunc';
import { isFetchBaseQueryError } from '../utils/isFetchBaseQueryError';

interface IUseRegisterResponse {
    registerUser: (formData: FormData) => void;
    isError: boolean;
    error: FetchBaseQueryError | null;
    isLoading: boolean;
    isSuccess: boolean;
}

export const useRegister = (): IUseRegisterResponse => {
    const [register, { error, isError, data, isSuccess, isLoading }] = useRegisterMutation();

    const registerUser = (formData: FormData): void => {
        doAsyncFunc(async () => {
            try {
                const res = await register(formData).unwrap();
                // console.log(res);
                // TODO SET AUTH TOKENS
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
