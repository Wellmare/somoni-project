import classNames from 'classnames';
import React, { FC } from 'react';

import EditIcon from '../../../../assets/edit.svg';

interface ICommentEditButtonProps {
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentEditButton: FC<ICommentEditButtonProps> = ({ setIsEdit }) => {
    return (
        <div className={classNames('cursor-pointer', 'mr-3')} onClick={() => setIsEdit((old) => !old)}>
            <div className={'icon'}>
                <img src={EditIcon} alt='edit' />
            </div>
        </div>
    );
};

export default CommentEditButton;
