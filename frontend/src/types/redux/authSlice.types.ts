import { ITokens, IUserJWTDecodeResponse } from '../login.types';

export interface IAuthSlice {
    isAuth: boolean;
    authTokens: ITokens | null;
    user: IUserJWTDecodeResponse | null;
}
