import React, { FC, useState } from 'react';

import s from './PostLikeButton.module.scss';

import liked from '../../../../assets/liked.svg';
import nonLiked from '../../../../assets/non-liked.svg';
import { useLikePostMutation, useUnlikePostMutation } from '../../../../service/postApiSlice';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import PostButton from '../PostButton/PostButton';

interface IPostLikeButtonProps {
    isLiked: boolean;
    postId: string;
    countLikes: number;
}

const PostLikeButton: FC<IPostLikeButtonProps> = ({ isLiked, countLikes, postId }) => {
    const [localIsLiked, setLocalIsLiked] = useState<boolean>(isLiked);
    const [localCountLikes, setLocalCountLikes] = useState<number>(countLikes);

    const [like] = useLikePostMutation();
    const [unlike] = useUnlikePostMutation();

    const onLike = (): void => {
        doAsyncFunc(async () => {
            try {
                if (localIsLiked) {
                    await unlike({ id: postId }).unwrap();
                    setLocalCountLikes((count) => count - 1);
                } else {
                    await like({ id: postId }).unwrap();
                    setLocalCountLikes((count) => count + 1);
                }
                setLocalIsLiked((isLiked) => !isLiked);
            } catch (e) {
                console.log(e);
            }
        });
    };
    return (
        <PostButton count={localCountLikes} onClick={onLike}>
            {localIsLiked ? (
                <img src={liked} alt='like' className={s.liked} />
            ) : (
                <img src={nonLiked} alt='like' className={s.nonLiked} />
            )}
        </PostButton>
    );
};

export default PostLikeButton;
