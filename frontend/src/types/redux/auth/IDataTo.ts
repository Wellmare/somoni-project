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

export interface IDataToLogout {
    refresh: string;
}

export interface IDataToChangePassword {
    refresh: string;
    password: string;
    password2: string;
    oldPassword: string;
}
