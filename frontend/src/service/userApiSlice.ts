import { apiSlice } from './index';

import { apiEndpoints } from '../constants/apiEndpoints';
import { IDataToGetProfile, IDataToGetProfileInfo } from '../types/redux/profile/IDataTo';
import { IDataToEditProfile } from '../types/redux/profile/IDataToEditProfile';
import { IProfile } from '../types/redux/profile/IProfile';
import { IProfileInfo } from '../types/redux/profile/IProfileInfo';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<IProfile, IDataToGetProfile>({
            query: ({ userId, postsPage = 1 }) => ({
                url: `${apiEndpoints.user}${userId}`,
                params: {
                    page: postsPage,
                },
            }),
            providesTags: ['Profile'],
        }),

        editUser: builder.mutation<IProfile, FormData>({
            query: (formData) => ({
                url: apiEndpoints.editProfile,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Profile'],
        }),
        getDataToEditUser: builder.query<IDataToEditProfile, undefined>({
            query: () => ({
                url: apiEndpoints.editProfile,
            }),
        }),
        getUserInfo: builder.query<IProfileInfo, IDataToGetProfileInfo>({
            query: ({ userId }) => ({
                url: `${apiEndpoints.userInfo}${userId}`,
            }),
            providesTags: ['Profile'],
        }),

        // editPost: builder.mutation<IPost, IDataToEditPost>({
        //     query: ({ formData, id }) => ({
        //         url: `${apiEndpoints.post}${id}`,
        //         method: 'PUT',
        //         body: formData,
        //     }),
        //     invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
        // }),
        // deletePost: builder.mutation<IPost, IDataToDelete>({
        //     query: ({ id }) => ({
        //         url: `${apiEndpoints.post}${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
        // }),
    }),
});

export const {
    useGetUserQuery,
    useEditUserMutation,
    useLazyGetUserQuery,
    useGetUserInfoQuery,
    useLazyGetUserInfoQuery,
    useGetDataToEditUserQuery,
} = userApiSlice;
