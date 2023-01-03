import React from 'react';

export interface ILoginResponse {
    access: string;
    refresh: string;
}

export interface IDataToLogin {
    username: string;
    password: string;
}

export interface IDataToRegister {
    username: string;
    email: string;
    password: string;
    password2: string;
}
export interface IRegisterResponse {
    username: string;
    email: string;
}

export interface ITokens {
    access: string;
    refresh: string;
}

export interface IAuthContext {
    user: IUserJWTDecodeResponse | null;
    setUser: React.Dispatch<React.SetStateAction<IUserJWTDecodeResponse | null>>;
    authTokens: ITokens | null;
    setAuthTokens: React.Dispatch<React.SetStateAction<ITokens | null>>;
    registerUser: ({ username, password, password2, email }: IDataToRegister) => Promise<void>;
    loginUser: ({ username, password }: IDataToLogin) => Promise<void>;
    logoutUser: () => void;
    loading: boolean;
    errorCode: number;
    errorMessage: string;
}

export interface IUserJWTDecodeResponse {
    email: string;
    exp: number;
    iat: number;
    jti: string;
    token_type: string;
    user_id: number;
    username: string;
}

// export interface IErrorResponse {
//     code: number;
// }
export interface IError {
    errorCode: number | null;
    errorMessage: string | null;
}
