import { apiEndpoints } from 'app/constants/apiEndpoints';

import { apiSlice } from 'shared/api/index';

import {
    IDataToLogin,
    IDataToLogout,
    IDataToChangePassword,
    IDataToRestorePassword,
    IDataToConfirmRestorePassword,
    IDataToConfirmEmail,
    ILoginResponse,
    IRegisterResponse,
} from './types';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, IDataToLogin>({
            query: ({ username, password }) => ({
                url: apiEndpoints.login,
                method: 'POST',
                body: {
                    username,
                    password,
                },
            }),
            invalidatesTags: ['Auth'],
        }),
        register: builder.mutation<IRegisterResponse, FormData>({
            query: (formData) => ({
                url: apiEndpoints.register,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Auth'],
        }),
        logout: builder.mutation<undefined, IDataToLogout>({
            query: ({ refresh }) => ({
                url: apiEndpoints.logout,
                method: 'POST',
                body: { refresh },
            }),
        }),
        changePassword: builder.mutation<undefined, IDataToChangePassword>({
            query: ({ refresh, password, password2, oldPassword }) => ({
                url: apiEndpoints.changePassword,
                method: 'PUT',
                body: { refresh, password, password2, old_password: oldPassword },
            }),
        }),
        restorePassword: builder.mutation<undefined, IDataToRestorePassword>({
            query: ({ email }) => ({
                url: apiEndpoints.restorePassword,
                method: 'POST',
                body: {
                    email,
                },
            }),
        }),
        restorePasswordConfirm: builder.mutation<undefined, IDataToConfirmRestorePassword>({
            query: ({ password2, password, token }) => ({
                url: apiEndpoints.restorePasswordConfirm,
                method: 'POST',
                body: {
                    password2,
                    password,
                    token,
                },
            }),
        }),
        confirmEmail: builder.mutation<undefined, IDataToConfirmEmail>({
            query: ({ token1, token2 }) => ({
                url: apiEndpoints.confirmEmail,
                method: 'POST',
                body: {
                    key_email: token2,
                    key_username: token1,
                },
            }),
            invalidatesTags: ['Auth'],
        }),
        sendConfirmEmail: builder.mutation<undefined, null>({
            query: () => ({
                url: apiEndpoints.sendConfirmEmail,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useChangePasswordMutation,
    useRestorePasswordMutation,
    useRestorePasswordConfirmMutation,
    useConfirmEmailMutation,
    useSendConfirmEmailMutation,
} = authApiSlice;
