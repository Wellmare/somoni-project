import { ReactComponent as DeleteIcon } from 'assets/svg/delete.svg';
import React, { FC, useState } from 'react';

import { Icon, IconType } from 'shared/ui/Icon';
import { Alert } from 'widgets/modals';

interface ICommentDeleteButtonProps {
    onDelete: () => void;
}

export const CommentDeleteButton: FC<ICommentDeleteButtonProps> = ({ onDelete }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            {/* <div className={'icon'} onClick={() => setIsOpen(true)}> */}
            {/*     <img src={deleteIcon} alt='delete' /> */}
            {/* </div> */}
            <Icon type={IconType.red} onClick={() => setIsOpen(true)}>
                <DeleteIcon />
            </Icon>
            <Alert
                title={'Удалить комментарий?'}
                text={'Отменить это действие будет невозможно'}
                isOpen={isOpen}
                onSuccess={() => {
                    onDelete();
                }}
                onClose={() => {
                    setIsOpen(false);
                }}
                buttonText={'Удалить комментарий'}
            />
        </>
    );
};
