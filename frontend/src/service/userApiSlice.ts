import { apiSlice } from './index';

import { apiEndpoints } from '../constants/apiEndpoints';
import { IDataToGetProfile } from '../types/redux/profile/IDataTo';
import { IProfile } from '../types/redux/profile/IProfile';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<IProfile, IDataToGetProfile>({
            query: ({ userId, postsPage = 1 }) => ({
                url: `${apiEndpoints.user}${userId}`,
                params: {
                    page: postsPage,
                },
            }),
            providesTags: (result, error, arg) => [{ type: 'Profile', id: arg.userId }],
        }),

        editUser: builder.mutation<IProfile, FormData>({
            query: (formData) => ({
                url: apiEndpoints.editProfile,
                method: 'PUT',
                body: formData,
            }),
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

export const { useGetUserQuery, useEditUserMutation, useLazyGetUserQuery } = userApiSlice;
