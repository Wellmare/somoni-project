import classNames from 'classnames';
import { PostContext } from 'context/PostContext';
import React, { FC, useState } from 'react';

import s from './Post.module.scss';

import { IEdit } from '../../../../types/IEdit';
import { IPost } from '../../../../types/redux/posts/IPost';
import { IPostServerResponse } from '../../../../types/redux/posts/IPostServerResponse';
import PostButtons from '../PostButtons/PostButtons';
import PostContent from '../PostContent/PostContent';
import PostHeader from '../PostHeader/PostHeader';
import PostImage from '../PostImage/PostImage';
import PostTags from '../PostTags/PostTags';
import PostTitle from '../PostTitle/PostTitle';

interface ITestPostProps {
    post: IPostServerResponse;
}

const Post: FC<ITestPostProps> = ({ post }) => {
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
    } = post;

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const enhancedPost: IPost = {
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
        postImageLink,
        likesCount,
        commentsCount,
    };

    const edit: IEdit = {
        setIsEdit,
        isEdit,
    };

    return (
        <PostContext.Provider value={{ post: enhancedPost, edit }}>
            <div className={classNames(s.post)}>
                <PostHeader />
                <PostTitle />
                <PostImage />
                <PostContent />
                <PostTags />
                <PostButtons />
            </div>
        </PostContext.Provider>
    );
};

export default Post;
