import { apiSlice } from './index';

import { apiEndpoints } from '../constants/apiEndpoints';
import { IDataToDelete, IDataToEditPost, IDataToGetPosts } from '../types/redux/posts/IDataTo';
import { IPost } from '../types/redux/posts/IPost';
import { IPosts } from '../types/redux/posts/IPosts';

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<IPosts, IDataToGetPosts>({
            query: ({ page, tag }) => ({
                url: tag !== undefined && tag !== '' ? `${apiEndpoints.posts}${tag}` : apiEndpoints.posts,
                params: {
                    page,
                },
            }),
            providesTags: (result) =>
                result != null
                    ? result.results.map((result) => ({ type: 'Post', id: result.id }))
                    : [{ type: 'Post', id: 'LIST' }],
        }),
        createPost: builder.mutation<IPost, FormData>({
            query: (formData) => ({
                url: apiEndpoints.posts,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Post'],
        }),

        editPost: builder.mutation<IPost, IDataToEditPost>({
            query: ({ formData, id }) => ({
                url: `${apiEndpoints.post}${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
        }),
        deletePost: builder.mutation<IPost, IDataToDelete>({
            query: ({ id }) => ({
                url: `${apiEndpoints.post}${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
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
