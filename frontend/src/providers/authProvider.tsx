import { AxiosError } from 'axios';
import jwtDecode from 'jwt-decode';
import React, { FC, ReactNode, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/authContext';
import { loginApi } from '../service/login.api';
import { IAuthContext, IDataToLogin, IDataToRegister, IUserJWTDecodeResponse, ITokens } from '../types/login.types';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    // AUTH TOKENS -->
    const authTokensFromLocalStorage: null | string = localStorage.getItem('authTokens');
    const parsedAuthTokes: null | { access: string; refresh: string } =
        authTokensFromLocalStorage !== null ? JSON.parse(authTokensFromLocalStorage) : null;
    // <-- AUTH TOKENS

    // STATE -->
    const [authTokens, setAuthTokens] = useState<ITokens | null>(parsedAuthTokes);

    const [user, setUser] = useState<IUserJWTDecodeResponse | null>(() =>
        parsedAuthTokes != null ? jwtDecode(parsedAuthTokes.access) : null,
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [errorCode, setErrorCode] = useState<number>(200);
    const [errorMessage, setErrorMessage] = useState<string>('');
    // <-- STATE

    const navigate = useNavigate();

    // FUNCTIONS -->
    const loginUser = async ({ username, password }: IDataToLogin): Promise<void> => {
        // const response = await loginApi.login({
        //     username,
        //     password,
        // });
        // const data = response.data;
        //
        // if (response.status === 200) {
        //     setAuthTokens(data);
        //     setUser(jwtDecode(data.access));
        //     localStorage.setItem('authTokens', JSON.stringify(data));
        //     navigate('/');
        //     // return {
        //     //     access: response.data.access,
        //     //     refresh: response.data.refresh,
        //     // };
        // } else {
        //     setErrorCode(response.status);
        // }
        loginApi
            .login({
                username,
                password,
            })
            .then((response) => {
                if (response.status === 200) {
                    setAuthTokens(response.data);
                    setUser(jwtDecode(response.data.access));
                    localStorage.setItem('authTokens', JSON.stringify(response.data));
                    navigate('/');

                    console.log(response.data);
                    setErrorMessage('');
                    setErrorCode(200);
                }
            })
            .catch((e: AxiosError) => {
                console.warn(e);
                if (e.response != null) {
                    setErrorCode(e.response.status);
                    setErrorMessage(e.response.statusText);
                }
            });
    };

    const registerUser = async ({ username, password, password2, email }: IDataToRegister): Promise<void> => {
        // const response = await loginApi.register({
        //     username,
        //     password,
        //     password2,
        //     email,
        // });
        loginApi
            .register({
                username,
                password,
                password2,
                email,
            })
            .then((response) => {
                if (response.status === 201) {
                    navigate('/login');
                    setErrorMessage('');
                    setErrorCode(200);
                }
            })
            .catch((e: AxiosError) => {
                console.warn(e);
                if (e.response != null) {
                    setErrorCode(e.response.status);
                    setErrorMessage(e.response.statusText);
                }
            });

        // console.log('reg');
        // if (response.status === 201) {
        //     navigate('/login');
        //     // return { username: response.data.username, email: response.data.email };
        // } else {
        //     // return {
        //     //     code: response.status,
        //     // };
        //     setErrorCode(response.status);
        // }
    };

    const logoutUser = (): void => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/');
    };
    // <-- FUNCTIONS

    const contextData: IAuthContext = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        loading,
        errorCode,
        errorMessage,
    };

    useEffect(() => {
        if (authTokens !== null) {
            setUser(jwtDecode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
