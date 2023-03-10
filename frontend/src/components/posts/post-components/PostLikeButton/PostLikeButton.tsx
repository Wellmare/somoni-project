import React, { FC, useContext, useState } from 'react';

import { Link } from 'react-router-dom';

import s from './PostLikeButton.module.scss';

import { ReactComponent as LikedIcon } from '../../../../assets/svg/liked.svg';
import { ReactComponent as NonLikedIcon } from '../../../../assets/svg/non-liked.svg';

import { PathsToNavigate } from '../../../../constants/Paths';
import { PostContext } from '../../../../context/PostContext';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { selectIsAuth } from '../../../../redux/slices/authSlice';
import { useLikePostMutation, useUnlikePostMutation } from '../../../../service/postApiSlice';
import Icon from '../../../../ui/Icon/Icon';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import PostButton from '../PostButton/PostButton';

const PostLikeButton: FC = () => {
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

export default PostLikeButton;
