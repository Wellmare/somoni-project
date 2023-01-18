import React, { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import deleteIcon from '../../../../assets/delete.svg';
import { PathsToNavigate } from '../../../../constants/Paths';
import { useDeletePostMutation } from '../../../../service/postsApiSlice';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import Alert from '../../../common/Alert/Alert';
import s from '../PostButton/PostButton.module.scss';

interface IPostDeleteButtonProps {
    postId: string;
}

const PostDeleteButton: FC<IPostDeleteButtonProps> = ({ postId }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [deletePost] = useDeletePostMutation();
    const navigate = useNavigate();
    const openDeleteAlert = (): void => {
        setIsOpen(true);
    };
    const onDeletePost = (): void => {
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
        <>
            <div className={s.button} onClick={openDeleteAlert}>
                <img src={deleteIcon} alt='delete' />
            </div>
            <Alert
                title={'Удалить пост?'}
                text={'Отменить это действие будет невозможно'}
                isOpen={isOpen}
                onSuccess={() => {
                    onDeletePost();
                    setIsOpen(false);
                }}
                onClose={() => {
                    setIsOpen(false);
                }}
                buttonText={'Удалить пост'}
            />
        </>
    );
};

export default PostDeleteButton;
