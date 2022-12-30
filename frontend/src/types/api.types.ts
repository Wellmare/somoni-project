export interface ILoginResponse {
    access: string;
    refresh: string;
}

export interface IDataToLogin {
    username: string;
    password: string;
}
