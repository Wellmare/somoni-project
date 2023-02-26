import { apiEndpoints } from 'app/constants/apiEndpoints';
import { apiSlice } from 'shared/api/index';

import { IDataToGetPost, IDataToLikePost, IPostServerResponse } from './types';

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPost: builder.query<IPostServerResponse, IDataToGetPost>({
            query: ({ id }) => ({
                url: `${apiEndpoints.post}${id}/`,
            }),
            providesTags: (result) => [{ type: 'Single Post', id: result?.id }],
        }),
        likePost: builder.mutation<undefined, IDataToLikePost>({
            query: ({ id }) => ({
                url: `${apiEndpoints.post}${id}/like/`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Single Post', id: arg.id },
                { type: 'Post', id: arg.id },
            ],
        }),
        unlikePost: builder.mutation<undefined, IDataToLikePost>({
            query: ({ id }) => ({
                url: `${apiEndpoints.post}${id}/like/`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Single Post', id: arg.id },
                { type: 'Post', id: arg.id },
            ],
        }),
    }),
});

export const { useGetPostQuery, useLikePostMutation, useUnlikePostMutation } = postApiSlice;
