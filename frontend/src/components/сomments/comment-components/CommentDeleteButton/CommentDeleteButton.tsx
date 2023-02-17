import React, { FC, useState } from 'react';

import { ReactComponent as DeleteIcon } from '../../../../assets/svg/delete.svg';
import { IconType } from '../../../../types/UI/IconType';
import Icon from '../../../../ui/Icon/Icon';
import Alert from '../../../../ui/modals/Alert/Alert';

interface ICommentDeleteButtonProps {
    onDelete: () => void;
}

const CommentDeleteButton: FC<ICommentDeleteButtonProps> = ({ onDelete }) => {
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

export default CommentDeleteButton;
