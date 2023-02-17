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

export interface IDataToRestorePassword {
    email: string;
}

export interface IDataToConfirmRestorePassword {
    token: string;
    password: string;
    password2: string;
}
export interface IDataToConfirmEmail {
    token1: string;
    token2: string;
}
