import { apiEndpoints } from 'app/constants/apiEndpoints';
import { apiSlice } from 'shared/api/index';

import { IPaginatedResponse } from 'shared/types/server';

// import { IPaginatedResponse } from 'shared/types/server/IPaginatedResponse';
// import { IDataToFollowing, IDataToGetProfile, IDataToGetProfileInfo } from 'shared/api/user/types/IDataTo';
// import { IDataToEditProfile } from 'shared/api/user/types/IDataToEditProfile';
// import { IPaginatedProfileResponse } from 'shared/api/user/types/IPaginatedProfileResponse';
// import { IProfileInfo } from 'shared/api/user/types/IProfileInfo';
// import { IUserServerResponse } from 'shared/api/user/types/IUserServerResponse';
import {
    IPaginatedProfileResponse,
    IDataToGetProfile,
    IDataToGetProfileInfo,
    IDataToFollowing,
    IDataToEditProfile,
    IUserServerResponse,
    IProfileInfo,
} from './types';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<IPaginatedProfileResponse, IDataToGetProfile>({
            query: ({ userId, postsPage = 1 }) => ({
                url: `${apiEndpoints.user}${userId}/`,
                params: {
                    page: postsPage,
                },
            }),
            providesTags: ['Profile', 'Auth'],
        }),
        editUser: builder.mutation<{ isEmailChanged: boolean; profile: IPaginatedProfileResponse }, FormData>({
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
            providesTags: ['Profile', 'Auth'],
        }),
        getUserInfo: builder.query<IProfileInfo, IDataToGetProfileInfo>({
            query: ({ userId }) => ({
                url: `${apiEndpoints.userInfo}${userId}/`,
            }),
            providesTags: ['Auth'],
        }),

        deleteProfile: builder.mutation<undefined, undefined>({
            query: () => ({
                url: apiEndpoints.editProfile,
                method: 'DELETE',
            }),
            invalidatesTags: ['Profile', 'Auth'],
        }),
        getFollowersOnProfile: builder.query<IPaginatedResponse<IUserServerResponse[]>, IDataToFollowing>({
            query: ({ userId }) => ({
                url: `${apiEndpoints.user}${userId}/followers/`,
            }),
            providesTags: ['Profile'],
        }),
        getFollowingOnProfile: builder.query<IPaginatedResponse<IUserServerResponse[]>, IDataToFollowing>({
            query: ({ userId }) => ({
                url: `${apiEndpoints.user}${userId}/following/`,
            }),
            providesTags: ['Profile'],
        }),
        followToProfile: builder.mutation<undefined, IDataToFollowing>({
            query: ({ userId }) => ({
                url: `${apiEndpoints.user}${userId}/follow/`,
                method: 'POST',
            }),
            invalidatesTags: ['Profile'],
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
    useDeleteProfileMutation,
    useGetFollowersOnProfileQuery,
    useGetFollowingOnProfileQuery,
    useFollowToProfileMutation,
} = userApiSlice;
