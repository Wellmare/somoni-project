import { PathsToNavigate } from 'app/constants/Paths';
import { ReactComponent as DeleteIcon } from 'assets/svg/delete.svg';
import React, { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDeletePostMutation } from 'shared/api/posts/postsApiSlice';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { Icon, IconType } from 'shared/ui/Icon';
import { Alert } from 'widgets/modals';

interface IPostDeleteButtonProps {
    postId: string;
}

export const PostDeleteButton: FC<IPostDeleteButtonProps> = ({ postId }) => {
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
            <Icon onClick={openDeleteAlert} type={IconType.red}>
                <DeleteIcon />
            </Icon>
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
