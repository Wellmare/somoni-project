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

export interface IUserJWTDecodeResponse {
    email: string;
    exp: number;
    iat: number;
    jti: string;
    token_type: string;
    user_id: number;
    username: string;
}
