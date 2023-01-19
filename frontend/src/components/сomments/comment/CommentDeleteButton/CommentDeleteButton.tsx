import React, { FC, useState } from 'react';

import deleteIcon from '../../../../assets/delete.svg';
import Alert from '../../../common/Alert/Alert';

interface ICommentDeleteButtonProps {
    onDelete: () => void;
}

const CommentDeleteButton: FC<ICommentDeleteButtonProps> = ({ onDelete }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className={'icon'} onClick={() => setIsOpen(true)}>
                <img src={deleteIcon} alt='delete' />
            </div>
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

export default CommentDeleteButton;
