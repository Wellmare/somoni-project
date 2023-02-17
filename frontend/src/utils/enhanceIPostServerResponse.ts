import { IPost } from '../types/redux/posts/IPost';
import { IPostServerResponse } from '../types/redux/posts/IPostServerResponse';

export const enhanceIPostServerResponse = (postServerResponse: IPostServerResponse): IPost => {
    const {
        content,
        username: authorUsername,
        title,
        likes: likesCount,
        id: postId,
        image: postImageLink,
        author: authorId,
        tags,
        isLiked,
        isMyPost,
        photo: avatarLink,
        date: dateString,
        comments: commentsCount,
    } = postServerResponse;

    return {
        tags,
        isMyPost,
        postId: postId.toString(),
        title,
        content,
        userId: authorId.toString(),
        username: authorUsername,
        isLiked,
        avatarLink,
        dateString,
        postImageLink: postImageLink === 'null' ? null : postImageLink,
        likesCount,
        commentsCount,
    };
};
