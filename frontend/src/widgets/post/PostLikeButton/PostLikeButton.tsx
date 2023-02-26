import { PathsToNavigate } from 'app/constants/Paths';
import { PostContext } from 'app/context';
import { ReactComponent as LikedIcon } from 'assets/svg/liked.svg';
import { ReactComponent as NonLikedIcon } from 'assets/svg/non-liked.svg';
import React, { FC, useContext, useState } from 'react';

import { Link } from 'react-router-dom';

import { useLikePostMutation, useUnlikePostMutation } from 'shared/api/post/postApiSlice';
import { useAppSelector } from 'shared/hooks';

import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { selectIsAuth } from 'shared/store/slices/authSlice';

import { Icon } from 'shared/ui/Icon';

import s from './PostLikeButton.module.scss';

import { PostButton } from '../index';

export const PostLikeButton: FC = () => {
    const { post } = useContext(PostContext);
    if (post === null) return null;
    const isAuth = useAppSelector(selectIsAuth);

    const { isLiked, likesCount, postId } = post;

    const [localIsLiked, setLocalIsLiked] = useState<boolean>(isLiked);
    const [localCountLikes, setLocalCountLikes] = useState<number>(likesCount);

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
    if (!isAuth) {
        return (
            <Link to={PathsToNavigate.LOGIN}>
                <PostButton count={localCountLikes}>
                    <Icon customTypeClassName={s.nonLiked}>
                        <NonLikedIcon />
                    </Icon>
                </PostButton>
            </Link>
        );
    }

    return (
        <PostButton count={localCountLikes} onClick={onLike}>
            {localIsLiked ? (
                // <img src={LikedIcon} alt='like' className={s.liked} />
                <Icon customTypeClassName={s.liked}>
                    <LikedIcon />
                </Icon>
            ) : (
                // <img src={nonLiked} alt='like' className={s.nonLiked} />
                <Icon customTypeClassName={s.nonLiked}>
                    <NonLikedIcon />
                </Icon>
            )}
        </PostButton>
    );
};
