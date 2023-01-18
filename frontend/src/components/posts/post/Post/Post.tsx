import classNames from 'classnames';
import React, { FC } from 'react';

import s from './Post.module.scss';

import { IPost } from '../../../../types/redux/posts/IPost';
import PostButtons from '../PostButtons/PostButtons';
import PostContent from '../PostContent/PostContent';
import PostHeader from '../PostHeader/PostHeader';
import PostImage from '../PostImage/PostImage';
import PostTags from '../PostTags/PostTags';
import PostTitle from '../PostTitle/PostTitle';

interface ITestPostProps {
    post: IPost;
}

const Post: FC<ITestPostProps> = ({ post }) => {
    const {
        content,
        username: authorUsername,
        title,
        likes: countLikes,
        id: postId,
        image: postImage,
        author: authorId,
        tags,
        isLiked,
        isMyPost,
        photo: authorPhoto,
        date,
        comments: countComments,
    } = post;
    return (
        <div className={classNames(s.post)}>
            <PostHeader post={post} />
            <PostTitle title={title} postId={postId.toString()} />
            <PostImage image={postImage} />
            <PostContent value={content} className={classNames('mt-4')} />
            <PostTags tags={tags} />
            <PostButtons
                isLiked={isLiked}
                countLikes={countLikes}
                postId={postId.toString()}
                countComments={countComments}
            />
        </div>
    );
};

export default Post;
