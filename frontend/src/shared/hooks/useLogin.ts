import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { PathsToNavigate } from 'app/constants/Paths';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'shared/api/auth/authApiSlice';
import { IDataToLogin } from 'shared/api/auth/types';
import { useAppDispatch } from 'shared/hooks/reduxHooks';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { isFetchBaseQueryError } from 'shared/lib/server/isFetchBaseQueryError';
import { setAuthTokens } from 'shared/store/slices/authSlice';

interface IUseLoginResponse {
    loginUser: (data: IDataToLogin) => void;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: FetchBaseQueryError | null;
}

export const useLogin = (withRedirect: boolean): IUseLoginResponse => {
    const [login, { error, isError, data, isLoading, isSuccess }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginUser = ({ username, password }: IDataToLogin): void => {
        doAsyncFunc(async () => {
            try {
                const response = await login({ username, password }).unwrap();
                dispatch(setAuthTokens(response));
                if (withRedirect) {
                    navigate(PathsToNavigate.MAIN);
                    document.location.reload();
                }
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
        isSuccess,
    };
};
