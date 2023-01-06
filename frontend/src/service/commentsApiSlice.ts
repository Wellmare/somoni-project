import { apiSlice } from './index';

import { apiEndpoints } from '../constants/apiEndpoints';
import { IComment } from '../types/redux/comments/IComment';
import { IComments } from '../types/redux/comments/IComments';
import {
    IDataToCreateComment,
    IDataToDeleteComment,
    IDataToEditComment,
    IDataToGetComments,
} from '../types/redux/comments/IDataTo';

export const commentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getComments: builder.query<IComments, IDataToGetComments>({
            query: ({ postId }) => ({
                url: `${apiEndpoints.post}${postId}/comments`,
            }),
            providesTags: ['Comments'],
            // (result, error, arg) =>
            // result?.results != null
            //     ? [...result.results.map((comment) => ({ type: 'Comments' as const, id: comment.id })), 'Comments']
            //     : ['Comments'],
        }),
        createComment: builder.mutation<IComment, IDataToCreateComment>({
            query: ({ content, postId }) => ({
                url: `${apiEndpoints.post}${postId}/comments`,
                method: 'POST',
                body: {
                    content,
                },
            }),
            // invalidatesTags: (result, error, arg) => [{ type: 'Comments' as const, id: result?.id }],
            invalidatesTags: ['Comments'],
        }),
        deleteComment: builder.mutation<undefined, IDataToDeleteComment>({
            query: ({ commentId }) => ({
                url: `${apiEndpoints.comment}${commentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Comments'],
        }),
        editComment: builder.mutation<IComment, IDataToEditComment>({
            query: ({ commentId, content }) => ({
                url: `${apiEndpoints.comment}${commentId}`,
                method: 'PUT',
                body: {
                    content,
                },
            }),
            invalidatesTags: ['Comments'],
        }),
    }),
});

export const { useGetCommentsQuery, useCreateCommentMutation, useDeleteCommentMutation, useEditCommentMutation } =
    commentsApiSlice;
