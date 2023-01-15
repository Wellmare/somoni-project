import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import deleteIcon from '../../../../assets/delete.svg';
import { PathsToNavigate } from '../../../../constants/Paths';
import { useDeletePostMutation } from '../../../../service/postsApiSlice';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import s from '../PostButton/PostButton.module.scss';

interface IPostDeleteButtonProps {
    postId: string;
}

const PostDeleteButton: FC<IPostDeleteButtonProps> = ({ postId }) => {
    const [deletePost] = useDeletePostMutation();
    const navigate = useNavigate();
    const onClick = (): void => {
        doAsyncFunc(async () => {
            try {
                await deletePost({ id: postId }).unwrap();
                navigate(PathsToNavigate.MAIN);
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <div className={s.button} onClick={onClick}>
            <img src={deleteIcon} alt='delete' />
        </div>
    );
};

export default PostDeleteButton;
