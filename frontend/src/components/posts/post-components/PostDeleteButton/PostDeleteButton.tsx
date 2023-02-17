import React, { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ReactComponent as DeleteIcon } from '../../../../assets/svg/delete.svg';

import { PathsToNavigate } from '../../../../constants/Paths';
import { useDeletePostMutation } from '../../../../service/postsApiSlice';
import { IconType } from '../../../../types/UI/IconType';
import Icon from '../../../../ui/Icon/Icon';
import Alert from '../../../../ui/modals/Alert/Alert';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';

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

export default PostDeleteButton;
