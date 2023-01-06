export interface IUserJWTDecodeResponse {
    email: string;
    exp: number;
    iat: number;
    jti: string;
    token_type: string;
    user_id: number;
    username: string;
}
