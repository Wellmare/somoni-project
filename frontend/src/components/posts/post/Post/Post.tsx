import classNames from 'classnames';
import React, { FC } from 'react';

import s from './Post.module.scss';

import { IPost } from '../../../../types/redux/posts/IPost';
import PostButtons from '../PostButtons/PostButtons';
import PostContent from '../PostContent/PostContent';
import PostHeader from '../PostHeader/PostHeader';
import PostImage from '../PostImage/PostImage';
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
            {/* {image !== null && <img src={image} alt='image' className={classNames(s.image)} />} */}
            <PostHeader post={post} />
            <PostTitle title={title} />
            <PostImage image={postImage} />
            <PostContent value={content} className={classNames('mt-4')} />
            <PostButtons
                isLiked={isLiked}
                countLikes={countLikes}
                postId={postId.toString()}
                countComments={countComments}
            />

            {/* <div className={'flex justify-between'}> */}
            {/*     <Link to={`${PathsToNavigate.USER}/${authorId}`}> */}
            {/*         <p>{username}</p> */}
            {/*     </Link> */}
            {/*     <Link to={`${PathsToNavigate.POST}/${id}`}> */}
            {/*         <p>{title}</p> */}
            {/*     </Link> */}
            {/* </div> */}
            {/* <div className={'flex justify-between'}> */}
            {/*     <Content value={content} /> */}
            {/*     <p>{likes}</p> */}
            {/*     <div className={classNames('mt-auto', 'flex', 'justify-around')}> */}
            {/*         {tags?.length > 0 && tags.map((tag) => <Tag tag={tag} key={tag} />)} */}
            {/*     </div> */}
            {/* </div> */}
        </div>
    );
};

export default Post;
