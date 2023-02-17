import jwtDecode, { JwtPayload } from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded === null || decoded.exp === undefined) return true;

    const now = new Date();
    return now.getTime() > decoded.exp * 1000;
};
