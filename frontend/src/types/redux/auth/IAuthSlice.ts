import { ITokens } from './ITokens';
import { IUserJWTDecodeResponse } from './IUserJWTDecodeResponse';

export interface IAuthSlice {
    isAuth: boolean;
    authTokens: ITokens | null;
    user: IUserJWTDecodeResponse | null;
}
