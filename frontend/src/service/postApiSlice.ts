import { apiSlice } from './index';

import { apiEndpoints } from '../constants/apiEndpoints';
import { IDataToGetPost, IDataToLikePost } from '../types/redux/post/IDataTo';
import { IPost } from '../types/redux/posts/IPost';

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPost: builder.query<IPost, IDataToGetPost>({
            query: ({ id }) => ({
                url: `${apiEndpoints.post}${id}`,
            }),
            providesTags: (result) => [{ type: 'Single Post', id: result?.id }],
        }),
        likePost: builder.mutation<undefined, IDataToLikePost>({
            query: ({ id }) => ({
                url: `${apiEndpoints.post}${id}/like`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Single Post', id: arg.id }],
        }),
        unlikePost: builder.mutation<undefined, IDataToLikePost>({
            query: ({ id }) => ({
                url: `${apiEndpoints.post}${id}/like`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Single Post', id: arg.id }],
        }),
    }),
});

export const { useGetPostQuery, useLikePostMutation, useUnlikePostMutation } = postApiSlice;
