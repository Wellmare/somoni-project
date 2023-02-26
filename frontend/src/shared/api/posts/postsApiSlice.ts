import { apiEndpoints } from 'app/constants/apiEndpoints';
import { apiSlice } from 'shared/api/index';

import { IDataToDelete, IDataToEditPost, IDataToGetPosts, IPostsServerResponse, IPostServerResponse } from './types';

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<IPostsServerResponse, IDataToGetPosts>({
            query: ({ page, tag }) => ({
                params: {
                    page,
                },
                url: tag !== undefined && tag !== '' ? `${apiEndpoints.posts}${tag}/` : apiEndpoints.posts,
            }),
            providesTags: (result) =>
                result != null
                    ? result.results.map((result) => ({ type: 'Post', id: result.id }))
                    : [{ type: 'Post', id: 'LIST' }],
        }),
        createPost: builder.mutation<IPostServerResponse, FormData>({
            query: (formData) => ({
                url: apiEndpoints.posts,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Post'],
        }),

        editPost: builder.mutation<IPostServerResponse, IDataToEditPost>({
            query: ({ formData, id }) => ({
                url: `${apiEndpoints.post}${id}/`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id },
                { type: 'Single Post', id: arg.id },
            ],
        }),
        deletePost: builder.mutation<IPostServerResponse, IDataToDelete>({
            query: ({ id }) => ({
                url: `${apiEndpoints.post}${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id },
                { type: 'Single Post', id: arg.id },
            ],
        }),
    }),
});

export const {
    useLazyGetPostsQuery,
    useCreatePostMutation,
    useEditPostMutation,
    useGetPostsQuery,
    useDeletePostMutation,
} = postsApiSlice;
