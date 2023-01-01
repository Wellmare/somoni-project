import { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import React, { FC, ReactNode, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { apiEndpoints } from '../constants/apiEndpoints';
import { AuthContext } from '../context/authContext';
import { baseAxiosInstance } from '../service/api';
import { IAuthContext, IDataToLogin, IDataToRegister, IUserJWTDecodeResponse, ITokens } from '../types/login.types';

interface props {
    children: ReactNode;
}

export const AuthProvider: FC<props> = ({ children }) => {
    const authTokensFromLocalStorage: null | string = localStorage.getItem('authTokens');
    const parsedAuthTokes: null | { access: string; refresh: string } =
        authTokensFromLocalStorage !== null ? JSON.parse(authTokensFromLocalStorage) : null;

    const [authTokens, setAuthTokens] = useState<ITokens | null>(parsedAuthTokes);

    const [user, setUser] = useState<IUserJWTDecodeResponse | null>(() =>
        parsedAuthTokes != null ? jwtDecode(parsedAuthTokes.access) : null,
    );
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    // const history = useHistory();

    const loginUser = async ({ username, password }: IDataToLogin): Promise<void> => {
        const response = await baseAxiosInstance.post<IDataToLogin, AxiosResponse<ITokens>>(
            apiEndpoints.login,
            {
                username,
                password,
            },
            {},
        );

        const data = response.data;

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        } else {
            alert('Something went wrong!');
        }
    };

    const registerUser = async ({ username, password, password2, email }: IDataToRegister): Promise<void> => {
        const response = await baseAxiosInstance.post(apiEndpoints.register, {
            username,
            password,
            password2,
            email,
        });
        if (response.status === 201) {
            navigate('/login');
        } else {
            alert('Something went wrong!');
        }
    };

    const logoutUser = (): void => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/');
    };

    const contextData: IAuthContext = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    };

    useEffect(() => {
        if (authTokens !== null) {
            setUser(jwtDecode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
