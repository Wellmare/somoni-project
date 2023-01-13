import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import jwtDecode from 'jwt-decode';

import { IAuthSlice } from '../../types/redux/auth/IAuthSlice';
import { ITokens } from '../../types/redux/auth/ITokens';
import { IUserJWTDecodeResponse } from '../../types/redux/auth/IUserJWTDecodeResponse';
import {
    getAuthTokensFromLocalStorage,
    removeAuthTokensFromLocalStorage,
    setAuthTokensToLocalStorage,
} from '../../utils/authTokensLocalStorage';
import { RootState } from '../store';

const tokensFromLS = getAuthTokensFromLocalStorage();

const initialState: IAuthSlice = {
    isAuth: !(tokensFromLS?.access == null),
    user: tokensFromLS !== null ? jwtDecode(tokensFromLS.access) : null,
    authTokens: tokensFromLS,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthTokens: (state, action: PayloadAction<ITokens>) => {
            state.authTokens = action.payload;
            state.isAuth = true;
            state.user = jwtDecode(action.payload.access);
            setAuthTokensToLocalStorage(action.payload);
        },
        logout: (state) => {
            state.isAuth = false;
            state.authTokens = null;
            state.user = null;
            removeAuthTokensFromLocalStorage();
        },
    },
});

export default authSlice.reducer;
export const { setAuthTokens, logout } = authSlice.actions;

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
export const selectUser = (state: RootState): IUserJWTDecodeResponse | null => state?.auth?.user;
export const selectUserId = (state: RootState): string | null => {
    const id = state?.auth?.user?.user_id;
    return id === undefined ? null : id.toString();
};
export const selectUserEmail = (state: RootState): string | null => {
    const email = state?.auth?.user?.email;
    return email === undefined ? null : email;
};
export const selectTokens = (state: RootState): ITokens | null => state?.auth?.authTokens;
