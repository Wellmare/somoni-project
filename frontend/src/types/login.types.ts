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
