import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import jwtDecode from 'jwt-decode';

import { IAuthSlice } from '../../types/redux/auth/IAuthSlice';
import { ITokens } from '../../types/redux/auth/ITokens';
import {
    getAuthTokensFromLocalStorage,
    removeAuthTokensFromLocalStorage,
    setAuthTokensToLocalStorage,
} from '../../utils/authTokensLocalStorage';

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
